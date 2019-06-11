let startTime = Number;
let endTime = Number;
const randomCountToChangeBgColor = () => timeoutID = setTimeout(changeBgColor, Math.floor(Math.random() * 3000 + 1000));
// 原本沒有設定 function 直接在其他功能裡設定 timeoutID，但不知道為什麼清除不了。待解問題。

const changeBgColor = function changeBgColor() {
  document.querySelector('body').classList.add('bg--color');
  startTime = new Date().getTime();
  return startTime;
};

const restartGame = function restartGame(e) {
  e.stopPropagation();
  document.querySelector('body').classList.remove('bg--color');
  document.querySelector('div').removeChild(document.querySelector('button'));
  document.addEventListener('click', result);
  randomCountToChangeBgColor();
};

const result = function result() {
  if (document.querySelector('body').classList.contains('bg--color')) {
    endTime = new Date().getTime();
    alert(`你的成績是 ${(endTime - startTime) / 1000} 秒`);
    const btn = document.createElement('button');
    btn.classList.add('btn--replay');
    btn.innerText = '再試一次';
    document.querySelector('div').appendChild(btn);
  } else {
    alert('失敗！還沒變色喔！');
    const btn = document.createElement('button');
    btn.classList.add('btn--replay');
    btn.innerText = '再試一次';
    document.querySelector('div').appendChild(btn);
    clearTimeout(timeoutID);
  }
  document.removeEventListener('click', result);
  document.querySelector('button').addEventListener('click', restartGame, true);
};

document.addEventListener('click', result);
randomCountToChangeBgColor();
