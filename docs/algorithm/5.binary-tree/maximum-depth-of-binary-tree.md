---
id: maximum-depth-of-binary-tree
title: 二叉树的最大深度
sidebar_label: 二叉树的最大深度
---

- 题源：《剑指Offer: 面试题 55-1》P271
- 在线：[LeetCode: 104](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

## 题目

给定一个二叉树，找出其最大深度。
```js
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
```
例如：深度为3

<div align="center">
    <img width="360" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/C4rOow.png" />
    <p>图：二叉树的最大深度</p>
</div>

## 思路
1. 递归左右子树，每次递归时深度加一
2. 使用栈 + 深度优先遍历（先序遍历）
3. 使用队列 + 广度优先遍历

## 代码实现

### 递归法
```js
var maxDepth = function(root) {
    if(root === null) return 0
    let left = maxDepth(root.left) + 1;
    let right = maxDepth(root.right) + 1;
    return left > right ? left : right;
};
```
- 时间复杂度：每个结点只访问一次，因此时间复杂度为 O(N)，其中N是结点个数。

- 空间复杂度：最坏情况下，每层只有一个节点，比如说只有左子树，递归将会被调用N次（树的高度），因此保持调用栈的存储将是 O(N)。最好的情况下（树是完全平衡的），树的高度将是 log(N)。因此，在这种情况下的空间复杂度将是 O(log(N))。

### 栈 + 深度优先遍历

```js
var maxDepth = function(root) {
    let stack = [{node: root, dep: 1}];
    let depth = 0;
    while(stack.length) {
        let currObj = stack.pop();
        let currNode = currObj.node;
        if(currNode !== null) {
            let currDepth = currObj.dep;
            depth = Math.max(depth, currDepth);
            currNode.right && stack.push({node: currNode.right, dep: currDepth + 1});
            currNode.left && stack.push({node: currNode.left, dep: currDepth + 1});
        }
    }
    return depth
};
```
- 时间复杂度：访问每个节点恰好一次，时间复杂度为 O(N) ，其中 N 是节点的个数，也就是树的大小。
- 空间复杂度： O(N)。

### 队列 + 广度优先遍历

```js
var maxDepth = function(root) {
    if(root === null) return 0;
    let queue = [root];
    let depth = 0;
    while(queue.length !== 0) {
        let size = queue.length;
        depth++;
        while(size > 0) {
            const currNode = queue.shift();
                currNode.left && queue.push(currNode.left)
                currNode.right && queue.push(currNode.right)
            size--;
        }
    }
    return depth
};
```
- 时间复杂度：访问每个节点恰好一次，时间复杂度为 O(N) ，其中 N 是节点的个数，也就是树的大小。
- 空间复杂度：O(N)