const helpers = {
  /**
   * Function for creating an html wrapper(li) for each element representing a file
   * @param  {string} name - String representing name of a file
   * @param  {number} id   - Number representing id of a file
   * @return {string}      - HTML string representing a file
   */
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
    li.setAttribute('data-name', name);
    li.classList.add('item');
    return li;
  }
};
