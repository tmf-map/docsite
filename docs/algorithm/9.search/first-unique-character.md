---
id: first-unique-character
title: 字符串中的第一个唯一字符
sidebar_label: 字符串中的第一个唯一字符
---

- 题源：《剑指 Offer: 面试题 50》P243
- 在线：[LeetCode: 387](https://leetcode-cn.com/problems/first-unique-character-in-a-string/)

## 题目

给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。假定该字符串只包含小写字母。

示例:

```text
输入: "leetcode"
输出: 0
```

```text
输入: "loveleetcode"
输出: 2
```

## 思路

1. 使用哈希表，第一次遍历该字符串，以该字符为 key，value 为下标索引
2. 如果出现次数超过一次则 value 设为 -1
3. 再遍历哈希表，或者遍历字符串，找出第一个不等于 -1 的 value，即下标索引

## 代码实现

```js
function firstUniqChar(s) {
  let hash = new Map();
  len = s.length;
  for (let i = 0; i < len; i++) {
    if (hash.has(s[i])) {
      hash.set(s[i], -1);
    } else {
      hash.set(s[i], i);
    }
  }
  for (let [key, value] of hash) {
    if (value !== -1) {
      return value;
    }
  }
  return -1;
}
```
