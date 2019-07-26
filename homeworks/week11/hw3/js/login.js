const form = document.querySelector('form');
const input = document.querySelectorAll('input');

function checkError() {
  let result = false;
  for (let i = 0; i <= input.length - 1; i += 1) {
    if (input[i].value === '') {
      result = true;
    }
  }
  return result;
}
form.addEventListener('submit', (e) => {
  if (checkError()) {
    e.preventDefault();
    alert('有東西沒填到喔！');
  }
});

// 我覺得下面這段肯定不是這樣寫，但是我目前想不到更好方法可以快速在原頁面提交後提示帳密有錯誤的訊息
// 雖然可以多寫一個錯誤提示頁面後，再重新導回註冊頁
// 或著跟首頁一樣多帶一個錯誤資訊的 cookie 回來，讓 JS 判斷後，再把原隱藏的 div 打開，感覺都很麻煩。
if (document.referrer === document.URL) {
  const newP = document.createElement('p');
  newP.classList.add('mention');
  newP.innerText = '你的帳號密碼有錯誤喔！';
  document.querySelector('.main .wrap').insertBefore(newP, form);
}
