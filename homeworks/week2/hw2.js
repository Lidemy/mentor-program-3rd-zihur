function capitalize(str) {
  let newStr = '';
  for (let i = 0; i < str.length; i += 1) {
    if (i === 0) {
      newStr += str[i].toUpperCase();
    } else {
      newStr += str[i];
    }
  }
  return newStr;
}

console.log(capitalize(',hello'));
