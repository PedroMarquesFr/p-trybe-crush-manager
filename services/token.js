function ppid() {
  const num = 16;
  const elements = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  const token = [];
//   let tokenHasNoNumbers = true;
  //   while (tokenHasNoNumbers) {
  for (let index = 0; index < num; index++) {
    token.push(elements[Math.floor(Math.random() * elements.length)]);
    //   if (/\d/.test(token.join(""))) {
    //     tokenHasNoNumbers = false;
    //   }
  }
  //   }
  return token.join("");
}

module.exports = ppid;
