---
id: implement-queue-using-stacks
title: 栈实现队列
---

- 在线：[LeetCode: 232](https://leetcode.com/problems/implement-queue-using-stacks/)

## 题目

Implement the following operations of a queue using stacks.

- `push(x)` -- Push element x to the back of queue.
- `pop()` -- Removes the element from in front of queue.
- `peek()` -- Get the front element.
- `empty()` -- Return whether the queue is empty.

### Example:

```text
MyQueue queue = new MyQueue();
queue.push(1);
queue.push(2);
queue.peek();  // returns 1
queue.pop();   // returns 1
queue.empty(); // returns false
```

### Notes:

- You must use only standard operations of a stack -- which means only push to top, peek/pop from top, size, and is empty operations are valid.
- Depending on your language, stack may not be supported natively. You may simulate a stack by using a list or deque (double-ended queue), as long as you use only standard operations of a stack.
- You may assume that all operations are valid (for example, no pop or peek operations will be called on an empty queue).

## 代码实现

```js
/**
 * Initialize your data structure here.
 */
var MyQueue = function () {
  // as a stack, only can use push and pop
  this.s1 = [];
  this.s2 = [];
  this.size = 0;
};

/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  this.s1.push(x);
  this.size++;
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  for (let i = this.size; i > 1; i--) {
    this.s2.push(this.s1.pop());
  }
  let queueHead = this.s1.pop();
  this.size--;
  for (let i = this.size; i > 0; i--) {
    this.s1.push(this.s2.pop());
  }
  return queueHead;
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  return this.s1[0];
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return this.size === 0;
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
```
