// 【代码题】实现一个拼手气抢红包算法
/**
 * 提供了一个RedPackage的类，初始化时传入红包金额和个数，
 * 需要实现一个openRedPackage方法，每调一次都进行一次“抢红包”，
 * 并以console.log的形式输出抢到的红包金额。
 */

class RedPackage {
  constructor(money, num) {
    this.money = money;
    this.num = num;
    this.lastMoney = money;
  }

  openRedPackage() {
    if (this.num === 0) {
      console.log("抢完了");
      return;
    }

    if (this.num === 1) {
      console.log(this.lastMoney);
      return;
    }

    let minMoney = 0.01;
    const random = Math.random();
    const getMoney = ((this.lastMoney - minMoney) * random + minMoney).toFixed(
      2
    );
    this.lastMoney = (this.lastMoney - getMoney).toFixed(2);
    this.num--;

    console.log(getMoney);
  }
}

const redPackage = new RedPackage(5, 3);
let red = redPackage.openRedPackage();
red += redPackage.openRedPackage();
red += redPackage.openRedPackage();
console.log(red);
