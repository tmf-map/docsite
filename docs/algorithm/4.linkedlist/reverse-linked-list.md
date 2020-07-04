---
id: reverse-linked-list
title: 反转链表
---

import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';

import Img from '../../../src/components/Img';

- 在线：[LeetCode: 206](https://leetcode.com/problems/reverse-linked-list/)

## 题目

Reverse a singly linked list.

<Tabs defaultValue="js" values={[ {label: 'JavaScript', value: 'js'}, {label: 'Python', value: 'py'} ]}> <TabItem value="js">

```js
function ListNode(val) {
  this.val = val;
  this.next = null;
}
```

</TabItem>

<TabItem value="py">

```py
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None
```

</TabItem>

</Tabs>

## 代码实现

### 方法一：递归

<Tabs defaultValue="js" values={[ {label: 'JavaScript', value: 'js'}, {label: 'Python', value: 'py'} ]}> <TabItem value="js">

```js
/*
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverse = function (head) {
  if (head === null || head.next === null) return head;
  let last = reverse(head.next);
  head.next.next = head;
  head.next = null;
  return last;
};
```

</TabItem>

<TabItem value="py">

```py
class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        if head == None or head.next == None:
            return head
        last = self.reverseList(head.next)
        head.next.next = head
        head.next = None
        return last
```

</TabItem>

</Tabs>

首先要明确递归函数的意义。reverse 函数的意义是：输入一个头节点 head，将以这个结点为头的链表反转，返回反转后的新头节点。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/reverse-list-1.png' alt='reverse-list-1' width='500'/>

上图这样一个链表，通过 reverse 函数可以将其拆成如下两部分：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/reverse-list-2.png' alt='reverse-list-2' width='500'/>

`reverse(head.next)`执行完后，会得到如下链表，刚刚已经明确过，reverse 函数会返回反转后的链表的新头，我们使用 last 来接收。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/reverse-list-3.png' alt='reverse-list-3' width='440'/>

最后只需合并两个部分：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/reverse-list-4.png' alt='reverse-list-4' width='440'/>

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/reverse-list-5.png' alt='reverse-list-5' width='440'/>

### 方法二：迭代

<Tabs defaultValue="js" values={[ {label: 'JavaScript', value: 'js'}, {label: 'Python', value: 'py'} ]}> <TabItem value="js">

```js
/*
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseLinkedlist = function (head) {
  let pre = null;
  let cur = head;
  while (cur) {
    let next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
};
```

</TabItem>

<TabItem value="py">

```py
class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        pre = None
        cur = head
        while cur:
            next = cur.next
            cur.next = pre
            pre = cur
            cur = next
        return pre
```

</TabItem>

</Tabs>

## 复杂度

两种算法的复杂度相同为：

- 时间复杂度：O(n)
- 空间复杂度：O(1)

## 参考资料

1. [labuladong 的算法小抄 之 递归反转链表的一部分，by labuladong](https://labuladong.gitbook.io/algo/shu-ju-jie-gou-xi-lie/di-gui-fan-zhuan-lian-biao-de-yi-bu-fen#yi-di-gui-fan-zhuan-zheng-ge-lian-biao)
