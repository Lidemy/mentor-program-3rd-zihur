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

const form = document.querySelector('form');
if (getCookie('member_id') === undefined) {
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
      // 下面本來想寫動態更新，但測試後發現會轉址出去再轉回來，動態更新就沒了，所以直接改用alert。
      // const msgboard = document.querySelector('.msgboard');
      // const newP = document.createElement('p');
      // newP.classList.add('mention');
      // newP.innerText('已經幫你把留言放上囉！');
      // document.querySelector('main .wrap').insertBefore(newP, msgboard);
    }
  });
}

/* 這段沒用到
原本是根據是否登入，載入不同的 js 檔案，初衷是覺得應該要分開管理不同狀態 js，不知道是不是個好方法
但感覺在這專案有點過度工程化了，所以又把程式寫在同份文件了，雖說如此還是把下面面這段程式碼先保留了下來
if (getCookie('member_id') === undefined) {
  const newScript = document.createElement('script');
  newScript.setAttribute('src','./js/index_visitor.js');
  newScript.setAttribute('defer', 'defer');
  document.querySelector('head').appendChild(newScript);
} else {
  const newScript = document.createAttribute('script');
  newScript.setAttribute('src','./js/index_login.js');
  newScript.setAttribute('defer', 'defer');
  document.querySelector('head').appendChild(newScript);
}
*/
