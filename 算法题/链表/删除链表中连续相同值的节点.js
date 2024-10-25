/**
 * 链表节点
 * @param {*} val
 * @param {ListNode} next
 */
function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

const deleteDuplicates = (node) => {
  let oldNode = node;
  let currNode = new ListNode();

  while (oldNode) {
    let next = oldNode.next;

    if (next && next.val === oldNode.val) {
      while (next && next.val === oldNode.val) {
        next = next.next;
      }
      oldNode.next = next;
    } else {
      currNode.next = oldNode;
      currNode = currNode.next;
      oldNode = oldNode.next;
    }
  }

  return currNode.next;
};
