---
title: 旋转矩阵
---

- 题源：程序员面试金典
- 在线：[LeetCode 面试题：01.07](https://leetcode-cn.com/problems/rotate-matrix-lcci/)
- 难度：中等

## 题目

给你一幅由 `N × N` 矩阵表示的图像，其中每个像素的大小为 4 字节。请你设计一种算法，将图像旋转 90 度。

**不占用额外内存空间能否做到？**

示例 1:

```text
给定 matrix =
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
],

原地旋转输入矩阵，使其变为:
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
```

示例  2:

```text
给定 matrix =
[
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
],

原地旋转输入矩阵，使其变为:
[
  [15,13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7,10,11]
]
```

## 思路

- 先水平翻转，再通过主对角线翻转

```text
1, 2, 3      7, 8, 9      7, 4, 1
4, 5, 6  =>  4, 5, 6  =>  8, 5, 2
7, 8, 9      1, 2, 3      9, 6, 3
```

## 代码实现

```js
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
let rotate = function (matrix) {
  let n = matrix.length;
  let temp;
  // 水平翻转
  for (let i = 0; i < n / 2; ++i) {
    for (let j = 0; j < n; ++j) {
      temp = matrix[n - i - 1][j];
      matrix[n - i - 1][j] = matrix[i][j];
      matrix[i][j] = temp;
    }
  }
  // 主对角线翻转
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < i; ++j) {
      temp = matrix[j][i];
      matrix[j][i] = matrix[i][j];
      matrix[i][j] = temp;
    }
  }
};
```

## 复杂度

- 时间复杂度：O(N<sup>2</sup>)，其中 N 是 矩阵 的边长。对于每一次翻转操作，我们都需要枚举矩阵中一半的元素

- 空间复杂度：O(1)
