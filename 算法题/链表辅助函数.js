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
  arr.forEach((val) => {
    head.next = new ListNode(val);
    head = head.next;
  });

  return head.next;
}

/**
 * 将一个链表转为数组
 * @param {ListNode} node
 * @return {array}
 */
function listToArray(node) {
  if (!node) return [];

  let arr = [];
  while (node !== null) {
    arr.push(node.val);
    node = node.next;
  }

  return arr;
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
