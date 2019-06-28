const topGameName = [];
let gameSelect = '';
const ul = document.querySelector('.header__nav');
function getScreencast() {
  const xhr = new XMLHttpRequest();
  xhr.open('get', `https://api.twitch.tv/kraken/streams/?game=${gameSelect}`);
  xhr.setRequestHeader('Client-ID', 'u2i5e5oy5cwidtrgmt44nf110ty1vd');
  xhr.send();
  xhr.onload = () => {
    const streamData = JSON.parse(xhr.response).streams;
    document.querySelector('.title').innerText = gameSelect; // eslint-disable-line prefer-destructuring
    document.querySelector('.live-game').innerHTML = '';
    for (let i = 0; i < 20; i += 1) {
      const newLink = document.createElement('a');
      newLink.classList.add('live-game__box');
      newLink.setAttribute('href', streamData[i].channel.url);
      newLink.setAttribute('target', '_blank');
      newLink.setAttribute('alt', "Twitch's livestream");
      newLink.innerHTML = `
        <img class="live-game__screencast" src=${streamData[i].preview.medium}>
        <div class="live-game__content">
          <img class="live-game__avatar" src=${streamData[i].channel.logo}>
          <div class="live-game__info-block">
            <div class="live-game__title">${streamData[i].channel.status}</div>
            <div class="live-game__streamer">${streamData[i].channel.name}</div>
          </div>
        </div>
      `;
      document.querySelector('.live-game').appendChild(newLink);
    }
  };
}

function getTopGames(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('get', 'https://api.twitch.tv/kraken/games/top');
  xhr.setRequestHeader('Client-ID', 'u2i5e5oy5cwidtrgmt44nf110ty1vd');
  xhr.send();
  xhr.onload = () => {
    const streamData = JSON.parse(xhr.responseText).top;
    for (let i = 0; i < 5; i += 1) {
      const newList = document.createElement('li');
      newList.innerText = streamData[i].game.name;
      document.querySelector('.header__nav').appendChild(newList);
      topGameName.push(streamData[i].game.name);
    }
    document.querySelector('.header__nav > li').classList.add('actived');
    gameSelect = topGameName[0]; // eslint-disable-line prefer-destructuring
    callback();
  };
}

getTopGames(getScreencast);

ul.addEventListener('click', (e) => {
  gameSelect = e.target.innerText;
  getScreencast();
});
