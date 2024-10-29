function preciseInterval(callback, interval) {
  let startTime = Date.now() + interval;

  function next() {
    let diff = Date.now() - startTime;
    // 如果时间超过了设定的interval，就重新开始计时
    if (diff > interval) {
      startTime = Date.now() + interval;
    } else {
      startTime += interval;
    }

    callback();

    setTimeout(next, Math.max(0, interval - diff));
  }

  setTimeout(next, interval);
}
