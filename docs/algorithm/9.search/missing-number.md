---
id: missing-number
title: 有序数组中缺失的数字
sidebar_label: 有序数组中缺失的数字
---

- 题源：《剑指Offer: 面试题 53-2》P266
- 在线：[LeetCode: 268](https://leetcode-cn.com/problems/missing-number/)

## 题目

给定一个包含 `0, 1, 2, ..., n` 中 n 个数的序列，找出 `0 .. n` 中没有出现在序列中的那个数。

示例 1:

```text
输入: [0,1,3]
输出: 2
```

示例 2:

```text
输入: [0,1,2,3,4,5,6,7,9]
输出: 8
```

**说明**: 你的算法应具有**线性时间复杂度**。你能否仅使用额外**常数空间**来实现?

## 思路

1. 法一：先用求和公式算出 `0 .. n` 的和为 s1，再求出该数列的和为 s2，`s1 - s2` 即为缺失数字，时间复杂度 O(n)
2. 法二：用异或替代累加优化法一，巧妙算出缺失数字，时间复杂度也为 O(n)
3. 法三：因为是有序的，可以利用二分查找，将时间复杂度降至 O(logn)

<div align="center">
    <img width="480" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/gMPrDu.png" />
    <p>图：二分查找缺失数字步骤</p>
</div>

## 代码实现

### 二分查找

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
function missingNumber (nums) {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        let mid = left + (right - left >> 1);
        if (nums[mid] === mid) {
            left = mid + 1;
            continue;
        }
        if (nums[mid - 1] === mid - 1) {
            return mid;
        }
        return right = mid - 1;
    }
    return -1;
}
```

### 异或运算

如果题目中的数组不是有序的，那么使用异或是相对比较好的方法。

```js
function missingNumber (nums) {
    // 注意，默认值设为最后一个元素
    let ans = nums.length；
    for (let i =0; i < nums.length; i++) {
        ans ^= i ^ nums[i]；
    }
    return ans；
}
```
