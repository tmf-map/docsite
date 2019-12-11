---
id: maximum-depth-of-binary-tree
title: 二叉树的最大深度
sidebar_label: 二叉树的最大深度
---

import Img from '../../../src/components/Img';

- 题源：《剑指 Offer: 面试题 55-1》P271
- 在线：[LeetCode: 104](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

## 题目

给定一个二叉树，找出其最大深度。

```js
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
```

例如：下图中二叉树的深度为 3

<Img width="360" legend="图：二叉树的最大深度" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/C4rOow.png" />

## 思路

1. 递归左右子树，树的深度为两者最大值 + 1（自底向上回溯）
2. 递归时，将当前节点的深度传递到下一层(自顶向下传参)
3. 使用栈 + 深度优先遍历（先序遍历）
4. 使用队列 + 广度优先遍历

## 代码实现

### 递归法（自底向上回溯）

```js
var maxDepth = function(root) {
  if (root === null) return 0;
  let left = maxDepth(root.left);
  let right = maxDepth(root.right);
  return left > right ? left + 1 : right + 1;
};
```

- 时间复杂度：每个结点只访问一次，因此时间复杂度为 O(N)，其中 N 是结点个数。

- 空间复杂度：最坏情况下，每层只有一个节点，比如说只有左子树，递归将会被调用 N 次（树的高度），因此保持调用栈的存储将是 O(N)。最好的情况下（树是完全平衡的），树的高度将是 log(N)。因此，在这种情况下的空间复杂度将是 O(log(N))。

### 递归法（向上向下传参）

父结点将自己的深度传给子结点，当子结点没有孩子的时候，将此时的深度和 result 做比较，并将最大的那个值赋给 result。

```js
var maxDepth = function(root) {
  if (root === null) return 0;
  let result = 1;
  let max_depth = function(root, depth) {
    if (root !== null) {
      if (root.left === null && root.right === null) {
        result = Math.max(result, depth);
      }
      max_depth(root.left, depth + 1);
      max_depth(root.right, depth + 1);
    }
  };
  max_depth(root, 1);
  return result;
};
```

- 时间复杂度： O(N)
- 空间复杂度： O(1)

### 栈 + 深度优先遍历

```js
var maxDepth = function(root) {
  let stack = [{node: root, dep: 1}];
  let depth = 0;
  while (stack.length) {
    let currObj = stack.pop();
    let currNode = currObj.node;
    if (currNode !== null) {
      let currDepth = currObj.dep;
      depth = Math.max(depth, currDepth);
      currNode.right && stack.push({node: currNode.right, dep: currDepth + 1});
      currNode.left && stack.push({node: currNode.left, dep: currDepth + 1});
    }
  }
  return depth;
};
```

- 时间复杂度：访问每个节点恰好一次，时间复杂度为 O(N) ，其中 N 是节点的个数，也就是树的大小。
- 空间复杂度： O(N)。

### 队列 + 广度优先遍历

```js
var maxDepth = function(root) {
  if (root === null) return 0;
  let queue = [root];
  let depth = 0;
  while (queue.length !== 0) {
    let size = queue.length;
    depth++;
    while (size > 0) {
      const currNode = queue.shift();
      currNode.left && queue.push(currNode.left);
      currNode.right && queue.push(currNode.right);
      size--;
    }
  }
  return depth;
};
```

- 时间复杂度：访问每个节点恰好一次，时间复杂度为 O(N) ，其中 N 是节点的个数，也就是树的大小。
- 空间复杂度：O(N)

## 相关拓展

- [树的遍历](https://leetcode-cn.com/explore/learn/card/data-structure-binary-tree/2/traverse-a-tree/7/)
- [运用递归解决树的问题](https://leetcode-cn.com/explore/learn/card/data-structure-binary-tree/3/solve-problems-recursively/11/)
