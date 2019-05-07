// 給定一個數字 n（1<=n<=100000），請回傳 n 是否為質數（質數的定義：除了 1 以外，所有小於他的數都無法整除）
function isPrime(n) {
  const factor = [];
  for (let i = 1; i <= n; i += 1) {
    if (n % i === 0) {
      factor.push(i);
    }
  }
  return factor.length === 2;
}

module.exports = isPrime;
