function join(arr, concatStr) {
  let newStr = arr[0];
  for (let i = 1; i < arr.length; i += 1) {
    newStr += concatStr;
    newStr += arr[i];
  }
  return newStr;
}

function repeat(str, times) {
  let newStr = '';
  for (let i = 1; i <= times; i += 1) {
    newStr += str;
  }
  return newStr;
}

console.log(join(['a', 1, 'b', 2, 'c', 3], '!'));
console.log(repeat('yoyo', 2));
