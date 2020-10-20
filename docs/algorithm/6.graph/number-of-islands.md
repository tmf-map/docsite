---
id: number-of-islands
title: 岛屿数量
---

- 在线：[LeetCode: 200](https://leetcode.com/problems/number-of-islands/)

## 题目

Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Example 1:

```text
Input: grid = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
]
Output: 1
```

Example 2:

```text
Input: grid = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
]
Output: 3
```

## 思路

遍历整个二维数组，遇到 1 开始广度或深度搜索与其连着的 1，搜到后置为 0。直到整个二维数组中没有 1 结束遍历。

每一片相连的 1 会被广搜或深搜一次，记录经历了几次广搜或深搜就可以得到岛屿的数量。

## 代码实现

### dfs

```js
/**
 * @param {string[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        dfs(grid, i, j);
        count++;
      }
    }
  }
  return count;
};

const dfs = function (grid, i, j) {
  if (
    i < 0 ||
    j < 0 ||
    i >= grid.length ||
    j >= grid[0].length ||
    grid[i][j] !== '1'
  )
    return;
  grid[i][j] = 0;
  dfs(grid, i + 1, j);
  dfs(grid, i - 1, j);
  dfs(grid, i, j + 1);
  dfs(grid, i, j - 1);
};
```

### bfs

```js
/**
 * @param {string[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        bfs(grid, i, j);
        count++;
      }
    }
  }
  return count;
};

const bfs = function (grid, x, y) {
  let n = grid.length;
  let m = grid[0].length;
  let queue = [];
  queue.push(x * m + y);
  while (queue.length > 0) {
    let size = queue.length;
    for (let k = 0; k < size; k++) {
      let cur = queue.shift();
      let i = Math.floor(cur / m);
      let j = cur % m;
      if (i + 1 < n && grid[i + 1][j] === '1') {
        queue.push((i + 1) * m + j);
        grid[i + 1][j] = 0;
      }
      if (i - 1 >= 0 && grid[i - 1][j] === '1') {
        queue.push((i - 1) * m + j);
        grid[i - 1][j] = 0;
      }
      if (j + 1 < m && grid[i][j + 1] === '1') {
        queue.push(i * m + j + 1);
        grid[i][j + 1] = 0;
      }
      if (j - 1 >= 0 && grid[i][j - 1] === '1') {
        queue.push(i * m + j - 1);
        grid[i][j - 1] = 0;
      }
    }
  }
};
```

## 复杂度

BFS 和 DFS 的时间复杂度为 O(E)，E 为边；空间复杂度为 O(V)，V 为顶点。

- 时间复杂度：O(n^4)
- 空间复杂度：O(n^2)
