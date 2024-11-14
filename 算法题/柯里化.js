const hyCurrying = (fn) => {
  const currying = (...args) => {
    console.log(args.length, fn.length);
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function currying2(...args2) {
        return currying.apply(this, [...args, ...args2]);
      };
    }
  };

  return currying;
};

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = hyCurrying(add);
console.log(curriedAdd(1)(2)(3)); // 输出 6
console.log(curriedAdd(1, 2)(3)); // 输出 6
// console.log(curriedAdd(1)(2, 3)); // 输出 6
