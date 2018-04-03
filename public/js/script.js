document.addEventListener('DOMContentLoaded', function() {
  // converting markdown text
  // bds: did you adapt this code from somewhere else? I'm guessing you did, as this is
  // bds: not your comment style. ;-) 
  // bds: if you did adapt it from somewhere, be sure to give a link to cite 
  // bds: where you copied it from
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

  // bds: jsdoc!
  const convertText = () => {
    output.innerHTML = md.render(userInput.value);
    // setWordCount();
  };

  // bds: comment about debouncing here to demonstrate you understand it...
  ['keyup', 'paste', 'cut', 'mouseup'].forEach(e => {
    userInput.addEventListener(e, _.debounce(convertText, 300, { maxWait: 500 }));
  });

  // bds: no commented code blocks in finished code!
  // const setWordCount = () => {
  //   const wordsContainer = document.getElementById('words');
  //   const wordCount = helpers.countWords(output);
  //   wordsContainer.innerText = wordCount + ' words';
  // };

  // bds: jsdoc
  // fetching one file
  const getFile = fileID => {
    return fetches.getOneFile(fileID).then(result => {
      userInput.value = result.content;
      convertText();
    });
  };

  // bds: jsdoc
  // fetch all files, then open the first file
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
        ul.removeChild(li); // bds: ah, see here you don't re-fetch the file list....
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

    // bds: possesive "its" has no apostrophe
    // find the clicked item, get its id, make it active

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

    // bds: nice use of data attributes...
    const fileID = li.getAttribute('data-id');
    let input = userInput.value;
    fetches.upsertFile(fileID, input);
  });
}); //most outer function
