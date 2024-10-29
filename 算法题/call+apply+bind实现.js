Function.prototype.myCall = function (obj, ...args) {
  obj = obj || globalThis;

  const key = Symbol();

  obj[key] = this;

  const result = obj[key](...args);

  delete obj[key];

  return result;
};

Function.prototype.myApply = function (obj, args) {
  obj = obj || globalThis;
  const key = Symbol();
  obj[key] = this;
  const result = obj[key](...args);
  delete obj[key];
  return result;
};
Function.prototype.myBind = function (obj, ...args) {
  const orginalFunc = this;
  return function (...newArgs) {
    return orginalFunc.apply(obj, [...args, ...newArgs]);
  };
};

// 测试代码
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: "Alice" };

greet.myCall(person, "Hello", "!"); // 输出: Hello, Alice!
greet.myApply(person, ["Hello", "!"]); // 输出: Hello, Alice!
const bind = greet.myBind(person, "Hello");

bind("1"); // 输出: Hello, Alice!

for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(() => {
      console.log(j);
    }, 1000);
  })(i);
}

async function delay(cb, time, args) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(cb(args));
    }, time);
  });
}

delay((str) => str, 3000, "Hello world").then((res) => console.log(res));

function observeArray(arr, callback) {
  const arrProxy = {};

  arr.forEach((item, index) => {
    Object.defineProperty(arrProxy, index, {
      get() {
        return arr[index];
      },
      set(newValue) {
        console.log(`Index ${index} changed from ${arr[index]} to ${newValue}`);
        arr[index] = newValue;
        callback(index, newValue);
      },
      configurable: true,
      enumerable: true,
    });
  });

  const arrayMethods = [
    "push",
    "pop",
    "shift",
    "unshift",
    "splice",
    "sort",
    "reverse",
  ];

  arrayMethods.forEach((method) => {
    arrProxy[method] = function(...args) {
        const result = Array.prototype[method].apply(arr, args);
        console.log(`Array method ${method} called with arguments: ${args}`);


    }
  })
}
