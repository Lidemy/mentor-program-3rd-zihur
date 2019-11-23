// export default function add(a, b) {
//   return a + b;
// }


// 下面為測試第二種 export 方法，此方式看起來能同時
function add(a, b) {
  return a + b;
}

function mutiple(a, b) {
  return a * b;
}

module.exports = { add, mutiple };
