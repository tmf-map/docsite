---
id: number-in-sorted-array
title: 有序数组中某数字出现的次数
---

- 题源：《剑指 Offer: 面试题 53-1》P263
- 在线：[LeetCode: 34](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

## 题目

输入一个单调递增的数组和一个数字，统计这个数字在数组中出现的次数。例如：

```text
输入: [1,2,3,3,3,3,4,5], 3
输出: 4
```

## 思路

1. 最容易想到用一个变量去循环统计该值出现的次数，时间复杂度为 O(n)
2. 如果用首尾双指针的话，时间复杂度为 O(n)
3. 用二分查找可以将时间复杂度降低至 O(logn)
4. 二分查找可以分两次进行找第一个位置和最后一个位置
5. 注意二分查找没有查找到返回什么值

## 特殊测试

- 数组中没有要查找的值
- 查找的是最大值或者最小值
- 数组只有一个元素
- 空数组

## 代码实现

```js
function getNumberOfK(data, k) {
  let firstK = getFirstK(data, k);
  let lastK = getLastK(data, k);
  if (firstK === -1 || lastK === -1) {
    return 0;
  }
  return lastK - firstK + 1;
}

function getFirstK(data, k) {
  let left = 0;
  let right = data.length - 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1);
    if (data[mid] === k) {
      if (data[mid - 1] !== k) {
        return mid;
      } else {
        right = mid - 1;
        continue;
      }
    }
    if (data[mid] > k) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}

function getLastK(data, k) {
  let left = 0;
  let right = data.length - 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1);
    if (data[mid] === k) {
      if (data[mid + 1] !== k) {
        return mid;
      } else {
        left = mid + 1;
        continue;
      }
    }
    if (data[mid] > k) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}
```

## 拓展

可以思考一下二分查找的递归版。
