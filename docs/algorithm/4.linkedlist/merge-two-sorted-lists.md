---
id: merge-two-sorted-lists
title: 合并两个有序链表
sidebar_label: 合并两个有序链表
---

- 题源：《剑指Offer: 面试题 25》P145
- 在线：[LeetCode: 21](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

## 题目

输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的，节点定义如下：

```js
function ListNode(val) {
    this.val = val;
    this.next = null;
}
```

<div align="center">
    <img width="580" src="https://raw.githubusercontent.com/ThinkBucket/oss/master/u0mCYK.png" />
    <p>图1：合并两个有序链表的过程</p>
</div>

## 思路

1. 本质上是归并排序里的 `merge` 函数在链表中的应用，只是不需要进行分割，直接合并即可
2. 可以从递归和迭代两个思路去思考如何进行合并

<div align="center">
    <img width="420" src="https://raw.githubusercontent.com/ThinkBucket/oss/master/NzXzvj.png" />
    <p>图2：合并两个有序链表的过程</p>
</div>

## 特殊测试

- 其中一个是空链表
- 两个只有一个节点的链表
- 链表中存在多个相等的值

## 代码实现

### 方法一：递归

当我们得到两个链表中值较小的头节点并把它链接到已经合并的链表之后，两个链表剩余的节点依然是有序的（如图2中间图所示），因此合并的步骤和之前是一样的，这就是典型的递归过程。

```js
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function mergeTwoLists (l1, l2) {
    if (l1 === null) return l2;
    if (l2 === null) return l1;
    let ans;
    if (l1.val < l2.val) {
        ans = l1;
        ans.next = mergeTwoLists(l1.next, l2);
    } else {
        ans = l2;
        ans.next = mergeTwoLists(l1, l2.next);
    }
    return ans;
}
```

### 方法二：迭代

```js
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function mergeTwoLists (l1, l2) {
    if (l1 === null) return l2;
    if (l2 === null) return l1;
    let ans = new ListNode();
    let p = ans;
    while (l1 && l2) {
        if (l1.val < l2.val) {
            p.next = l1;
            l1 = l1.next;
        } else {
            p.next = l2;
            l2 = l2.next;
        }
        p = p.next;
    }
    p.next = l1 || l2;
    return ans.next;
}
```

其中 `p.next = l1 || l2;` 可以替换成如下代码，本质上是归并排序里的 `merge` 函数：

```js
while (l1) {
    p.next = l1;
    p = p.next;
    l1 = l1.next;
}
while (l2) {
    p.next = l2;
    p = p.next;
    l2 = l2.next;
}
```

## 复杂度

- 时间复杂度: O(n)
- 空间复杂度: O(1)
