document.addEventListener('DOMContentLoaded', function() {
  //converting markdown text
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

  const convertText = () => {
    output.innerHTML = md.render(userInput.value);
    // setWordCount();
  };

  ['keyup', 'paste', 'cut', 'mouseup'].forEach(e => {
    userInput.addEventListener(e, _.debounce(convertText, 300, { maxWait: 500 }));
  });

  // const setWordCount = () => {
  //   const wordsContainer = document.getElementById('words');
  //   const wordCount = helpers.countWords(output);
  //   wordsContainer.innerText = wordCount + ' words';
  // };

  //fetching one file
  const getFile = fileID => {
    return fetches.getOneFile(fileID).then(result => {
      userInput.value = result.content;
      convertText();
    });
  };

  //fetch all files, then open the first file
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
        //put fileName to fileNameHolder place
        const fileName = document.querySelector('li > span').innerText;
        fileNameHolder.innerText = fileName;
      });
    });
  };

  getAllFiles();

  //saving new file
  saveBtn.addEventListener('click', () => {
    let input = userInput.value;
    let fileName = fileNameHolder.innerText;

    fetches.saveFile(fileName, input).then(() => {
      //clear ul, then fetch updated list of files
      ul.innerHTML = '';
      getAllFiles();
      userInput.focus();
    });
  });

  //deleting a file
  ul.addEventListener('click', event => {
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

  //creating new file
  addBtn.addEventListener('click', () => {
    //find li with class active and remove it
    const activeItem = document.querySelector('.active');
    if (activeItem) {
      activeItem.classList.remove('active');
    }

    //clear fields for input and output
    userInput.value = '';
    output.innerHTML = '';
    //set default name and propmt for name
    fileNameHolder.innerText = 'untitled';
    fileNameHolder.focus();
  });

  //opening a file on double click
  ul.addEventListener('dblclick', event => {
    //find li with active class and remove active class from it
    const activeItem = document.querySelector('.active');
    if (!activeItem) {
      const firstItem = document.querySelector('li');
      firstItem.classList.add('active');
    } else {
      activeItem.classList.remove('active');
    }

    //find the clicked item, get it's id, make it active
    const li = event.target.closest('li');
    const fileID = li.getAttribute('data-id');
    li.classList.add('active');
    //retrive content of the file
    getFile(fileID);
    //populate fileNameHolder
    const fileName = event.target.innerText;
    fileNameHolder.innerText = fileName;
  });

  //updating content
  saveChangesBtn.addEventListener('click', () => {
    const li = document.querySelector('.active');
    const fileID = li.getAttribute('data-id');
    let input = userInput.value;
    fetches.upsertFile(fileID, input);
  });
}); //most outer function
