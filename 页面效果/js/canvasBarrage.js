// (function () {

// })();
class CanvasBarrage {
  constructor(canvas, speed, channels, barrageList) {
    this.canvas = document.getElementById(canvas);
    this.speed = speed;
    this.channels = channels;
    this.barrageList = barrageList;

    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.ctx = this.canvas.getContext("2d");
    this.ctx1 = document.getElementById("canvas1").getContext("2d");
    this.channelQuene = [];
    this.barrageQueue = [];
    this.animationId = null;

    this.init();
  }

  getColor() {
    // return (
    //   "#" +
    //   ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6)
    // );
    return "#89cff0";
  }

  initBarrageQueue() {
    const barrageQueue = [];
    for (let i = 0; i < this.barrageList.length; i++) {
      const barrage = this.barrageList[i];
      const content = this.dealStr(barrage);

      barrageQueue.push({
        content,
        left: this.width,
        width: this.ctx1.measureText(content).width * 2,
        color: this.getColor(),
      });
    }

    this.barrageQueue = JSON.parse(JSON.stringify(barrageQueue));
  }

  initChannelQueue() {
    const channelQuene = new Array(this.channels).fill([]);

    const min = Math.min(this.channels, this.barrageQueue.length);
    const initBarrage = this.barrageQueue.splice(0, min);

    for (let i = 0; i < min; i++) {
      channelQuene[i] = [initBarrage[i]];
    }

    this.channelQuene = JSON.parse(JSON.stringify(channelQuene));
  }

  init(r = false) {
    this.initBarrageQueue();
    this.initChannelQueue();

    if (r) {
      return;
    }
    this.render();
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.font = "20px Microsoft YaHei";
    this.draw();

    window.requestAnimationFrame(this.render.bind(this));
  }

  getChanne() {
    for (let i = 0; i < this.channels; i++) {
      // 当前赛道为空，则直接放进去
      if (this.channelQuene[i].length === 0) {
        return i;
      }
      const lastBarrage = this.channelQuene[i][this.channelQuene[i].length - 1];
      if (lastBarrage.left <= Math.floor(this.width - barrage.width - 40)) {
        return i;
      }
    }

    return -1;
  }

  draw() {
    for (let i = 0; i < this.channelQuene.length; i++) {
      for (let j = 0; j < this.channelQuene[i].length; j++) {
        const barrage = this.channelQuene[i][j];
        barrage.left -= this.speed;
        if (barrage.left <= this.width) {
          this.drawRoundRect(
            this.ctx,
            barrage.left - 15,
            i * 46 + 8,
            barrage.width + 30,
            40,
            20,
            barrage.color
          );
          this.ctx.fillStyle = "white";
          this.ctx.fillText(barrage.content, barrage.left, i * 46 + 35);
        }
        // 移除
        if (barrage.left < -(this.width + barrage.width)) {
          const item = this.channelQuene[i].splice(j, 1);
          item.left = this.width;
          const isEmpty = this.channelQuene.every((item) => item.length === 0);
          if (isEmpty) {
            this.init(true);
          }
        }

        if (
          barrage.left <= this.width - barrage.width - 50 &&
          barrage.left >= this.width - barrage.width - 50 - this.speed &&
          j === this.channelQuene[i].length - 1 &&
          this.barrageQueue.length
        ) {
          const newBarrage = this.barrageQueue.splice(0, 1);
          this.channelQuene[i].push(newBarrage[0]);
        }
      }
    }
  }

  drawRoundRect(context, x, y, width, height, radius, color) {
    // console.log(x, y, width, height, radius);
    context.beginPath();
    context.fillStyle = color;
    context.arc(x + radius, y + radius, radius, Math.PI, (Math.PI * 3) / 2);
    context.lineTo(width - radius + x, y);
    context.arc(
      width - radius + x,
      radius + y,
      radius,
      (Math.PI * 3) / 2,
      Math.PI * 2
    );
    context.lineTo(width + x, height + y - radius);
    context.arc(
      width - radius + x,
      height - radius + y,
      radius,
      0,
      Math.PI / 2
    );
    context.lineTo(radius + x, height + y);
    context.arc(radius + x, height - radius + y, radius, Math.PI / 2, Math.PI);
    context.fill();
    context.closePath();
  }

  dealStr(str) {
    return str.length > 50 ? `${str.substring(0, 50)}...` : str;
  }

  add(content) {
    const str = this.dealStr(content);
    const barrage = {
      content: str,
      left: this.width,
      width: this.ctx1.measureText(content).width * 2,
      color: this.getColor(),
    };

    this.barrageList.push(content);

    const i = this.getChanne();
    if (i !== -1) {
      this.channelQuene[i].push(barrage);
    } else {
      this.barrageQueue.push(barrage);
    }
  }
}
