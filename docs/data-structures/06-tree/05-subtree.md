---
title: 二叉树的子结构
---

- 题源：《剑指 Offer: 面试题 26》P148
- 在线：[牛客网](https://www.nowcoder.com/practice/6e196c44c7004d15b1610b9afca8bd88)

## 题目

输入两棵二叉树 A 和 B，判断 B 是不是 A 的子结构。二叉树节点的定义如下：

```js
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
```

<div align="center">
    <img width="380" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/b0OD25.png" />
    <p>图1：右边的树 B 是左边的树 A 的子结构</p>
</div>

## 思路

1. 在树 A 中找到和树 B 的根结点的值一样的节点 R
2. 递归判断树 A 中以 R 为根结点的子树是不是包含和树 B 一样的结构
3. 递归的终止条件是到达树 A 或树 B 的叶节点

<div align="center">
    <img width="380" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/EB7CVW.png" />
    <p>图2：A 和 B 的根节点相同，但 A 的根节点下面(实线部分)的结构和 B 的结构不一致</p>
</div>

<div align="center">
    <img width="380" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/epxJGQ.png" />
    <p>图3：A 中找到第二个值为 8 的节点，该节点下面(实线部分)的结构和 B 的结构一致</p>
</div>

## 特殊测试

- 两个二叉树的一个或两个根节点为 null
- 二叉树的所有子节点都没有左子树或右子树

## 代码实现

```js
function isSubtree(a, b) {
  let ans = false;
  if (a && b) {
    if (a.val === b.val) {
      ans = isSubtreeFromThisNode(a, b);
    }
    if (!ans) {
      ans = isSubtree(a.left, b);
    }
    if (!ans) {
      ans = isSubtree(a.right, b);
    }
  }
  return ans;
}

function isSubtreeFromThisNode(a, b) {
  // b 的叶节点已经遍历完
  if (!b) {
    return true;
  }
  // b 节点还存在，但 a 已经没有节点了
  if (!a) {
    return false;
  }
  if (a.val !== b.val) {
    return false;
  }
  return (
    isSubtreeFromThisNode(a.left, b.left) &&
    isSubtreeFromThisNode(a.right, b.right)
  );
}
```

## 拓展

- 如果 A 的一个子树包括 A 的一个节点和这个节点的**所有子孙**。那该怎么办呢？例如图 2，`8-9-2` 在 A 中只是中间一块，不能算是 A 的子树，故此时返回 `false`。
- 详情请参考：[LeetCode: 572](https://leetcode-cn.com/problems/subtree-of-another-tree/)
