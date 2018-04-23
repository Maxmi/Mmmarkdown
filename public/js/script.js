document.addEventListener('DOMContentLoaded', function() {
  // converting markdown text
  // taken from [here] (https://github.com/jonschlinkert/remarkable)
  const md = new Remarkable({
    html: false, // Enable HTML tags in source
    xhtmlOut: false, // Use '/' to close single tags (<br />)
    breaks: false, // Convert '\n' in paragraphs into <br>
    linkify: false, // Autoconvert URL-like text to links
    // Enable some language-neutral replacement + quotes beautification
    typographer: false,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
    quotes: '“”‘’'
  });

  const addBtn = document.getElementById('add');
  const ul = document.getElementById('list-of-files');
  const saveBtn = document.getElementById('save');

  let fileNameHolder = document.getElementById('fileName');
  let allFiles = [];
  let userInput = document.getElementById('input');
  let output = document.getElementById('result-html');

  /**
   * Function for convertion a markdown text to html
   * @return {string} - HTML string representing a text converted from markdown
   */
  const convertText = () => {
    output.innerHTML = md.render(userInput.value);
  };

  // Iterating over an array of possible events to convert user input to html using debounce function of lodash library which delays invoking convertText function until after 300 milliseconds have elapsed since the last time the debounce function was invoked, and max wait time is 500 milliseconds
  ['keyup', 'paste', 'cut', 'mouseup'].forEach(e => {
    userInput.addEventListener(e, _.debounce(convertText, 300, { maxWait: 500 }));
  });

  /**
   * fetching one file
   * @param  {number} - fileID - ID of a file to be read
   * @return {string} - String representing contents of a file
   */
  const getFile = fileID => {
    return fetches.getOneFile(fileID).then(result => {
      userInput.value = result.content;
      convertText();
    });
  };

  /**
   * fetch all files, then open the first file
   * @return {Array} - Array of objects each representing a file
   */
  const getAllFiles = () => {
    return fetches.getAllFiles().then(result => {
      allFiles = result.files;
      allFiles.forEach(file => {
        const li = helpers.createLi(file.name, file.id);
        ul.appendChild(li);
        const firstItem = document.querySelector('li');
        firstItem.classList.add('active');
        const fileID = firstItem.getAttribute('data-id');
        getFile(fileID);
        // put fileName to fileNameHolder place
        const fileName = document.querySelector('li > span').innerText;
        fileNameHolder.value = fileName;
      });
    });
  };

  getAllFiles();

  let isNewFile = false;

  // creating new file
  addBtn.addEventListener('click', () => {
    // find li with class active and remove it
    const activeItem = document.querySelector('.active');
    if (activeItem) {
      activeItem.classList.remove('active');
    }
    //  clear fields for input and output
    userInput.value = '';
    output.innerHTML = '';
    // set default name and propmt for name
    fileNameHolder.value = '';
    fileNameHolder.focus();
    isNewFile = true;
  });



  // saving a file
  saveBtn.addEventListener('click', () => {
    let input = userInput.value;
    let fileName = fileNameHolder.value;

    if(isNewFile) {
      for(let file of allFiles) {
        if(file.name === fileName) {
          confirm(`file with name ${fileName} already exists.`);
          return false;
        }
      }
    }

    fetches.saveFile(fileName, input).then(() => {
      // clear ul, then fetch updated list of files
      ul.innerHTML = '';
      getAllFiles();
      userInput.focus();
    });
  });

  // deleting a file
  ul.addEventListener('click', event => {
    if (event.target.classList.contains('delete')) {
      const li = event.target.closest('li');
      const fileID = li.getAttribute('data-id');
      const fileName = li.getAttribute('data-name');
      let itemToRemove;

      for(let file of allFiles) {
        if(file.name === fileName) {
          itemToRemove = allFiles.indexOf(file);
        }
      }

      fetches.deleteFile(fileID).then(() => {
        //remove the clicked file and make first file active
        ul.removeChild(li);
        if(itemToRemove !== -1) {
          allFiles.splice(itemToRemove, 1);
        }
        fileNameHolder.value = '';
        userInput.value = '';
        output.innerHTML = '';
        userInput.focus();
      });
    }
  });

  // opening a file on click
  ul.addEventListener('click', event => {
    isNewFile = false;
    // find li with active class and remove active class from it
    const activeItem = document.querySelector('.active');
    if (!activeItem) {
      const firstItem = document.querySelector('li');
      firstItem.classList.add('active');
    } else {
      activeItem.classList.remove('active');
    }
    const li = event.target.closest('li');
    const fileID = li.getAttribute('data-id');
    li.classList.add('active');
    // retrive content of the file
    getFile(fileID);
    // populate fileNameHolder
    const fileName = li.getAttribute('data-name');
    fileNameHolder.value = fileName;
  });
}); //most outer function
