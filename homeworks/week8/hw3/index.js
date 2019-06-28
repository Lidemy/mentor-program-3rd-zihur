// API https://api.twitch.tv/kraken/streams/
// u2i5e5oy5cwidtrgmt44nf110ty1vd

function getTopGames() {
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
    }
    document.querySelector('.header__nav > li').classList.add('actived');
    // console.log(streamData[0].game.name);
    // console.log(streamData);
  };
}

function getScreencast() {
  const xhr = new XMLHttpRequest();
  xhr.open('get', 'https://api.twitch.tv/kraken/streams/');
  xhr.setRequestHeader('Client-ID', 'u2i5e5oy5cwidtrgmt44nf110ty1vd');
  xhr.send();
  xhr.onload = () => {
    const streamData = JSON.parse(xhr.responseText).streams;
    for (let i = 0; i < 20; i += 1) {
      const newImg = document.createElement('img');
      const newDiv = document.createElement('div');
      newImg.setAttribute('src', streamData[i].preview.medium);
      newDiv.classList.add('live-game__box');
      newDiv.innerHTML = `
        <img class="live-game__screencast" src=${streamData[i].preview.medium}>
        <div class="live-game__content">
          <img class="live-game__avatar" src=${streamData[i].channel.logo}>
          <div class="live-game__info-block">
            <div class="live-game__title">${streamData[i].channel.status}</div>
            <div class="live-game__streamer">${streamData[i].channel.name}</div>
          </div>
        </div>
      `;
      document.querySelector('.live-game').appendChild(newDiv);
    }
  };
}

getTopGames();
getScreencast();
