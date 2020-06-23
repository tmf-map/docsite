---
id: middle-of-the-linked-list
title: 链表的中间结点
---

- 在线：[LeetCode: 876](https://leetcode.com/problems/middle-of-the-linked-list/)

## 题目

Given a non-empty, singly linked list with head node head, return a middle node of linked list.If there are two middle nodes, return the second middle node.

```js
function ListNode(val) {
  this.val = val;
  this.next = null;
}
```

## 思路

双指针。让快指针两步两步走，同时慢指针一步一步走，当快指针走到末尾时，慢指针便指向了中间结点。

## 代码实现

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
  let fast = head;
  let slow = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};
```

## 复杂度

- 时间复杂度：O(n)
- 空间复杂度：O(1)
