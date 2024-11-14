const myInstance = (obj, match) => {
  let proto = Object.getPrototypeOf(obj);
  while (true) {
    if (!proto) return false;
    if (proto === match.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
};

let obj = { name: "test" };

console.log(myInstance(obj, Object));
console.log(myInstance(obj, Array));

function fn2() {
  console.log("fn2");
}

console.log(myInstance(fn2, Function));
