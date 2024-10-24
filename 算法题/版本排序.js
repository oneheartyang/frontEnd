/**
 * 样例输入：versions = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']
 * 输出：['0.1.1', '0.302.1', '2.3.3', '4.3.4.5', '4.3.5']
 */

const sortVersion = (versions) => {
  return versions.sort((v1, v2) => {
    const v1List = v1.split(".");
    const v2List = v2.split(".");

    const maxLen = Math.max(v1List.length, v2List.length);
    // 数据补全
    while (v1List.length < maxLen) {
      v1List.push(0);
    }
    while (v2List.length < maxLen) {
      v2List.push(0);
    }

    for (let i = 0; i < maxLen; i++) {
      const tV1 = v1List[i];
      const tV2 = v2List[i];

      if (tV1 < tV2) {
        return -1;
      } else if (tV1 > tV2) {
        return 1;
      }
    }

    return -1;
  });
};

const versions = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5'];
console.log(sortVersion(versions));
