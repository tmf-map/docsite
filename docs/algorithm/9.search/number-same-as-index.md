---
id: number-same-as-index
title: 有序数组中值和下标相等的元素
sidebar_label: 有序数组中值和下标相等的元素
---

- 题源：《剑指 Offer: 面试题 53-3》P267

## 题目

假设一个单调递增的数组里的每个元素都是整数并且是唯一的。请找出数组中任意一个数值等于其下标的元素，如果没有找到则返回 -1。

示例：

```text
输入: [-3,-1,1,3,5]
输出: 3
```

## 思路

因为是有序数组，直接二分查找，如果下标和元素相等则返回该元素，时间复杂度 O(logn)。

## 代码实现

### 迭代版

```js
function getNumberSameAsIndex(nums) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1);
    if (nums[mid] === mid) {
      return mid;
    }
    if (nums[mid] > k) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}
```

### 递归版

这个版本也是尾递归，一些浏览器也遵循 ES 标准对尾递归进行了优化，让其不会栈溢出。

```js
function getNumberSameAsIndex(nums, left = 0, right = nums.length - 1) {
  if (left > right) return -1;
  let mid = left + ((right - left) >> 1);
  if (nums[mid] === mid) {
    return mid;
  }
  if (nums[mid] > k) {
    return getNumberSameAsIndex(nums, left, mid - 1);
  } else {
    return getNumberSameAsIndex(nums, mid + 1, right);
  }
}
```
