// 給定 n（1<=n<=30），依照規律「回傳」正確圖形（每一行是一個陣列的元素）
function stars(n) {
  const resualt = [];
  for (let i = 0; i < n; i += 1) {
    let addStar = '';
    for (let j = 0; j <= i; j += 1) {
      addStar += '*';
    }
    resualt[i] = addStar;
  }
  return (resualt);
}

module.exports = stars;
