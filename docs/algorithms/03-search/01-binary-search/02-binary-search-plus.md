---
id: binary-search-plus
title: 二分查找几种变体
---

对于存在重复数字的有序序列，二分查找有几种变体。

## 查找第一个值等于目标值的元素

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var binarySearch = function (nums, target) {
  if (!nums || nums.length === 0) return -1;
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1);
    if (nums[mid] === target) {
      if (mid === 0 || nums[mid - 1] !== target) {
        return mid;
      } else {
        right = mid - 1;
      }
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    }
  }
  return -1;
};
```

`nums[mid]`的取值和目标值的大小分为三种情况，大于、小于和等于。大于和小于的情况，同简单二分查找一样，不再赘述。遇到等于的情况时，需要检查当前`mid`是不是第一个等于目标值的下标。

- 如果`mid===0`，肯定是第一个；如果前一个值不等于目标值，即`nums[mid-1] !== target`，那么`mid`也是第一个等于目标值的下标。
- 除去上述两种情况，第一个等于目标值的元素一定在`mid`左边，故而调整`right = mid-1`。

<GifPlayer gif="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/binary-search-left-range.2020-07-31%2014_40_22.gif" still="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/binary-search-left-range.2020-07-31%2014_40_22.png"/>

## 查找最后一个值等于目标值的元素

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var binarySearch = function (nums, target) {
  if (!nums || nums.length === 0) return -1;
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1);
    if (nums[mid] === target) {
      if (mid === nums.length - 1 || nums[mid + 1] !== target) {
        return mid;
      } else {
        left = mid + 1;
      }
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    }
  }
  return -1;
};
```

<GifPlayer gif="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/binary-search-right-range.2020-07-31%2014_41_23.gif" still="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/binary-search-left-range.2020-07-31%2014_40_22.png"/>

## 查找第一个值大于等于目标值的元素

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var binarySearch = function (nums, target) {
  if (!nums || nums.length === 0) return -1;
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1);
    if (nums[mid] >= target) {
      if (mid === 0 || nums[mid - 1] < target) {
        return mid;
      } else {
        right = mid - 1;
      }
    } else if (nums[mid] < target) {
      left = mid + 1;
    }
  }
  return -1;
};
```

- 如果`nums[mid]`小于目标值，那么查找值一定在`[mid+1, right]`之间。
- 如果`nums[mid]`大于等于目标值，需要判断其是不是第一个大于等于目标值的元素

  - 如果`mid===0`或者前一个元素小于目标值，则当前`mid`是第一个大于等于目标值的元素
  - 反之，第一个大于等于目标值的元素一定在当前值左边，即`[left, mid-1]`

<GifPlayer gif="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/binary-search-first-big.2020-07-31%2014_36_43.gif" still="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/binary-search-left-range.2020-07-31%2014_40_22.png"/>

## 查找最后一个值小于等于目标值的元素

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var binarySearch = function (nums, target) {
  if (!nums || nums.length === 0) return -1;
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1);
    if (nums[mid] <= target) {
      if (mid === nums.length - 1 || nums[mid + 1] > target) {
        return mid;
      } else {
        left = mid + 1;
      }
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }
  return -1;
};
```

<GifPlayer gif="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/binary-search-last-small.2020-07-31%2014_38_04.gif" still="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/binary-search-left-range.2020-07-31%2014_40_22.png"/>

## 参考资料

1. [数据结构与算法之美, by 王争](https://time.geekbang.org/column/intro/126)
2. [二分查找, leetcode 探索](https://leetcode-cn.com/explore/learn/card/binary-search/)
