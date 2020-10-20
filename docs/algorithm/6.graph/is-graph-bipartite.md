---
id: is-graph-bipartite
title: 判断二分图
---

- 在线：[LeetCode: 785](https://leetcode.com/problems/is-graph-bipartite/)

## 题目

Given an undirected graph, return true if and only if it is bipartite.

Recall that a graph is bipartite if we can split it's set of nodes into two independent subsets A and B such that every edge in the graph has one node in A and another node in B.

The graph is given in the following form: `graph[i]` is a list of indexes `j` for which the edge between nodes `i` and `j` exists. Each node is an integer between `0` and `graph.length - 1`. There are no self edges or parallel edges: `graph[i]` does not contain `i`, and it doesn't contain any element twice.

Example 1:

```text
Input: [[1,3], [0,2], [1,3], [0,2]]
Output: true
Explanation:
The graph looks like this:
0----1
|    |
|    |
3----2
We can divide the vertices into two groups: {0, 2} and {1, 3}.
```

Example 2:

```text
Input: [[1,2,3], [0,2], [0,1,3], [0,2]]
Output: false
Explanation:
The graph looks like this:
0----1
| \  |
|  \ |
3----2
We cannot find a way to divide the set of nodes into two independent subsets.
```

Note:

- `graph` will have length in range `[1, 100]`.
- `graph[i]` will contain integers in range `[0, graph.length - 1]`.
- `graph[i]` will not contain `i` or duplicate values.
- The graph is undirected: if any element `j` is in `graph[i]`, then `i` will be in `graph[j]`.

## 思路

染色法。用黑白两色（用正负 1 表示）对图的顶点进行染色，相邻两个顶点不能使用同样的颜色，如果所有顶点都能染色，则该图是一个二分图。

## 代码实现

```js
/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function (graph) {
  let colors = [];
  for (let i = 0; i < graph.length; i++) {
    colors[i] = 0;
  }

  //This graph might be a disconnected graph. So check each unvisited node.
  for (let i = 0; i < graph.length; i++) {
    if (colors[i] === 0 && !validColor(graph, colors, 1, i)) {
      return false;
    }
  }
  return true;
};

/**
 * check if node has color and its neighbor has opposite color
 * @param {number[][]} graph
 * @param {number[]} colors
 * @param {number} color
 * @param {number} node
 * @return {boolean}
 */
const validColor = function (graph, colors, color, node) {
  if (colors[node] !== 0) {
    return colors[node] === color;
  }
  colors[node] = color;
  let neighbors = graph[node];
  for (let i = 0; i < neighbors.length; i++) {
    // check neighbor has the opposite color
    if (!validColor(graph, colors, -color, neighbors[i])) {
      return false;
    }
  }
  return true;
};
```

## 复杂度

- 时间复杂度：O(n)
- 空间复杂度：O(n)
