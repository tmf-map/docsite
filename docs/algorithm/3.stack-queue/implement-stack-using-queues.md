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

## 思路

使用一个队列作为存储栈元素的主队列，另一个队列作为辅助队列。栈底对应主队列的队头，栈顶对应主队列的队尾。

入栈操作是在栈顶，跟入队操作在队尾一致，直接使用入队操作即可。

执行一次出栈操作，应该将栈顶（队尾）元素 6 出栈，但队列只能从头出队，为了取到队尾元素 6，先将前面的元素都入队到辅助队列中暂存：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/s-by-q-1.png' alt='s-by-q-1' width="500"/>

执行完结果如下：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/s-by-q-2.png' alt='s-by-q-2' width="500"/>

再执行一次出队操作即可取得栈顶元素，完成出栈操作：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/s-by-q-3.png' alt='s-by-q-3' width="500"/>

之后，我们需要恢复一个存储元素的主队列和一个辅助队列的数据结构，并保证主队列中的元素顺序，以便执行其它操作：只需调换两个队列即可

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/s-by-q-4.png' alt='s-by-q-4' width="500"/>

:::tip

不同于栈，队列的出队入队操作能保持队列中元素的相对顺序，因此恢复主队列和辅助队列只需调换两个队列，不需要再移动元素

:::

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
