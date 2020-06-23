---
id: remove-nth-node-from-end-of-list
title: 删除链表倒数第n个结点
---

- 在线：[LeetCode: 19](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)

## 题目

Given a linked list, remove the n-th node from the end of list and return its head.

```js
function ListNode(val) {
  this.val = val;
  this.next = null;
}
```

## 思路

双指针

## 代码实现

```js
/*
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let fakeHead = new ListNode(null);
  fakeHead.next = head;
  let end = head;
  let cur = head;
  let pre = fakeHead;
  for (let i = n; i > 0; i--) {
    if (end !== null) {
      end = end.next;
    } else return null;
  }

  while (end !== null) {
    end = end.next;
    cur = cur.next;
    pre = pre.next;
  }
  pre.next = cur.next;
  return fakeHead.next;
};
```

## 复杂度

- 时间复杂度：O(n)
- 空间复杂度：O(1)
