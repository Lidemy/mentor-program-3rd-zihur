const submit = document.querySelector('.form__btn');
const input = document.querySelectorAll('input');
const formQuestion = document.querySelectorAll('.form__question');
const registrationType = document.querySelectorAll('input[name=registrationType]');

function returnRadioValue() {
  if (registrationType[0].checked) {
    return input[2].value;
  }
  return input[3].value;
}

function successResult() {
  console.log('email:', input[0].value);
  console.log('nickname:', input[1].value);
  console.log('registrationType', returnRadioValue());
  console.log('career:', input[4].value);
  console.log('howToKnow:', input[5].value);
  console.log('experience', input[6].value);
  console.log('other:', input[7].value);
}

function checkError() {
  let result = false;
  const inputText = document.querySelectorAll('.form__question>input');
  for (let i = 0; i <= inputText.length - 2; i += 1) {
    if (inputText[i].value === '' && inputText[i].closest('.form__question').classList.contains('error') === false) {
      inputText[i].closest('.form__question').classList.add('error');
      inputText[i].style['border-bottom'] = '1px solid rgb(200, 0, 0)';
      inputText[i].style.transition = 'all 0.5s';
      const newDiv = document.createElement('div');
      newDiv.innerText = '這是必填問題';
      newDiv.classList.add('errorText');
      inputText[i].closest('.form__question').appendChild(newDiv);
    }
    if (inputText[i].value === '') {
      result = true;
    }
  }
  return result;
}

// 驗證信箱
input[0].addEventListener('click', (e) => {
  e.stopPropagation();
  const clickEvent = () => {
    if (input[0].value === '' && formQuestion[0].classList.contains('error') === false) {
      formQuestion[0].classList.add('error');
      input[0].style['border-bottom'] = '1px solid rgb(200, 0, 0)';
      input[0].style.transition = 'all 0.5s';
      const newDiv = document.createElement('div');
      newDiv.innerText = '這是必填問題';
      newDiv.classList.add('errorText');
      formQuestion[0].appendChild(newDiv);
    } else if (input[0].value !== '' && formQuestion[0].classList.contains('error')) {
      formQuestion[0].classList.remove('error');
      input[0].removeAttribute('style');
      formQuestion[0].removeChild(document.querySelector('#email + .errorText'));
    }
    window.removeEventListener('click', clickEvent);
  };
  window.addEventListener('click', clickEvent);
}, true);

// 驗證暱稱
input[1].addEventListener('click', (e) => {
  e.stopPropagation();
  const clickEvent = () => {
    if (input[1].value === '' && formQuestion[1].classList.contains('error') === false) {
      formQuestion[1].classList.add('error');
      input[1].style['border-bottom'] = '1px solid rgb(200, 0, 0)';
      input[1].style.transition = 'all 0.5s';
      const newDiv = document.createElement('div');
      newDiv.innerText = '這是必填問題';
      newDiv.classList.add('errorText');
      formQuestion[1].appendChild(newDiv);
    } else if (input[1].value !== '' && formQuestion[1].classList.contains('error')) {
      formQuestion[1].classList.remove('error');
      input[1].removeAttribute('style');
      formQuestion[1].removeChild(document.querySelector('#nickname + .errorText'));
    }
    window.removeEventListener('click', clickEvent);
  };
  window.addEventListener('click', clickEvent);
}, true);

// 驗證報名選項
formQuestion[2].addEventListener('click', (e) => {
  e.stopPropagation();
  if (formQuestion[2].classList.contains('error')) {
    formQuestion[2].classList.remove('error');
    formQuestion[2].removeChild(document.querySelector('.form__question--option + .errorText'));
  }
});

// 驗證職業
input[4].addEventListener('click', (e) => {
  e.stopPropagation();
  const clickEvent = () => {
    if (input[4].value === '' && formQuestion[3].classList.contains('error') === false) {
      formQuestion[3].classList.add('error');
      input[4].style['border-bottom'] = '1px solid rgb(200, 0, 0)';
      input[4].style.transition = 'all 0.5s';
      const newDiv = document.createElement('div');
      newDiv.innerText = '這是必填問題';
      newDiv.classList.add('errorText');
      formQuestion[3].appendChild(newDiv);
    } else if (input[4].value !== '' && formQuestion[3].classList.contains('error')) {
      formQuestion[3].classList.remove('error');
      input[4].removeAttribute('style');
      formQuestion[3].removeChild(document.querySelector('#career + .errorText'));
    }
    window.removeEventListener('click', clickEvent);
  };
  window.addEventListener('click', clickEvent);
}, true);


// 驗證如何知道計劃
input[5].addEventListener('click', (e) => {
  e.stopPropagation();
  const clickEvent = () => {
    if (input[5].value === '' && formQuestion[4].classList.contains('error') === false) {
      formQuestion[4].classList.add('error');
      input[5].style['border-bottom'] = '1px solid rgb(200, 0, 0)';
      input[5].style.transition = 'all 0.5s';
      const newDiv = document.createElement('div');
      newDiv.innerText = '這是必填問題';
      newDiv.classList.add('errorText');
      formQuestion[4].appendChild(newDiv);
    } else if (input[5].value !== '' && formQuestion[4].classList.contains('error')) {
      formQuestion[4].classList.remove('error');
      input[5].removeAttribute('style');
      formQuestion[4].removeChild(document.querySelector('#howToKnow + .errorText'));
    }
    window.removeEventListener('click', clickEvent);
  };
  window.addEventListener('click', clickEvent);
}, true);

// 驗證相關知識背景
input[6].addEventListener('click', (e) => {
  e.stopPropagation();
  const clickEvent = () => {
    if (input[6].value === '' && formQuestion[5].classList.contains('error') === false) {
      formQuestion[5].classList.add('error');
      input[6].style['border-bottom'] = '1px solid rgb(200, 0, 0)';
      input[6].style.transition = 'all 0.5s';
      const newDiv = document.createElement('div');
      newDiv.innerText = '這是必填問題';
      newDiv.classList.add('errorText');
      formQuestion[5].appendChild(newDiv);
    } else if (input[6].value !== '' && formQuestion[5].classList.contains('error')) {
      formQuestion[5].classList.remove('error');
      input[6].removeAttribute('style');
      formQuestion[5].removeChild(document.querySelector('#experience + .errorText'));
    }
    window.removeEventListener('click', clickEvent);
  };
  window.addEventListener('click', clickEvent);
}, true);

// 表單送出前驗證
submit.addEventListener('click', (e) => {
  if (checkError() || !(registrationType[0].checked || registrationType[1].checked)) {
    if (!(registrationType[0].checked || registrationType[1].checked) && !formQuestion[2].classList.contains('error')) {
      formQuestion[2].classList.add('error');
      const newDiv = document.createElement('div');
      newDiv.innerText = '這是必填問題';
      newDiv.classList.add('errorText');
      formQuestion[2].appendChild(newDiv);
    }
    e.preventDefault();
    return alert('OPPS！你還有問題沒有填寫到唷！');
  }
  successResult();
  return alert('成功送出囉！');
});

// eastEgg 監聽
document.querySelector('.reportIcon').addEventListener('click', (e) => {
  e.stopPropagation();
  document.querySelector('.eastEgg').classList.remove('hidden');
  document.addEventListener('click', () => {
    document.querySelector('.eastEgg').classList.add('hidden');
  });
}, true);
