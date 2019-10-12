---
id: inverse-pairs
title: 数组中的逆序对
sidebar_label: 数组中的逆序对
---

- 题源：《剑指Offer: 面试题 51》P249
- 在线：[牛客网](https://www.nowcoder.com/practice/96bd6684e04a44eb80e6a68efc0ec6c5)

## 题目

在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。

示例:

```text
输入: [7,5,6,4]
输出: 5
```

该数组总共 5 个逆序对，分别是 (7,6), (7,5), (7,4), (6,4) 和 (5,4)。

## 思路

1. 最容易想到的是蛮力法但时间复杂度为 O(n2)
2. 以空间换时间：对该数组进行**归并排序**，先分后合，合的过程中统计逆序对，时间复杂度为 O(nlogn)，但同时需要一个 O(n) 的辅助空间

<div align="center">
    <img width="630" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/zX1Diu.png" />
    <p>图1：先分后并进行归并排序，并统计逆序对</p>
</div>

如图2(a)中，7 > 6, 6 及其前面有 2 个数，所以算 2 个逆序对：

<div align="center">
    <img width="630" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/9GHK67.png" />
    <p>图2：子数组由后往前进行比较合并，并在过程中统计逆序对</p>
</div>

## 代码实现

```js
let count = 0;

function inversePairs (nums) {
    sortArray(nums);
    return count;
}

function sortArray (nums, from = 0, to = nums.length - 1) {
    // 分割到一个元素的时候开始合并
    if (from === to) {
        return [nums[from]];
    }
    let mid = from + (to - from >> 1);
    let left = sortArray(nums, from, mid);
    let right = sortArray(nums, mid + 1, to);
    return merge(left, right);
}

function merge (left, right) {
    let ans = [];
    // 注意是从后开始
    let i = left.length - 1;
    let j = right.length - 1;
    while (i >= 0 && j >= 0) {
        if (left[i] > right[j]) {
            // 从后往前插入比较大的值
            ans.unshift(left[i--]);
            // 表明 left[i] 比 right[j] 以及之前都大
            count += j + 1;
        } else {
            ans.unshift(right[j--]);
        }
    }
    while (i >= 0) {
        ans.unshift(left[i--]);
    }
    while (j >= 0) {
        ans.unshift(right[j--]);
    }
    return ans;
}
```
