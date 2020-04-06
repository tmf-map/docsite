---
title: 外观数列
sidebar_label: 外观数列
---

- 题源/在线：[LeetCode: 38](https://leetcode-cn.com/problems/count-and-say/)
- 难度：简单

## 题目

「外观数列」是一个整数序列，从数字 1 开始，序列中的每一项都是对前一项的描述。前五项如下：

```text
1.     1
2.     11
3.     21
4.     1211
5.     111221
```

1 被读作 `one 1` (`一个一`), 即  `11`。

11 被读作  `two 1s` (`两个一`）, 即  `21`。

21 被读作  `one 2`, `one 1`（`一个二`, `一个一`),即  `1211`。

给定一个正整数 n（1 ≤ n ≤ 30），输出外观数列的第 n 项。

注意：整数序列中的每一项将表示为一个字符串。

示例:

```text
输入: 1
输出: "1"
解释：这是一个基本样例。
```

```text
输入: 4
输出: "1211"
解释：当 n = 3 时，序列是 "21"，其中我们有 "2" 和 "1" 两组，"2" 可以读作 "12"，也就是出现频次 = 1 而 值 = 2；类似 "1" 可以读作 "11"。所以答案是 "12" 和 "11" 组合在一起，也就是 "1211"
```

## 思路

1. 思路一：使用正则表达式的反向引用，相关知识可参考 [此处](/docs/javascript/7.reference-type/regex#%E5%8F%8D%E5%90%91%E5%BC%95%E7%94%A8)

2. 思路二：想要获得数字 n 的外观数列，先获取 n-1 对应的外观数列 str，然后遍历 str，通过 startIndex 和 endIndex 获取连续相同数字的长度

3. 思路三：递归 + 左右双指针，相同则移动右指针，不同则停止，左右指针差值则是相同元素个数。

## 代码实现

#### 思路一：反向引用

```js
/**
 * @param {number} n
 * @return {string}
 */

let countAndSay = function (n) {
  let result = '1';
  for (let i = 1; i < n; i++) {
    // (\d)\1*  匹配连续的、相同的数字
    result = result.replace(/(\d)\1*/g, (item) => `${item.length}${item[0]}`);
  }
  return result;
};
```

#### 思路二：

```js
/**
 * @param {number} n
 * @return {string}
 */

let countAndSay = function (n) {
  let result = '1';
  let str;
  for (let i = 1; i < n; i++) {
    str = result;
    result = '';
    let startIndex = 0;
    while (startIndex < str.length) {
      let count = 0;
      let endIndex = startIndex;
      while (endIndex < str.length && str[endIndex] === str[startIndex]) {
        endIndex++;
        count++;
      }
      result += count + str[startIndex];
      startIndex = endIndex;
    }
  }

  return result;
};
```

#### 思路三：

```java
class Solution {
  public String countAndSay(int n) {
    if (n == 1) {
      return "1";
    }
    String pre = countAndSay(n - 1);
    StringBuilder res = new StringBuilder();
    int left = 0;
    while (left < pre.length()) {
      int right = left;
      while(right < pre.length() && pre.charAt(left) == pre.charAt(right)){
        right++;
      }
      res.append(right - left).append(pre.charAt(left));
      left = right;
    }
    return res.toString();
  }
}
```

## 复杂度

- 时间复杂度：O(n<sup>2</sup>)
- 空间复杂度：O(1)
