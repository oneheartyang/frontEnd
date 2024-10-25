/**
 * 中心扩展法
 */
const getLongestString = (str) => {
  const sLen = str.length;
  if (sLen <= 0) return "";

  // 记录最长回文的起始下标
  let start = 0;
  let end = 0;

  // 根据起始位置进行中心扩展
  function expendAroundCenter(left, right) {
    while (left >= 0 && right < sLen && str[left] === str[right]) {
      left--;
      right++;
    }

    //返回长度以及下标
    return right - left - 1;
  }

  for (let i = 0; i < sLen; i++) {
    const len1 = expendAroundCenter(i, i);
    const len2 = expendAroundCenter(i, i + 1);

    // 比较长度，取较大的
    const len = Math.max(len1, len2);
    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor((len - 1) / 2);
    }
  }

  return str.substring(start, end + 1);
};

let str = "bbbdsadfsadfasdfkasldfklsdkflsdafsadf";

console.log(getLongestString(str));
