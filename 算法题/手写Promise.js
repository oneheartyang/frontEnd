/**
 * 自定义实现类
 */

// promise 有三种状态：pending fulfilled rejected，并且状态一旦方式变更，就不能再变
const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_FULFILLED = "fulfilled";
const PROMISE_STATUS_REJECTED = "rejected";

// promise 是一个类，实例传入一个executor函数,立即执行，
// 里面有 resolve reject 两个函数，作为调用参数
// 原型上还有then方法，可以传入两个回调，分别是 成功的回调 和失败的回调
// 调用 resolve 之后进入 成功的回调
// 调用 reject 之后进入 失败的回调
class MyPromise {
  status = PROMISE_STATUS_PENDING; // promise初始状态
  value = undefined; // 保存成功的状态值
  reason = undefined; // 保存失败的状态值
  onResolvedCallbacks = []; // 保存成功的回调
  onRejectedCallbacks = []; // 保存失败的回调
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;

    const resolve = (value) => {
      if (this.status !== PROMISE_STATUS_PENDING) return;
      this.status = PROMISE_STATUS_FULFILLED;
      this.value = value;
      while (this.onResolvedCallbacks.length) {
        this.onResolvedCallbacks.shift()(this.value);
      }
    };

    const reject = (reason) => {
      if (this.status !== PROMISE_STATUS_PENDING) return;
      this.status = PROMISE_STATUS_REJECTED;
      this.reason = reason;
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(this.reason);
      }
    };

    executor(resolve, reject);
  }

  then(onFulfilled, onRejected) {
    // 兼容传参
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };

    let promise = new MyPromise((resolve, reject) => {
      const fulfilledCallback = (value) => {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(value);
            resolvePromise(promise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };

      const rejectedCallback = (reason) => {
        queueMicrotask(() => {
          try {
            const x = onRejected(reason);
            resolvePromise(promise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };

      if (this.status === PROMISE_STATUS_FULFILLED) {
        fulfilledCallback(this.value);
      } else if (this.status === PROMISE_STATUS_REJECTED) {
        rejectedCallback(this.reason);
      } else if (this.status === PROMISE_STATUS_PENDING) {
        this.onResolvedCallbacks.push(() => {
          fulfilledCallback(this.value);
        });
        this.onRejectedCallbacks.push(() => {
          rejectedCallback(this.reason);
        });
      }
    });

    return promise;
  }
}

function resolvePromise(promise, x, resolve, reject) {
  // 判断x是不是promise
  if (x === promise) {
    throw new TypeError("Chaining cycle detected for promise #<Promise>");
  }

  let called;
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    try {
      const then = x.then;
      if (typeof then === "function") {
        then.call(x, (res) => {
          if (called) return;
          called = true;
          //递归执行，避免value是一个PromiseLike,Promise.resolve中的嵌套thenable在这里解决。
          resolvePromise(promise, res, resolve, reject);
        });
      } else {
        resolve(x);
        return;
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}

const promise = new MyPromise((resolve, reject) => {
  resolve(1);
})
  .then((res) => {
    console.log(res);
    return res;
  })
  .then((res) => {
    console.log(res);
    return res;
  });
