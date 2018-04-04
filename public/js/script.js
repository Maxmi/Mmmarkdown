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
  const saveChangesBtn = document.getElementById('update');

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
      allFiles = result.allfiles;
      allFiles.forEach(file => {
        const li = helpers.createLi(file.name, file.id);
        ul.appendChild(li);
        const firstItem = document.querySelector('li');
        firstItem.classList.add('active');
        const fileID = firstItem.getAttribute('data-id');
        getFile(fileID);
        // put fileName to fileNameHolder place
        const fileName = document.querySelector('li > span').innerText;
        fileNameHolder.innerText = fileName;
      });
    });
  };

  getAllFiles();

  // saving new file
  saveBtn.addEventListener('click', () => {
    let input = userInput.value;
    let fileName = fileNameHolder.innerText;

    fetches.saveFile(fileName, input).then(() => {
      // bds: is a fetch necessary here? Could you save on the
      // bds: network traffic and simply add the new file to the list...?
      // clear ul, then fetch updated list of files
      ul.innerHTML = '';
      getAllFiles();
      userInput.focus();
    });
    // make the button disabled after saving the file, preventing user from clicking on it again
    saveBtn.disabled = true;
  });

  // deleting a file
  ul.addEventListener('click', event => {
    // bds: why add the event listener to the whole ul, when what you really
    // bds: is to add it to each of the individual delete buttons?
    if (event.target.classList.contains('delete')) {
      const li = event.target.closest('li');
      const fileID = li.getAttribute('data-id');
      fetches.deleteFile(fileID).then(() => {
        //remove the clicked file and make first file active
        ul.removeChild(li);
        fileNameHolder.innerText = 'untitled';
        userInput.value = '';
        output.innerHTML = '';
        userInput.focus();
      });
    }
  });

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
    fileNameHolder.innerText = 'untitled';
    fileNameHolder.focus();
    //make the button clickable
    saveBtn.disabled = false;
  });

  // opening a file on double click
  ul.addEventListener('dblclick', event => {
    // find li with active class and remove active class from it
    const activeItem = document.querySelector('.active');
    if (!activeItem) {
      const firstItem = document.querySelector('li');
      firstItem.classList.add('active');
    } else {
      activeItem.classList.remove('active');
    }


    // find the clicked item, get it's id, make it active

    // bds: if you add the event listener to each of the li's, (instead of the ul)
    // bds: then you can just use event.target here -- it's more precise.
    // bds: the down side is, you'd need to make sure you add the event listener
    // bds: whenever you created a new file in the list.
    const li = event.target.closest('li');
    const fileID = li.getAttribute('data-id');
    li.classList.add('active');
    // retrive content of the file
    getFile(fileID);
    // populate fileNameHolder

    // bds: what *is* the event.target here? It's the ul, right?
    // bds: it's weird that the innerText is the filename of the selected file...
    const fileName = event.target.innerText;
    fileNameHolder.innerText = fileName;
  });

  // updating content
  saveChangesBtn.addEventListener('click', () => {
    const li = document.querySelector('.active');
    const fileID = li.getAttribute('data-id');
    let input = userInput.value;
    fetches.upsertFile(fileID, input);
  });
}); //most outer function
