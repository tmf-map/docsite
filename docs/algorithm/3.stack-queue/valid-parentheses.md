---
id: basic-calculator
title: 基本计算器
---

- 在线：[LeetCode: 20](https://leetcode.com/problems/valid-parentheses/)

## 题目

Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.

Note that an empty string is also considered valid.

Example 1:

```text
Input: "()"
Output: true
```

Example 2:

```text
Input: "()[]{}"
Output: true
```

Example 3:

```text
Input: "(]"
Output: false
```

Example 4:

```text
Input: "([)]"
Output: false
```

Example 5:

```text
Input: "{[]}"
Output: true
```

## 思路

## 代码实现

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  if (!s || s.length <= 0) return true;
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '[') {
      stack.push(']');
    } else if (s[i] === '{') {
      stack.push('}');
    } else if (s[i] === '(') {
      stack.push(')');
    } else if (stack.length === 0 || s[i] !== stack.pop()) {
      return false;
    }
  }
  return stack.length === 0;
};
```

## 复杂度

- 时间复杂度：O(n)
- 空间复杂度：O(1)
