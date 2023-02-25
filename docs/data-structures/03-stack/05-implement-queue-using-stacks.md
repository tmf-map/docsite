---
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

## 思路

使用一个栈作为存储队列元素的主栈，另一个栈作为辅助。队头对应主栈的栈底，队尾对应主栈的栈顶。

入队操作是在队尾，跟入栈在栈顶一致，直接使用入栈操作即可。

执行一次出队操作，应该将队头元素 2 出队，但栈只能从栈顶 pop，为了取到位于栈底的队头元素 2，先将其前面的元素一个一个出栈，再 push 进辅助栈暂存：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/q-by-s-1.png' alt='q-by-s-1' width="400"/>

执行完结果如下：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/q-by-s-2.png' alt='q-by-s-2' width="400"/>

这时再执行一次 pop 操作，就可以取到队头元素，完成出队操作：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/q-by-s-3.png' alt='q-by-s-3' width="400"/>

之后我们需要还原主栈，恢复其原本的元素顺序，以便进行其它操作。将辅助栈内元素再依次 pop 出来，push 进主栈：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/q-by-s-4.png' alt='q-by-s-4' width="400"/>

执行完结果如下：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/q-by-s-5.png' alt='q-by-s-5' width="400"/>

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
