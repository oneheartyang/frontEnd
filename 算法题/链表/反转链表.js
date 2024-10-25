const log = console.log.bind(console);

/**
 * 链表节点
 * @param {*} val
 * @param {ListNode} next
 */
function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

/**
 * 将一个数组转为链表
 * @param {array} a
 * @return {ListNode}
 */
function arrayToList(arr) {
  if (!arr?.length) return null;

  let head = new ListNode();
  let pre = head;
  arr.forEach((val) => {
    pre.next = new ListNode(val);
    pre = pre.next;
  });

  return head.next;
}

/**
 * 打印一个链表
 * @param {ListNode} node
 */
const logList = (node) => {
  let str = "list: ";
  while (node) {
    str += node.val + "->";
    node = node.next;
  }
  str += "end";
  log(str);
};

const reversePrint = (node) => {
  let prev = null;
  let curr = node;

  while (curr !== null) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
};

const res = reversePrint(arrayToList([1, 2, 3, 4, 5]));
logList(res);
