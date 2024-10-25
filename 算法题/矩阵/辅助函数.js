/**
 * 初始化一个二维数组
 * @param {number} r 行数
 * @param {number} c 列数
 * @param {*} init 初始值
 */
const initMatrix = (r, c, init = 0) => {
  return new Array(r).fill(init).map((item) => {
    return new Array(c).fill(init);
  });
};

/**
 * 获取一个二维数组的行数和列数
 * @param {any[][]} matrix
 * @return [row, col]
 */
const getMatrixRowAndCol = (matrix) => {
  return [matrix.length, matrix[0].length];
};

/**
 * 遍历一个二维数组
 * @param {any[][]} matrix
 * @param {Function} func
 */
const matrixFor = (matrix, func) => {
  const [row, col] = getMatrixRowAndCol(matrix);
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      func(matrix[i][j], i, j);
    }
  }
};

/**
 * 获取矩阵第index个元素 从0开始
 * @param {any[][]} matrix
 * @param {number} index
 */
const getMatrixIndex = (matrix, index) => {
  const [row, col] = getMatrixRowAndCol(matrix);
  const i = Math.floor(index / col);
  const j = index % col;
  return matrix[i][j];
};

const matrix = initMatrix(3, 4);
console.log(getMatrixIndex(matrix, 2));
