---
title: 最小栈
---

- 题源：《剑指 Offer: 面试题 30》P165
- 在线：[LeetCode: 155](https://leetcode-cn.com/problems/min-stack/)

## 题目

定义栈的数据结构，请在该类型中实现一个能够得到栈中所含最小元素的 min 函数。在该栈中，调用 `getMin`, `push`, `pop` 的时间复杂度应为 O(1)。

## 思路

- 如果用一个变量去保存最小值，那么 pop 的值是最小值后，怎么取到下一个最小值呢，所以用辅助栈
- 辅助栈的栈顶永远存放的是最小值
- 辅助栈的长度和数据栈的长度保持一致，即使最小值没有变化，也要再 push 到辅助栈
- 辅助栈和数据栈一同 pop

<div align="center">
    <img width="700" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/2PEAOk.png" />
    <p>图：数据栈、辅助栈和最小值的状态</p>
</div>

## 代码实现

```js
/**
 * initialize your data structure here.
 */
var MinStack = function () {
  this.stack = [];
  this.helper = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.stack.push(x);
  if (!this.helper.length) {
    this.helper.push(x);
  } else {
    let helperTop = this.helper[this.helper.length - 1];
    helperTop < x ? this.helper.push(helperTop) : this.helper.push(x);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.stack.pop();
  this.helper.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.helper[this.helper.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
```

## 复杂度

- 时间复杂度：O(1)
- 空间复杂度：O(n)

典型的用空间换时间。
