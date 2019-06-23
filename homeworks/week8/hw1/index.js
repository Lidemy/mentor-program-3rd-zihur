const btn = document.querySelector('.main-bg__btn');
const contain = document.querySelector('.main-bg__contain');
const xhrRequest = new XMLHttpRequest();

// 不知道這樣包成一個 sendRequest 的函式，是否正確，雖然這作業沒用到很多次，但感覺這是會常用到的？
function sendRequest() {
  xhrRequest.open('get', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true);
  xhrRequest.send();
}
// 不知道能不能再簡化下面的，但我目前想不到，有想過把要添加的 CSS CLASS 直接命名成資料庫回傳的值，這樣可以再少四行吧，但是會變成 CSS 命名不統一。
function prizeResult() {
  sendRequest();
  xhrRequest.onload = () => {
    if (btn.innerText === '開始抽獎' && (xhrRequest.status >= 200 && xhrRequest.status < 400)) {
      const jsonData = JSON.parse(xhrRequest.responseText);
      const div = document.createElement('div');
      div.classList.add('prize-bg');
      contain.appendChild(div);
      btn.innerText = '再試一次';
      if (jsonData.prize === 'FIRST') {
        document.querySelector('.prize-bg').innerHTML = `
          <div class="prize-bg--first"></div>
          <div class="prize__content">恭喜你中頭獎了！日本東京來回雙人遊！</div>
        `;
      } else if (jsonData.prize === 'SECOND') {
        document.querySelector('.prize-bg').innerHTML = `
          <div class="prize-bg--second"></div>
          <div class="prize__content">二獎！90 吋電視一台！</div>
        `;
      } else if (jsonData.prize === 'THIRD') {
        document.querySelector('.prize-bg').innerHTML = `
          <div class="prize-bg--third"></div>
          <div class="prize__content">恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！</div>
        `;
      } else {
        document.querySelector('.prize-bg').innerHTML = `
          <div class="prize-bg--none"></div>
          <div class="prize__content">銘謝惠顧</div>
        `;
      }
    } else if (btn.innerText === '再試一次') {
      contain.removeChild(document.querySelector('.prize-bg'));
      btn.innerText = '開始抽獎';
    } else {
      alert('系統不穩定，請再試一次');
      console.log('something is error');
    }
  };
  xhrRequest.onerror = () => {
    console.log(xhrRequest.status);
  };
}

btn.addEventListener('click', prizeResult);
