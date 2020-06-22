---
id: reverse-linked-list
title: 反转链表
---

- 在线：[LeetCode: 206](https://leetcode.com/problems/reverse-linked-list/)

## 题目

Reverse a singly linked list.

```js
function ListNode(val) {
  this.val = val;
  this.next = null;
}
```

## 代码实现

### 方法一：递归

```js
/*
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseLinkedlist = function (head) {
  if (head === null || head.next === null) return head;
  let newHead = reverseLinkedlist(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
};
```

### 方法二：迭代

```js
/*
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseLinkedlist = function (head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    let nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
};
```

## 复杂度

- 时间复杂度：O(n)
- 空间复杂度：O(1)
