---
id: search-insert-position
title: 搜索插入位置
---

- 题源：暂无
- 在线：[LeetCode: 35](https://leetcode-cn.com/problems/search-insert-position/)
- 难度：简单

## 题目

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

注意：假设数组中无重复元素。

示例 1:

```text
输入: [1,3,5,6], 5
输出: 2
```

示例  2:

```text
输入: [1,3,5,6], 2
输出: 1
```

示例  3:

```text
输入: [1,3,5,6], 7
输出: 4
```

示例  4:

```text
输入: [1,3,5,6], 0
输出: 0
```

## 思路

**[二分查找](/docs/algorithm/2.array/array-skills)**：

- ans 初始值设置为数组长度可以省略边界条件的判断，因为存在一种情况，target 大于数组中的所有数，此时需要插入到索引为数组长度的位置
- target 的插入位置 position 要满足：`nums[position-1] < target <= nums[position+1]`

## 代码实现

```js
let searchInsert = function (nums, target) {
  const n = nums.length;
  let left = 0;
  let right = n - 1;
  let ans = n;
  while (left <= right) {
    let mid = ((right - left) >> 1) + left;
    if (target <= nums[mid]) {
      ans = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return ans;
};
```

## 复杂度

- 时间复杂度：O(logn)，其中 n 为数组的长度
- 空间复杂度：O(1)。只需要常数空间存放若干变量
