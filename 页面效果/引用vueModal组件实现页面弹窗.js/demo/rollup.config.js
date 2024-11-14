// 用于es6转es5
import { babel } from "@rollup/plugin-babel";
// 用于代码压缩
import { terser } from "rollup-plugin-terser";

const config = {
  input: "./src/index.js",
};
