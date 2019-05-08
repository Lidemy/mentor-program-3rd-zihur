// 給定兩個長度為 l(1<=l<=1000)的數字（但型態為字串），請回傳兩個數字相加後的結果。
function add(a, b) {
  const aArrayReverse = a.split('').reverse();
  const bArrayReverse = b.split('').reverse();
  if (a.split('').length >= bArrayReverse.length) {
    for (let i = aArrayReverse.length; i > b.split('').length; i -= 1) {
      bArrayReverse.push('0');
    }
  } else {
    for (let i = b.split('').length; i > a.split('').length; i -= 1) {
      aArrayReverse.push('0');
    }
  }
  const aArray = aArrayReverse.reverse();
  const bArray = bArrayReverse.reverse();
  const resault = [];
  for (let i = aArray.length - 1; i >= 0; i -= 1) {
    resault[i] = parseInt(aArray[i], 10) + parseInt(bArray[i], 10);
    if (i === 0 && resault[i] >= 10) {
      resault[i] %= 10;
      resault.splice(0, 0, 1);
    } else if (resault[i] >= 10) {
      resault[i] %= 10;
      aArray[i - 1] = parseInt(aArray[i - 1], 10) + 1;
    }
  }
  return resault.join('').toString();
}

module.exports = add;

console.log(parseInt(0, 10));
console.log(add('111', '12311'));
console.log(add('12312383813881381381', '129018313819319831123'));
