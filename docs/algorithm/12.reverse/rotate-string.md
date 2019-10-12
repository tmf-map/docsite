---
id: rotate-string
title: 翻转字符串
sidebar_label: 翻转字符串
---

- 题源：《剑指Offer: 面试题 58》P284
- 在线：[LeetCode: 151](https://leetcode-cn.com/problems/reverse-words-in-a-string/)

## 题目

输入一个英文句子，翻转句子中单词的顺序，但单词内字符的顺序不变。为简单起见，标点符号和普通字母一样处理。

示例：

```text
输入："I am a student. "
输出："student. a am I"
```

## 代码实现

```js
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    let arr = [];
    let ans = '';
    for (let i = 0; i < s.length; i++) {
        arr.push(s[i]);
    }
    reverse(arr);
    let left = 0;
    let right = 0;
    while (right <= arr.length) {
        if (arr[left] === ' ') {
            left++;
        } else if (arr[right] === ' ' || right === arr.length) {
            reverse(arr, left, right - 1);
            left = right;
        }
        right++;
    }
    for (let i = 0; i < arr.length; i++) {
        ans += arr[i];
    }
    return ans;
};

function reverse (arr, left = 0, right = arr.length - 1) {
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
}
```
