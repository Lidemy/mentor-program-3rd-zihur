// 寫出這段程式碼的時候，真心對於那個當初對 DOM 的厭惡，變成能這樣操控自如的自己感到驕傲 XD
// 沒想到真的會在除了面試題之外用到雙迴圈，這段程式碼真的寫比想像中順
// 令下拉式選單的預設值能夠直接符合資料庫內使用者的權限
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
// 這段原本想直接在 php 端用 switch 或 if 去寫
// 但感覺重複太多次了，後來想到或許可以用 js 在事後加上 selected 屬性
// 這樣之後如果要增加權限種類，php 端就可以不用多寫其他的 if 判斷了
// 但畢竟直接用 if 判斷，維護的人很直覺，也寫得很快，所以不知道這樣會不會過度工程化或著想太多？
