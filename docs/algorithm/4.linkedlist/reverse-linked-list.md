---
id: reverse-linked-list
title: 反转链表
sidebar_label: 反转链表
---

- 题源：《剑指Offer: 面试题 24》P142
- 在线：[LeetCode: 206](https://leetcode-cn.com/problems/reverse-linked-list/)

## 题目

定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点，节点定义如下：

```js
function ListNode(val) {
    this.val = val;
    this.next = null;
}
```

示例:

```text
输入: 1->2->3->4->5->null
输出: 5->4->3->2->1->null
```

## 思路

1. 直接进行 `curr.next = prev` 反转的时候，会导致 curr 和 next 断裂
2. 需要一个 next 指针先把 next 节点存储下来
3. 如果 next 是 null，说明 curr 已经到了尾节点，将新的 head 指向尾节点
4. 移动 prev 和 cur 使各自指向下一个节点
5. 思考迭代和递归的实现

<div align="center">
    <img width="530" src="https://raw.githubusercontent.com/ThinkBucket/oss/master/ex0Dzp.png" />
    <p>图：curr.next = prev 反转的时候出现断裂</p>
</div>

## 特殊测试

- 输入空链表
- 输入只有一个节点的链表

## 代码实现

### 方法一：迭代

```js
function reverseList (head) {
    let reversedHead = null;
    let prev = null;
    let curr = head;
    while (curr) {
        // 先存储 next
        let next = curr.next;
        if (!next) {
            reversedHead = curr;
        }
        // 反转
        curr.next = prev;
        // 指向下一个节点
        prev = curr;
        curr = next;
    }
    return reversedHead;
}
```

### 方法二：递归

递归的方法，处理 prev 的时候是采用函数传参的方式，巧妙利用递归可以避免处理指向一下个节点的时候逻辑比较“绕”的问题，代码也相对更简洁。

```js
function reverseList (head, prev = null) {
    if (!head) return null;
    let curr = head;
    // 先存储 next
    let next = curr.next;
    // 反转
    curr.next = prev;
    if (!next) {
        return curr;
    }
    return reverseList(next, curr);
}
```
