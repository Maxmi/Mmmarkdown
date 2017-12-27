//getting list of files from db and rendering them
const ul = document.getElementById('list-of-files');

let allFiles = [];

const createLi = (name, id) => {
  const li = document.createElement('li');
  const div = document.createElement('div');
  div.classList.add('icon');
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '<i class="material-icons">delete</i>';
  div.appendChild(deleteBtn);
  li.innerText = name;
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
        let li = createLi(file.name+'.md', file.id);
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

saveBtn.addEventListener('click', () => {
  let input = userInput.value;
  let fileName = document.getElementById('fileName').innerText;

  fetch('/allfiles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: fileName,
      newFile: input
    })
  });
});
