---
id: balanced-binary-tree
title: 平衡二叉树
sidebar_label: 平衡二叉树
---

import Img from '../../../src/components/Img';

- 题源：《剑指 Offer: 面试题 55-2》P273
- 在线：[LeetCode: 110](https://leetcode-cn.com/problems/balanced-binary-tree/)

## 题目

给定一个二叉树，判定该树是不是二叉树。

平衡二叉树定义：一个二叉树每个节点的左右两个子树的高度差的绝对值不超过 1

```js
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
```

例如：下图中图左的二叉树为平衡二叉树，图右非平衡二叉树。

<Img width='700' legend="图：平衡二叉树" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/ySuP1E.png" />

## 思路

1. 递归（从底到上），比较每个节点左右子树，只要高度相差大于 2，就提前返回。

## 代码实现

```js
var isBalanced = function(root) {
  var depth = function(root) {
    if (root === null) return false;
    let left = depth(root.left);
    if (left === -1) return -1;
    let right = depth(root.right);
    if (right === -1) return -1;
    return Math.abs(left - right) < 2 ? Math.max(left, right) + 1 : -1;
  };
  return depth(root) !== -1;
};
```
