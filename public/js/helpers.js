const helpers = {
  // countWords: root => {
  //   const textNodes = textNodesUnder(root);
  //   const text = textNodes
  //     .reduce((acc, node) => {
  //       if (!node.isElementContentWhitespace) {
  //         acc += node.nodeValue + ' ';
  //       }
  //       return acc;
  //     }, '')
  //     .trim();
  //
  //   // console.log(text);
  //   const arr = text.split(' ');
  //   return arr.length;
  // },

  createLi: (name, id) => {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const span = document.createElement('span');
    const deleteBtn = document.createElement('button');

    div.classList.add('icon');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = '<i class="material-icons delete">delete</i>';
    div.appendChild(deleteBtn);

    span.innerText = name;
    li.appendChild(span);
    li.appendChild(div);
    li.setAttribute('data-id', id);
    li.classList.add('item');
    return li;
  }
};

// function textNodesUnder(root) {
//   const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
//   const text = [];
//   let node;
//   while ((node = walk.nextNode())) {
//     text.push(node);
//   }
//   return text;
// }
