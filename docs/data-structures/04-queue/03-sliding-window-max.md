---
title: 滑动窗口最大值
---

- 在线：[LeetCode: 239](https://leetcode.com/problems/sliding-window-maximum/)

## 题目

Given an array nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.

### Follow up

Could you solve it in linear time?

### Example

```text
Input: nums = [1,3,-1,-3,5,3,6,7], and k = 3
Output: [3,3,5,5,6,7]
Explanation:

Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

### Constraints

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `1 <= k <= nums.length`

## 思路

使用双端队列存储可能是当前或者后续滑动窗口最大值的下标。应该满足以下两点：

1. 如果下标超出了滑动窗口范围，从队头移除
2. 如果遇到了更大的数，更大的数字从队尾入队，比该数小的从队尾出队

## 代码实现

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  if (nums === null || k <= 0) {
    return [];
  }
  let n = nums.length;
  let r = [];
  let ri = 0;
  // deque store index
  let q = [];
  for (let i = 0; i < nums.length; i++) {
    // remove numbers out of range k
    while (q.length > 0 && q[0] < i - k + 1) {
      q.shift();
    }
    // remove smaller numbers in k range as they are useless
    while (q.length > 0 && nums[q[q.length - 1]] < nums[i]) {
      q.pop();
    }
    // q contains index... r contains content
    q.push(i);
    if (i >= k - 1) {
      r[ri++] = nums[q[0]];
    }
  }
  return r;
};
```

## 复杂度

- 时间复杂度：O(n)
- 空间复杂度：O(n)
