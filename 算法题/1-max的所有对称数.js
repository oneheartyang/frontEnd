/**
 * 数字转字符串反转
 * @param {*} max
 * @returns
 */
function findPalindromeNumber(max) {
  const res = [];

  if (max <= 0) {
    return res;
  }

  for (let i = 1; i <= max; i++) {
    const s = i.toString();

    if (s === s.split("").reverse().join("")) {
      res.push(i);
    }
  }

  return res;
}

/**
 * 循环判断
 * @param {*} max
 * @returns
 */
function findPalindromeNumber2(max) {
  const res = [];
  if (max <= 0) {
    return res;
  }

  for (let i = 1; i <= max; i++) {
    let s = i.toString();
    let startIndex = 0;
    let endIndex = s.length - 1;

    let flag = true;
    while (startIndex < endIndex) {
      if (s[startIndex] !== s[endIndex]) {
        flag = false;
        break;
      } else {
        startIndex++;
        endIndex--;
      }
    }

    if (flag) {
      res.push(i);
    }
  }

  return res;
}

/**
 * 生成翻转数
 * @param {*} max
 * @returns
 */
function findPalindromeNumber3(max) {
  const res = [];

  if (max <= 0) {
    return res;
  }

  for (let i = 0; i <= max; i++) {
    let n = i;
    let ret = 0;

    //生成翻转数
    while (n > 0) {
      ret = ret * 10 + (n % 10);
      n = Math.floor(n / 10);
    }

    if (ret === i) {
      res.push(i);
    }
  }

  return res;
}
const ret = findPalindromeNumber2(200);
console.log(ret);
