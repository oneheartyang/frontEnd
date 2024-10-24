function getPercentWithPrecision(valueList, precision) {
  // 将保留的小数放大
  const digits = Math.pow(10, precision);
  // 计算总和
  const total = valueList.reduce((acc, cur) => acc + cur, 0);
  // 计算百分比
  const valuePerList = valueList.map((value) => {
    return (value / total) * 100 * digits;
  });

  const seats = valuePerList.map((value) => Math.floor(value));
  const remainer = valuePerList.map((value) => value - Math.floor(value));
  let currSeats = seats.reduce((acc, cur) => acc + cur, 0);
  let totalSeats = 100 * digits;

  while (totalSeats - currSeats > 0) {
    let i = -1;
    let maxValue = Number.NEGATIVE_INFINITY;

    for (let j = 0; j < remainer.length; j++) {
      if (remainer[j] > maxValue) {
        maxValue = remainer[j];
        i = j;
      }
    }

    currSeats++;
    remainer[i] = 0;
    seats[i]++;
  }

  return seats.map((value) => (value / digits).toFixed(precision));
}

const valueList = [56, 12, 48, 56];
const precision = 3;

const ret = getPercentWithPrecision(valueList, precision);

console.log(ret);
