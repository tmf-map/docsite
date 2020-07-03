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

双指针。让快指针先走 n 步，而后快慢指针一起移动，当快指针走到末尾时，慢指针便指向了倒数第 n 个结点。

由于删除结点需要知道需删除结点的前驱结点，如果不使用头节点，需要处理边界条件：当删除结点为第一个结点时，它没有前驱结点。添加头节点后，这种情况不需要特殊处理。

## 代码实现

```js
/*
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  // 头节点
  let fakeHead = new ListNode(null);
  fakeHead.next = head;

  let end = head; // 快指针，用于定位尾结点的指针
  let cur = head; // 慢指针，用于定位删除结点的指针
  let pre = fakeHead; // 用于定位需删除结点的前驱结点
  for (let i = n; i > 0; i--) {
    // 快指针先走n步
    if (end !== null) {
      end = end.next;
    } else return null;
  }

  while (end !== null) {
    // 快慢指针一起走，直到快指针到达尾结点
    end = end.next;
    cur = cur.next;
    pre = pre.next;
  }
  pre.next = cur.next; // 删除cur
  return fakeHead.next;
};
```

## 复杂度

- 时间复杂度：O(n)
- 空间复杂度：O(1)
