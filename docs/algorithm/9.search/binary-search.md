---
id: binary-search
title: 二分查找
---

import Img from '@site/src/components/Img'; import GifPlayer from '@site/src/components/GifPlayer';

## 二分查找的基本思想

二分查找的思想非常朴素好理解。在一个排好序的数组中，从中间元素开始查找，如果中间元素正好是要查找元素，则结束查找；如果要查找元素大于中间元素，则在大于中间元素的一半数组中继续二分查找；反之，在小于中间元素的一半中继续查找。

这个算法的思想虽然看似简单，但是它的时间复杂度是 O(logn)，非常高效。随机写一个 0-999 的数字，需要几次可以猜中呢？例如写下 23：

| 次数 | 猜测范围 | 中间数 | 对比大小 |
| :--: | :------: | :----: | :------: |
|  1   | [0,999]  |  499   |  499>23  |
|  2   | [0,498]  |  249   |  249>23  |
|  3   | [0,248]  |  124   |  124>23  |
|  4   | [0,123]  |   61   |  61>23   |
|  5   |  [0,60]  |   30   |  30>23   |
|  6   |  [0,29]  |   14   |  14<23   |
|  7   | [15,29]  |   22   |  22<23   |
|  8   | [23,29]  |   26   |  26>23   |
|  9   | [23,25]  |   24   |  24>23   |
|  10  | [23,23]  |   23   |  23==23  |

1000 个数字只需 10 次以内就能查找完。

## 简单二分查找的实现

简单二分查找问题，在有序且不存在重复元素的数组中，查找某个目标值。

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
    // 为了防止left+right溢出
    // 最好写成 mid = left + (right - left) / 2
    // 注意mid为整数，向下取整得到
    let mid = Math.floor(left + (right - left) / 2);
    // 亦可使用按位右移一位。一般程序语言位运算效率很高
    // 注意位移比加减法的优先级低
    // let mid = left+((right-left)>>1);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    }
  }
  return -1;
};
```

时间复杂度：O(logn) 空间复杂度：O(1)

递归写法（不推荐）：

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var binarySearch_Recursion = function (nums, target) {
  if (!nums || nums.length === 0) return -1;

  const bs = (nums, left, right, target) => {
    let mid = Math.floor((left + right) / 2);
    if (left > right) return -1;
    if (nums[mid] === target) return mid;
    if (nums[mid] > target) return bs(nums, left, mid - 1, target);
    if (nums[mid] < target) return bs(nums, mid + 1, right, target);
  };

  return bs(nums, 0, nums.length - 1, target);
};
```

时间复杂度：O(logn) 空间复杂度：O(n)

<GifPlayer gif="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/binary-search-simple.2020-07-31%2014_43_58.gif" still="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/binary-search-simple.2020-07-31%2014_43_58.png"/>

## 实现细节 注意事项

:::tip

尽管二分查找的基本思想相对简单，但细节可以令人难以招架... --高德纳

:::

在二分查找算法中，注意一定要明确搜索区间概念。在简单二分查找算法中，搜索区间是闭区间，包含两端。由此可以推断出以下几个取值：

1. 循环退出条件：

   因为搜索区间是闭区间，所以当`left > right`时，搜索区间才为空。

2. `mid`的取值

   `mid`可以通过向下取整或者向上取整得到，简单二分查找算法中没有重复元素，所以两种取值效果一样。一般习惯向下取整，代码简洁，并且可以使用更高效的按位右移运算替代。

3. `right`和`left`的更新

   因为搜索区间是闭区间，也就是说，每次搜索的范围已经包含了端点，所以`right`和`left`的新取值，需要`mid-1`或者`mid+1`

## 参考资料

1. [数据结构与算法之美, by 王争](https://time.geekbang.org/column/intro/126)
2. [二分查找, leetcode 探索](https://leetcode-cn.com/explore/learn/card/binary-search/)
