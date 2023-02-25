---
title: 长度最小的子数组
---

- 题源/在线：[LeetCode: 209](https://leetcode-cn.com/problems/minimum-size-subarray-sum/)
- 难度：中等

## 题目

给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的**连续子数组**，并返回其长度。如果不存在符合条件的子数组，返回 0。

## 示例

```text
输入：s = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
```

## 思路

**滑动窗口**

- 定义两个指针 start 和 end 分别表示子数组的开始位置和结束位置，变量 `sum` 存储子数组中从 `nums[start]` 到 `nums[end]` 的元素和。

- 初始状态下，start 和 end 都指向下标 0，sum 的值为 0。

- 每一轮迭代，将 `nums[end]` 加到 `sum`，如果 `sum >= s`，则更新子数组的最小长度（此时子数组的长度是 `end−start+1`），然后将 `nums[start]` 从 `sum` 中减去并将 `start` 右移，直到 `sum < s`，在此过程中同样更新子数组的最小长度。在每一轮迭代的最后，将 `end` 右移。

## 代码实现

```js
/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
let minSubArrayLen = function (s, nums) {
  const n = nums.length;
  if (n === 0) {
    return 0;
  }
  let ans = n + 1;
  let start = 0;
  let end = 0;
  let sum = 0;
  while (end < n) {
    sum += nums[end];
    while (sum >= s) {
      ans = Math.min(ans, end - start + 1);
      sum -= nums[start];
      start++;
    }
    end++;
  }
  return ans === n + 1 ? 0 : ans;
};
```

## 复杂度

- 时间复杂度：O(n)，n 为数组的长度
- 空间复杂度：O(1)
