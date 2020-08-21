---
id: sqrtx
title: x的平方根
---

- 在线：[LeetCode: 69](https://leetcode.com/problems/sqrtx/)

## 题目

Implement `int sqrt(int x)`

Compute and return the square root of x, where x is guaranteed to be a non-negative integer.

Since the return type is an integer, the decimal digits are truncated and only the integer part of the result is returned.

Example 1:

```text
Input: 4
Output: 2
```

Example 2:

```text
Input: 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since
             the decimal part is truncated, 2 is returned.
```

## 代码实现

### 二分查找

```js
/**
 * @param {number} n
 * @return {number}
 */
var mySqrt = function (n) {
  if (n <= 1) return n;

  let left = 1;
  let right = n >> 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1);
    if (mid * mid <= n) {
      if ((mid + 1) * (mid + 1) > n) {
        return mid;
      } else {
        left = mid + 1;
      }
    } else if (mid * mid > n) {
      right = mid - 1;
    }
  }
};
```
