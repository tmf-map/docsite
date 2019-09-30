---
id: merged-sort
title: 归并排序
sidebar_label: 归并排序
---

- 题源/在线：[LeetCode: 912](https://leetcode-cn.com/problems/sort-an-array/)

## 题目

给定一个整数数组 nums，使用归并排序将该数组升序排列。

示例 1：

```text
输入：[5,2,3,1]
输出：[1,2,3,5]
```

示例 2：

```text
输入：[5,1,1,2,0,0]
输出：[0,0,1,1,2,5]
```

提示：

- 1 <= A.length <= 10000
- -50000 <= A[i] <= 50000

## 思路

1. 先分割再合并
2. 使用递归进行分割
3. 使用迭代或者递归进行合并
4. 如何尽量减少辅助内存的使用
5. 排序的顺序从宏观上来说是从左到右逐渐有序的

## 代码实现

### 方法一：使用 `slice` 分割

分割数组时直接将数组分割为两个新数组，合并时直接合并数组。

- 优点：思路简单，写法简单
- 缺点：空间复杂度略高，需要复制多个数组

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
function sortArray (nums) {
    if (nums.length < 2) {
        return nums;
    }
    let mid = nums.length >> 1;
    let left = sortArray(nums.slice(0, mid));
    let right = sortArray(nums.slice(mid));
    return merge(left, right);
}

function merge (left, right) {
    let ans = [];
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
        left[i] > right[j] ? ans.push(right[j++]) : ans.push(left[i++]);
    }
    while (i < left.length) {
        ans.push(left[i++]);
    }
    while (j < right.length) {
        ans.push(right[j++]);
    }
    return ans;
}
```

递归版 `merge`，在数据量比较大的时候会内存溢出，[test case](https://leetcode-cn.com/submissions/detail/31434415/testcase/):

```js
function merge (left, right) {
    if (!left.length) return right;
    if (!right.length) return left;
    let ans = [];
    if (left[0] > right[0]) {
        ans.push(right[0], ...merge(left, right.slice(1)));
    } else {
        ans.push(left[0], ...merge(left.slice(1), right));
    }
    return ans;
}
```

### 方法二：使用 `left`, `right` 索引分割

记录数组的索引，使用 `left`、`right` 两个索引来限定当前分割的数组。

- 优点：空间复杂度低，只需一个 ans 辅助空间，不需要拷贝数组
- 缺点：`sortArray` 函数略显复杂

```js
function sortArray (nums, from = 0, to = nums.length - 1) {
    if (from === to) {
        return [nums[from]];
    }
    let mid = from + (to - from >> 1);
    let left = sortArray(nums, from, mid);
    let right = sortArray(nums, mid + 1, to);
    return merge(left, right);
}
```

## 复杂度

- 时间复杂度: O(nlogn)
- 空间复杂度: O(n)

## 稳定性

稳定
