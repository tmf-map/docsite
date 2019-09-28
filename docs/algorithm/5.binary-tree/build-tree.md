---
id: build-tree
title: 重建二叉树
sidebar_label: 重建二叉树
---

- 题源：《剑指Offer: 面试题 7》P62
- 在线：[LeetCode: 105](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

## 题目

根据一棵树的前序遍历与中序遍历构造二叉树。注意: 你可以假设树中没有重复的元素。

例如，给出:

```text
前序遍历 preorder = [1, 2, 4, 7, 3, 5, 6, 8]
中序遍历 inorder = [4, 7, 2, 1, 5, 3, 8, 6]
```

返回如下的二叉树：

<div align="center">
    <img width="160" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/HipCM5.jpg" />
    <p>图：构造后的二叉树</p>
</div>

## 思路

1. 从前序遍历确定根结点
2. 在中序遍历找到根结点，将其分为左右子树
3. 根据中序遍历左右子树的个数，将前序遍历也分为对应的左右子树
4. 对左右子树的前序和中序再分别进行递归求解
5. 最后返回根节点

<div align="center">
    <img width="430" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/HxOdfm.jpg" />
    <p>图：确定根结点后划分左右子树（前序和中序都要划分）</p>
</div>

## 代码实现

```js
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
function buildTree(preorder, inorder) {
    if (preorder.length !== inorder.length || inorder.length === 0) {
        return null;
    }
    let root = new TreeNode(preorder[0]);
    let i = inorder.indexOf(preorder[0]);
    root.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, i));
    root.right = buildTree(preorder.slice(i + 1), inorder.slice(i + 1));
    return root;
}
```

## 拓展

- 如何从中序与后序遍历序列构造二叉树？[LeetCode: 106](https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)
- 前序遍历和后序遍历可以构造二叉树吗？
