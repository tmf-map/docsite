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

快慢指针。想象一下，有两个速度不一样的跑步者，他们在操场上不断跑圈。那么某一时刻，快跑者一定会追上慢跑者。链表中的快慢指针技巧正是这种思路：

- 如果链表中没有环，快指针将停留在末尾
- 如果链表中有环，快慢指针最终会相遇

一般情况下，慢指针一次移动一步，快指针一次移动两步即可。其它的选择并不会更加高效。

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
