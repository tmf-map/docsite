---
title: 反转整数
---

- 题源/在线：[LeetCode: 7](https://leetcode-cn.com/problems/reverse-integer/)
- 难度：简单

## 题目

给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

注意: 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为  [−2<sup>31</sup>,  2<sup>31</sup> − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。

示例:

```text
输入: 123
输出: 321
```

```text
输入: -123
输出: -321
```

```text
输入: 120
输出: 21
```

## 思路

1. 思路一：转化为字符串，然后再 reverse。听起来很方便，但是时间开销很大，且存在两个问题：

   1. 负号需要单独处理
   2. 例：120 => 21，需要先去掉 120 末尾的 0，再 reverse，进一步增大时间开销

2. 思路二：使用数学方法，对数字 num 不断求余数 num%10，每次得到的余数作为 result 的个位数，相对的时间开销更小，还有以下优点：

   1. 不需要考虑正负的问题，因为每次 num%10 得到的数字都与 num 正负相同
   2. 例：120 => 21，不需要单独处理 120 末尾的 0。因为 result 默认为 0，经过 result = result \* 10 + 0 计算，result 还是 0

## 代码实现

```js
/**
 * @param {number} num
 * @return {number}
 */

// 采用思路二
let reverse = function (num) {
  // [-9, 9]区间的数字不必reverse，直接返回即可
  if (num < 10 && num > -10) {
    return num;
  }

  let isOutOfRange = function (num) {
    // 判断是否超出范围
    return num >= 2147483647 || num <= -2147483648;
  };

  let res = 0;
  while (num !== 0) {
    // 每次对num/10取余数作为res的个位数
    res = res * 10 + (num % 10);
    if (isOutOfRange(res)) {
      return 0;
    }
    num = (num - (num % 10)) / 10;
  }

  return res;
};
```

## 复杂度

- 时间复杂度：O(log(n))
- 空间复杂度：O(1)
