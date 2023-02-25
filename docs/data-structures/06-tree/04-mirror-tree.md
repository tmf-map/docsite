---
title: 二叉树的镜像
---

- 题源：《剑指 Offer: 面试题 27》P157
- 在线：[牛客网](https://www.nowcoder.com/practice/564f4c26aa584921bc75623e48ca3011)

## 题目

请完成一个函数，输入一颗二叉树，该函数输出它的镜像。二叉树的节点定义如下：

```js
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
```

<div align="center">
    <img width="350" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/SVRHY5.jpg" />
    <p>图：两棵互为镜像的二叉树</p>
</div>

## 思路

1. 前序遍历
2. 节点存在则交换其左右子树

## 代码实现

```js
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function mirror(root) {
  if (!root) return null;
  function preorder(node) {
    if (node) {
      let temp = node.left;
      node.left = node.right;
      node.right = temp;
      preorder(node.left);
      preorder(node.right);
    }
  }
  preorder(root);
  return root;
}
```

## 拓展

如果不用递归实现，而是循环，则该如何实现？
