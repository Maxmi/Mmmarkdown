//getting list of files from db and rendering them
const ul = document.getElementById('list-of-files');

let allFiles = [];

const createLi = (name, id) => {
  const li = document.createElement('li');
  const div = document.createElement('div');
  const span = document.createElement('span');
  const deleteBtn = document.createElement('button');

  div.classList.add('icon');
  deleteBtn.classList.add('delete');
  deleteBtn.innerHTML = '<i class="material-icons delete">delete</i>';
  div.appendChild(deleteBtn);

  // span.setAttribute('contenteditable', true);
  span.innerText = name;
  li.appendChild(span);
  li.appendChild(div);
  li.setAttribute('data-id', id);
  li.classList.add('item');
  return li;
};

const getAllFiles = () => {
  return fetch('/allfiles')
    .then(result => result.json())
    .then(result => {
      allFiles = result.allfiles;
      allFiles.forEach(file => {
        let li = createLi(file.name, file.id);
        ul.appendChild(li);
      });
    });
};

getAllFiles();


//converting markdown text
var md = new Remarkable({
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


let userInput = document.getElementById('input');

let output = document.getElementById('result-html');

function convertText () {
  output.innerHTML = md.render(userInput.value);
}

const events = ['keyup', 'paste', 'cut', 'mouseup'];

events.forEach(e => {
  userInput.addEventListener(e, _.debounce(convertText, 300, {maxWait: 500}));
})


//saving new file
const saveBtn = document.getElementById('save');
let fileNameHolder = document.getElementById('fileName');

saveBtn.addEventListener('click', () => {
  let input = userInput.value;
  let fileName = fileNameHolder.innerText;

  fetch('/allfiles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: fileName,
      newFile: input
    })
  })
    .then(file => {
      //clear ul, then fetch updated list of files
      ul.innerHTML = '';
      getAllFiles();
    })
});


//deleting a file
const deleteFile = fileID => {
  return fetch(`/allfiles/${fileID}`, {
    method: 'DELETE'
  });
};


ul.addEventListener('click', (event) => {
  if(event.target.classList.contains('delete')) {
    const li = event.target.closest('li');
    const fileID = li.getAttribute('data-id');
    deleteFile(fileID)
      .then(() => {
        ul.removeChild(li);
      });
  }
});


//clearing textarea for new file and prompting for fileName
const addBtn = document.getElementById('add');

addBtn.addEventListener('click', () => {
  userInput.value = '';
  output.innerHTML = '';
  fileNameHolder.innerText = 'untitled';
  fileNameHolder.focus();
});



//opening a file
const getFile = fileID => {
  return fetch(`/allfiles/${fileID}`)
}

ul.addEventListener('click', (event) => {
  if(event.target.tagName === 'SPAN') {
    const li = event.target.closest('li');
    li.classList.toggle('active');
    const fileID = li.getAttribute('data-id');
    getFile(fileID)
      .then(result => {
        return result.json();
      })
      .then(result => {
        let content = result.content;
        userInput.value = content;
      })
    const fileName = event.target.innerText;
    fileNameHolder.innerText = fileName;
  }
})


//updating file name
const updateFileName = (fileID, fileName) => {
  return fetch(`/allfiles/update/${fileID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: fileID,
      name: fileName,
    })
  });
};
//will trigger when fileNameHolder loses focus after being changed
fileNameHolder.addEventListener('blur', (event) => {
  const span = event.target;
  const fileName = span.innerText;
  const li = document.querySelector('.active');
  const fileID = li.getAttribute('data-id');

  updateFileName(fileID, fileName)
    .then(() => {
      //clear ul, then fetch updated list of files
      ul.innerHTML = '';
      getAllFiles();
    })
});


//updating file content
const saveChangesBtn = document.getElementById('update');

saveChangesBtn.addEventListener('click', () => {
  const li = document.querySelector('.active');
  const fileID = li.getAttribute('data-id');
  let input = userInput.value;

  fetch(`/allfiles/${fileID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fileID ,
      newContent: input
    })
  });
});
