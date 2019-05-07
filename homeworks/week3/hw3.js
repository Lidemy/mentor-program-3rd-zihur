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
