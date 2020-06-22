---
id: linked-list-cycle
title: 判断链表中是否有环
---

- 在线：[LeetCode: 141](https://leetcode.com/problems/linked-list-cycle/)

## 题目

Given a linked list, determine if it has a cycle in it.

```js
function ListNode(val) {
  this.val = val;
  this.next = null;
}
```

## 思路

快慢指针

## 代码实现

```js
/*
 * @param {ListNode} head
 * @return {ListNode}
 */
var hasCycle = function (head) {
  let fast = head;
  let slow = head;
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) return true;
  }
  return false;
};
```

## 复杂度

- 时间复杂度：O(n)
- 空间复杂度：O(1)
