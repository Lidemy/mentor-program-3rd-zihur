// export default function add(a, b) {
//   return a + b;
// }


/**
 * 下面為測試第二種 export 方法，此方式看起來能同時匯出多個 function
 * 但再引入時需要特別使用物件的方式去 call 不同的 function
 * 不知道是否能在匯出時就定義好引入時使用的變數名稱
 */
function add(a, b) {
  return a + b;
}

function mutiple(a, b) {
  return a * b;
}

module.exports = { add, mutiple };
