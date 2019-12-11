---
id: n-queens
title: N皇后问题
sidebar_label: N皇后问题
---

- 题源/在线：[LeetCode: 51](https://leetcode-cn.com/problems/n-queens/)

## 题目

n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

<div align="center">
    <img width="260" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/n6U0Xs.jpg" />
    <p>图：8 皇后问题的一种解法</p>
</div>

给定一个整数 n，返回所有不同的  n  皇后问题的解决方案。

每一种解法包含一个明确的  n 皇后问题的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

示例:

```text
输入: 4
输出: [
 [".Q..",  // 解法 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // 解法 2
  "Q...",
  "...Q",
  ".Q.."]
]
解释: 4 皇后问题存在两个不同的解法。
```

## 思路

## 代码实现

```js
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
  matrix = Array(n)
    .fill('.')
    .map(v => Array(n).fill(v));
  cols = Array(n).fill('.');
  diag1 = Array(2 * n - 1).fill('.');
  diag2 = Array(2 * n - 1).fill('.');
  ans = [];

  function explore(r) {
    if (r === n) {
      // found one solution, add to the ans set
      ans.push(matrix.map(v => v.join('')));
      return;
    }
    // Try every column
    for (let c = 0; c < n; c++) {
      if (available(r, c)) {
        addQueen(r, c);
        explore(r + 1);
        removeQueen(r, c);
      }
    }
  }

  function available(r, c) {
    return (
      cols[c] === '.' && diag1[c + r] === '.' && diag2[c - r + n - 1] === '.'
    );
  }

  function addQueen(r, c) {
    matrix[r][c] = 'Q';
    cols[c] = 'x';
    diag1[c + r] = 'x';
    diag2[c - r + n - 1] = 'x';
  }

  function removeQueen(r, c) {
    matrix[r][c] = '.';
    cols[c] = '.';
    diag1[c + r] = '.';
    diag2[c - r + n - 1] = '.';
  }

  explore(0);
  return ans;
};
```
