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
  if (checkError() || !(input[3].checked || input[4].checked)) {
    e.preventDefault();
    alert('有東西沒填到喔！');
  }
});
if (document.referrer === document.URL) {
  const newP = document.createElement('p');
  newP.classList.add('mention');
  newP.innerText = '帳號重複囉！';
  document.querySelector('.main .wrap').insertBefore(newP, form);
}
