---
id: basic-calculator
title: 基本计算器
---

- 在线：[LeetCode: 227](https://leetcode.com/problems/basic-calculator-ii/)

## 题目

Implement a basic calculator to evaluate a simple expression string.

The expression string contains only **non-negative** integers, `+`, `-`, `*`, `/` operators and empty spaces . The integer division should truncate toward zero.

Example 1:

```text
Input: "3+2*2"
Output: 7
```

Example 2:

```text
Input: " 3/2 "
Output: 1
```

Example 3:

```text
Input: " 3+5 / 2 "
Output: 5
```

Note:

- You may assume that the given expression is always valid.
- **Do not** use the `eval` built-in library function.

## 思路

遍历算式字符串，因为运算符有优先级，使用栈来存储运算符和算数。每次将运算符和其对应的算数入栈，如果遇到高优先级的运算符，和栈顶元素运算完后再入栈。

## 代码实现

```js
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
  let num = 0;
  let ope = '+';
  let stack = [];
  for (let c of s + '+') {
    if (c === ' ') {
      continue;
    }
    if (c >= '0' && c <= '9') {
      num = num * 10 + (c - '0');
    } else {
      switch (ope) {
        case '+':
          stack.push(num);
          break;
        case '-':
          stack.push(-num);
          break;
        case '*':
          stack.push(stack.pop() * num);
          break;
        case '/':
          let temp = stack.pop();
          if (temp >= 0) {
            stack.push(Math.floor(temp / num));
          } else {
            stack.push(Math.ceil(temp / num));
          }
          break;
      }
      num = 0;
      ope = c;
    }
  }
  let res = 0;
  while (stack.length > 0) {
    res += stack.pop();
  }
  return res;
};
```

## 复杂度

- 时间复杂度：O(n)
- 空间复杂度：O(n)
