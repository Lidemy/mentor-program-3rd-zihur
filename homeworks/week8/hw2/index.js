const boardMessage = document.querySelector('.bulletin-board__message');
const textarea = document.querySelector('.comment__text');
const submit = document.querySelector('.submit');
const xhr = new XMLHttpRequest();
// 獲取資料庫的留言函式
function getMessage() {
  xhr.open('GET', 'https://lidemy-book-store.herokuapp.com/posts?_order=desc&_sort=id&_limit=20', true);
  xhr.send();
  xhr.onload = () => {
    const jsonData = JSON.parse(xhr.response);
    for (let i = 0; i < jsonData.length; i += 1) {
      let id = '';
      let content = '';
      id = JSON.parse(xhr.response)[i].id;// eslint-disable-line prefer-destructuring
      content = JSON.parse(xhr.response)[i].content;// eslint-disable-line prefer-destructuring
      const newdiv = document.createElement('div');
      newdiv.classList.add('message');
      newdiv.innerHTML = `
        <div class="message__id">${id}</div>
        <div class="message__text">${content}</div>
      `;
      boardMessage.appendChild(newdiv);
    }
  };
}
// POST 功能
function sendComment() {
  xhr.open('post', 'https://lidemy-book-store.herokuapp.com/posts/', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  const commentText = `content=${textarea.value}`;
  xhr.send(commentText);
}

// 偵測送出留言 & 更新區塊
submit.addEventListener('click', (e) => {
  e.preventDefault();
  if (textarea.value !== '') {
    sendComment();
    const newdiv = document.createElement('div');
    newdiv.classList.add('message');
    newdiv.innerHTML = `
      <div class="message__id">${parseInt(document.querySelector('.message__id').innerText, 10) + 1}</div>
      <div class="message__text">${textarea.value}</div>
    `;
    boardMessage.prepend(newdiv, boardMessage.querySelector('div'));
    textarea.value = '';
  } else { alert('你還沒有填寫留言唷！'); }
}, true);

getMessage();
