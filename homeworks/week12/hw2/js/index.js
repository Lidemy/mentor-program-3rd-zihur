// 取得 cookie 的值
function getCookie(cookieName) {
  const decodecookie = decodeURI(document.cookie);
  const cookieArray = decodecookie.split(';');
  for (let i = 0; i < cookieArray.length; i += 1) {
    const cookie = cookieArray[i];
    let cookieValue = '';
    if (cookie.indexOf(cookieName) !== -1) {
      cookieValue = cookie.substring(cookieName.length + 2);
      return cookieValue;
    }
  }
  return undefined;
}
// 簡單處理 JS 逃逸，尚未完整分析理解這段細節
// from: https://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript/4835406#4835406
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
// 處理 nl2br，尚未完整分析理解這段細節
// from: https://gist.github.com/yidas/41cc9272d3dff50f3c9560fb05e7255e
function nl2br(str, replaceMode, isXhtml) {
  const breakTag = (isXhtml) ? '<br />' : '<br>';
  const replaceStr = (replaceMode) ? `$1${breakTag}` : `$1${breakTag}$2`;
  return (`${str}`).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr);
}

// 處理第一個主留言框
const form = document.querySelector('form');
if (getCookie('certificate') === undefined) {
  document.querySelector('.unlogin').classList.remove('invisible');
  form.addEventListener('click', () => {
    window.location = './login.php';
  });
} else {
  form.addEventListener('submit', (e) => {
    if (document.querySelector('textarea').value === '') {
      e.preventDefault();
      alert('你並沒有留言喔！');
    } else {
      alert('已經幫你把留言放上囉！');
    }
  });
}

// 處理編輯留言
const content = {};// 利用物件建立訊息容器
const msgboard = document.querySelector('.msgboard');
msgboard.addEventListener('click', (e) => {
  if (!e.target.classList.contains('msgcard__btn-edit')) return;

  let target = '';
  const postId = e.target.getAttribute('data-post_id');

  // 判斷是否為 p 元素
  if (e.target.parentNode.children[1].nodeName === 'P') {
    content[postId] = e.target.parentNode.querySelector('.msgcard__content').innerText;
  }
  const editForm = `
  <form action="./handle/handle_edit_msg.php">
    <textarea name="comments" class="msgcard__textarea">${content[postId]}</textarea>
    <div>
      <input type="text" name="post_id" value="${postId}" class="invisible">
      <input type="submit" value="Change 更改留言" class="msgcard__btn-send">
    </div>
  </form>`;

  if (!e.target.classList.contains('editing')) {
    e.target.innerText = 'Cancel 取消編輯';
    target = e.target.parentNode.querySelector('.msgcard__content');
    target.outerHTML = editForm;
  } else {
    e.target.innerText = 'Edit 編輯';
    target = e.target.parentNode.querySelector('form');
    target.outerHTML = `<p class="msgcard__content">${nl2br(escapeHtml(content[postId]))}</p>`;
  }
  e.target.classList.toggle('editing');
});
