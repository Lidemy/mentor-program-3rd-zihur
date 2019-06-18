let currentNum = 0;
let iterNum = '';
let typeNum = '';
let status = 'start';
const answer = document.querySelector('.answer');
const numBtn = document.querySelectorAll('.caculate__num');
const operatorBtn = document.querySelectorAll('.caculate__operator');
const resetBtn = document.querySelector('.caculate__reset');
const equalBtn = document.querySelector('.caculate__btn--span2');

// 將數字按鈕過程顯示到螢幕框上
function showText(e) {
  typeNum += (e.target.getAttribute(['data-value']));
  iterNum = typeNum;
  answer.innerText = typeNum;
}
// 等於功能
function equal() {
  if (status === 'plus') {
    currentNum += parseFloat(iterNum, 10);
    answer.innerText = currentNum;
  } else if (status === 'subtraction') {
    currentNum -= parseFloat(iterNum, 10);
    answer.innerText = currentNum;
  } else if (status === 'mutiple') {
    currentNum *= parseFloat(iterNum, 10);
    answer.innerText = currentNum;
  } else if (status === 'devide') {
    currentNum /= parseFloat(iterNum, 10);
    answer.innerText = currentNum;
  }
}
// 加法功能
function plus() {
  if (status === 'start') {
    currentNum = parseFloat(answer.innerText, 10);
    typeNum = '';
    status = 'plus';
  }
  typeNum = '';
  status = 'plus';
}
// 減法功能
function subtract() {
  if (status === 'start') {
    currentNum = parseFloat(answer.innerText, 10);
    typeNum = '';
    status = 'subtraction';
  }
  typeNum = '';
  status = 'subtraction';
}
// 乘法功能
function mutiple() {
  if (status === 'start') {
    currentNum = parseFloat(answer.innerText, 10);
    typeNum = '';
    status = 'mutiple';
  }
  typeNum = '';
  status = 'mutiple';
}
// 除法功能
function divide() {
  if (status === 'start') {
    currentNum = parseFloat(answer.innerText, 10);
    typeNum = '';
    status = 'devide';
  }
  typeNum = '';
  status = 'devide';
}

// 偵測各數字按鈕
for (let i = 0; i < numBtn.length; i += 1) {
  numBtn[i].addEventListener('click', (e) => {
    showText(e);
  });
}
// 偵測加法按鍵
operatorBtn[0].addEventListener('click', (e) => {
  plus(e);
});
// 偵測減法按鍵
operatorBtn[1].addEventListener('click', (e) => {
  subtract(e);
});
// 偵測乘法按鍵
operatorBtn[2].addEventListener('click', (e) => {
  mutiple(e);
});
// 偵測除法按鍵
operatorBtn[3].addEventListener('click', (e) => {
  divide(e);
});
// 偵測等於按鍵
equalBtn.addEventListener('click', (e) => {
  equal(e);
});
// 偵測歸零按鍵
resetBtn.addEventListener('click', () => {
  currentNum = 0;
  iterNum = '';
  typeNum = '';
  status = 'start';
  answer.innerText = currentNum;
});
