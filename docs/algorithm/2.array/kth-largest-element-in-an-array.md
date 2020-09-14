---
id: kth-largest-element-in-an-array
title: 数组中的第K个最大元素
---

- 题源：暂无
- 在线：[LeetCode: 215](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

## 题目

在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。 k 总是有效的，且 1 ≤ k ≤ 数组的长度。

示例 1:

```text
输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
```

示例  2:

```text
输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
```

## 思路

利用**[快速排序](/docs/algorithm/8.sort/quick-sort)**的思想，从数组中随机找出一个元素 `nums[pivotIndex]`，把数组分为两部分，左边的元素小于等于它，右边的元素大于等于它。这时有两种情况：

1. 左边数组的元素个数小于 k，则右边中的第 k-pivotIndex 个元素即为第 k 大数
2. 左边数组的元素个数大于等于 k，则返回左边数组中的第 k 大数

## 代码实现

```js
const findKthLargest = (nums, k) => {
  const n = nums.length;

  const quick = (l, r) => {
    if (l > r) return;
    let random = Math.floor(Math.random() * (r - l + 1)) + l; // 随机选取一个index
    swap(nums, random, r); // 将它和位置r的元素交换，让 nums[r] 作为 pivot 元素
    /**
     * 选定一个 pivot 元素，根据它进行 partition
     * partition 找出一个位置：它左边的元素都比pivot小，右边的元素都比pivot大
     * 左边和右边的元素的是未排序的，但 pivotIndex 是确定下来的
     */
    let pivotIndex = partition(nums, l, r);
    /**
     * 我们希望这个 pivotIndex 正好是 n-k
     * 如果 n - k 小于 pivotIndex，则在 pivotIndex 的左边继续找
     * 如果 n - k 大于 pivotIndex，则在 pivotIndex 的右边继续找
     */
    if (n - k < pivotIndex) {
      quick(l, pivotIndex - 1);
    } else {
      quick(pivotIndex + 1, r);
    }
    /**
     * n - k == pivotIndex ，此时 nums 数组被 n-k 分成两部分
     * 左边元素比 nums[n-k] 小，右边比 nums[n-k] 大，因此 nums[n-k] 就是第K大的元素
     */
  };

  quick(0, n - 1); // 让n-k位置的左边都比 nums[n-k] 小，右边都比 nums[n-k] 大
  return nums[n - k];
};

function partition(nums, left, right) {
  let pivot = nums[right]; // 最右边的元素作为 pivot 元素
  let pivotIndex = left; // pivotIndex 初始为 left
  for (let i = left; i < right; i++) {
    // 逐个考察元素，和 pivot 比较
    if (nums[i] < pivot) {
      // 如果当前元素比 pivot 小
      swap(nums, i, pivotIndex); // 将它交换到 pivotIndex 的位置
      pivotIndex++;
    }
  } // 循环结束时，pivotIndex左边都是比pivot小的
  swap(nums, right, pivotIndex); // pivotIndex和right交换，更新pivot元素
  return pivotIndex; // 返回 pivotIndex 下标
}

function swap(nums, p, q) {
  const temp = nums[p];
  nums[p] = nums[q];
  nums[q] = temp;
}
```

## 复杂度

- 时间复杂度：O(n)，其中 n 为数组的长度
- 空间复杂度：O(logn)
