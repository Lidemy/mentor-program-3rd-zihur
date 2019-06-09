let startTime = Number;
let endTime = Number;
const changeBgColor = function changeBgColor() {
  document.querySelector('body').classList.add('bg--color');
  startTime = new Date().getTime();
  return startTime;
};

const resetGame = function resetGame() {
  document.querySelector('button').addEventListener('click', () => {
    document.querySelector('body').classList.remove('bg--color');
    document.querySelector('div').removeChild(document.querySelector('button'));
  });
};

const timeoutID = setTimeout(changeBgColor, Math.floor(Math.random() * 3000 + 1000));

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
  resetGame();
};

document.addEventListener('click', result);
