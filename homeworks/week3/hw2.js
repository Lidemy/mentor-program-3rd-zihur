// 給定一字串，把小寫字母轉成大寫，大寫字母轉成小寫之後回傳，若不是英文字母則忽略。
function alphaSwap(str) {
  let newStr = '';
  for (let i = 0; i < str.length; i += 1) {
    if (str[i] <= 'Z') {
      newStr += str[i].toLowerCase();
    } else {
      newStr += str[i].toUpperCase();
    }
  }
  return newStr;
}

module.exports = alphaSwap;
