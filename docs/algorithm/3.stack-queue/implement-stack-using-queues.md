---
id: implement-stack-using-queues
title: 队列实现栈
---

- 在线：[LeetCode: 225](https://leetcode.com/problems/implement-stack-using-queues/)

## 题目

Implement the following operations of a stack using queues.

- `push(x)` -- Push element x onto stack.
- `pop()` -- Removes the element on top of the stack.
- `top()` -- Get the top element.
- `empty()` -- Return whether the stack is empty.

### Example:

```text
MyStack stack = new MyStack();
stack.push(1);
stack.push(2);
stack.top();   // returns 2
stack.pop();   // returns 2
stack.empty(); // returns false
```

### Notes:

- You must use only standard operations of a queue -- which means only push to back, peek/pop from front, size, and is empty operations are valid.
- Depending on your language, queue may not be supported natively. You may simulate a queue by using a list or deque (double-ended queue), as long as you use only standard operations of a queue.
- You may assume that all operations are valid (for example, no pop or top operations will be called on an empty stack).

## 代码实现

```js
/**
 * Initialize your data structure here.
 */
var MyStack = function () {
  // as a queue, only can use push and shift
  this.q1 = [];
  this.q2 = [];
  this.size = 0;
};

/**
 * Push element x onto stack.
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {
  this.q1.push(x);
  this.size++;
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function () {
  for (let i = this.size; i > 1; i--) {
    this.q2.push(this.q1.shift());
  }
  let stackTop = this.q1.shift();
  this.size--;
  this.q1 = this.q2;
  this.q2 = [];
  return stackTop;
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function () {
  return this.q1[this.size - 1];
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
  return this.size === 0;
};

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
```
