const limitRequests = (urls, limit = 6) => {
  const len = urls.length;
  return new Promise((resolve, reject) => {
    let count = 0;
    function start() {
      const url = urls.shift();
      if (!url) return;

      fetch(url)
        .then((res) => {
          console.log(res);
        })
        .finally(() => {
          if (count === len - 1) {
            resolve();
          } else {
            count++;
            start();
          }
        });
    }

    while (limit > 0) {
      start();
      limit--;
    }
  });
};

function countLimit(fn, tasks, limit = 2) {
  let activeCount = 0;
  let queue = [...tasks];
  let result = [];

  return new Promise((resolve, reject) => {
    function next() {
      if (activeCount === 0 && queue.length === 0) {
        resolve(result);
        return;
      }

      while (activeCount < limit && queue.length > 0) {
        const task = queue.shift();
        activeCount++;

        fn(task)
          .then((res) => {
            console.log(res);
            resolve(res);
            result.push(res);
          })
          .finally(() => {
            activeCount--;
            next();
          });
      }
    }

    next();
  });
}

// 示例函数：假设每个任务是一个返回 Promise 的函数
const fn = (task) =>
  new Promise((resolve) => setTimeout(() => resolve(task), 1000));

// 调用 countLimit，传入任务列表和并发度
countLimit(fn, [1, 2, 3, 4, 5], 2).then((results) => {
  console.log("所有任务完成:", results);
});
