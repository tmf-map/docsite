---
id: remove-nth-node-from-end-of-list
title: 删除链表倒数第n个结点
---

import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';

import Img from '../../../src/components/Img';

- 在线：[LeetCode: 19](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)

## 题目

Given a linked list, remove the n-th node from the end of list and return its head.

<Tabs defaultValue="js" values={[ {label: 'JavaScript', value: 'js'}, {label: 'Python', value: 'py'} ]}>

<TabItem value="js">

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

## 思路

双指针。让快指针先走 n 步，而后快慢指针一起移动，当快指针走到末尾时，慢指针便指向了倒数第 n 个结点。

由于删除结点需要知道需删除结点的前驱结点，如果不使用头节点，需要处理边界条件：当删除结点为第一个结点时，它没有前驱结点。如果添加头节点后，这种情况不需要特殊处理。例如给定一个只有一个结点的链表: `1`, 和 n = 1:

<Img w="450" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Evernote%20Snapshot%2020200704%20224230.png' alt='EvernoteSnapshot20200704224230'/>

给定一个链表: `1->2->3->4->5`, 和 n = 2，当删除了倒数第二个节点后，链表变为 `1->2->3->5`：

<Img w="450" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Evernote%20Snapshot%2020200704%20224309.png' alt='EvernoteSnapshot20200704224309'/>

## 代码实现

<Tabs defaultValue="js" values={[ {label: 'JavaScript', value: 'js'}, {label: 'Python', value: 'py'} ]}>

<TabItem value="js">

```js
/*
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  // 头节点
  let fakeHead = new ListNode(null);
  fakeHead.next = head;

  let end = head; // 快指针，用于定位尾结点的指针
  let cur = head; // 慢指针，用于定位删除结点的指针
  let pre = fakeHead; // 用于定位需删除结点的前驱结点
  for (let i = n; i > 0; i--) {
    // 快指针先走n步
    if (end !== null) {
      end = end.next;
    } else return null;
  }

  while (end !== null) {
    // 快慢指针一起走，直到快指针到达尾结点
    end = end.next;
    cur = cur.next;
    pre = pre.next;
  }
  pre.next = cur.next; // 删除cur
  return fakeHead.next;
};
```

</TabItem>

<TabItem value="py">

```py
class Solution:
    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        fakeHead = ListNode(None)
        fakeHead.next = head
        fast = head
        slow = head
        slowPre = fakeHead
        while n and fast:
            fast = fast.next
            n = n - 1
        if n:
            return None
        while fast:
            fast = fast.next
            slowPre = slow
            slow = slow.next
        # delete the node which the slow pointed to
        slowPre.next = slow.next
        return fakeHead.next
```

</TabItem>

</Tabs>

## 复杂度

- 时间复杂度：O(n)
- 空间复杂度：O(1)
