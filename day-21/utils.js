function toASCII(str) {
  const arr = str.split("").map(c => c.charCodeAt(0));
  arr.push(10);
  return arr;
}

function toText(arr) {
  let str = "";
  arr.forEach(a => {
    str += String.fromCharCode(a);
  });
  return str;
}

module.exports = {
  toASCII,
  toText
};
