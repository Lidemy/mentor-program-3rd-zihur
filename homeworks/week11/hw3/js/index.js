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
// 處理第一個主留言框
const form = document.querySelector('form');
if (getCookie('certificate') === undefined) {
  document.querySelector('.unlogin').classList.remove('invisible');
  form.addEventListener('click', () => {
    window.location = './login.php';
  });
} else {
  form.addEventListener('submit', () => {
    if (document.querySelector('textarea').value === '') {
      alert('你並沒有留言喔！');
    } else {
      alert('已經幫你把留言放上囉！');
    }
  });
}
// 處理編輯事件
const editBtn = document.querySelectorAll('.msgcard__btn-edit');
document.querySelectorAll('msgcard');
for (let i = 0; i < editBtn.length; i += 1) {
  // 雖然不知道是不是好方法，但自認自己能想到這個陣列解法避免多次觸發真的很棒，哈哈
  const set = [];
  editBtn[i].addEventListener('click', () => {
    const newForm = document.createElement('form');
    const postId = editBtn[i].getAttribute('data-post_id');
    if (!set[i]) {
      newForm.setAttribute('action', './handle_edit_msg.php');
      newForm.setAttribute('method', 'UPDATE');
      newForm.innerHTML = `<textarea name="comments" class="msgcard__textarea"></textarea>
                           <input type="text" name="post_id" value="${postId}" class="invisible">
                           <input type="submit" value="更改留言" class="msgcard__btn-send">`;
      editBtn[i].closest('.msgcard').appendChild(newForm);
      set[i] = true;
    }
  });
}
