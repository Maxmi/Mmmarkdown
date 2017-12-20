var md = new Remarkable();

// console.log(md.render('# Remarkable rulezz'));

let userInput = document.getElementById('input');

let output = document.getElementById('output');

function convertText () {
  output.innerHTML = md.render(userInput.value);
}

userInput.addEventListener('change', convertText);
