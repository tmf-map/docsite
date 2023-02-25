---
id: search-in-rotated-sorted-array
title: 搜索旋转排序数组
---

- 在线：[LeetCode: 33](https://leetcode.com/problems/search-in-rotated-sorted-array/)

## 题目

Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

(i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).

You are given a target value to search. If found in the array return its index, otherwise return -1.

You may assume no duplicate exists in the array.

Your algorithm's runtime complexity must be in the order of O(log n).

Example 1:

```text
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```

Example 2:

```text
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```

## 代码实现

### 二分查找

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  // find the index of the smallest value using binary search.
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    let mid = left + ((right - left) >> 1);
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  // left === right is the index of smallest, also the place rotated
  let rot = left;
  let low = 0;
  let high = nums.length - 1;
  while (low <= high) {
    let mid = low + ((high - low) >> 1);
    let rotatedMid = (mid + rot) % nums.length;
    if (nums[rotatedMid] === target) {
      return rotatedMid;
    } else if (nums[rotatedMid] < target) {
      low = mid + 1;
    } else if (nums[rotatedMid] > target) {
      high = mid - 1;
    }
  }
  return -1;
};
```
