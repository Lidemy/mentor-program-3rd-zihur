// 看了別人作法才想到，也能用後端 php 做預設值的處理，不知道哪種方式會比較好？
const select = document.querySelectorAll('select');
for (let i = 0; i < select.length; i += 1) {
  const auth = select[i].getAttribute('data-auth');
  const option = select[i].querySelectorAll('option');
  for (let j = 0; j < option.length; j += 1) {
    const value = option[j].getAttribute('value');
    if (auth === value) {
      option[j].setAttribute('selected', 'true');
    }
  }
}
