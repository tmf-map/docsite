---
id: remove-nth-node-from-end-of-list
title: 删除链表倒数第 n 个结点
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

由于删除结点需要知道需删除结点的前驱结点，如果不使用头节点，需要处理边界条件：当删除结点为第一个结点时，它没有前驱结点。例如给定一个只有一个结点的链表: `1`, 和 `n = 1`:

<Img w="260" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/iTGxvw.png' alt='iTGxvw'/>

此时，删除节点的代码不能通用，需要针对这种情况进行特别处理：

```py
if head.next is None:
    head = None
return head
```

如果添加头节点后，就不需要针对这种情况进行特殊处理：

<Img w="340" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/vLCAFK.png' alt='vLCAFK'/>

那么代码中也不需要专门的 if 语句，直接 return 即可：

```py
return dummy_head.next
```

再例如给定一个链表: `1->2->3->4->5`, 和 `n = 2`，当删除了倒数第二个节点后，链表变为 `1->2->3->5`。

我们先在原先 `head` 指针指向的链表中加入头节点，因为是单链表，删除结点的时候要找到前驱节点，所以还需要一个指针 slow prev，可以在 slow 移动的时候一起跟随移动：

<Img w="760" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/7N77Qb.png' alt='7N77Qb'/>

fast 先向前走 2 步：

<Img w="760" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/glT1Uw.png' alt='glT1Uw'/>

此后 slow 和 fast 一起移动，直到当 fast 为 `null`/`None`：

<Img w="760" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/BZI3NZ.png' alt='BZI3NZ'/>

此时，删除 slow 指向的结点即可：

<Img w="760" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/PUhpb2.png' alt='PUhpb2'/>

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
  let dummyHead = new ListNode(null);
  dummyHead.next = head;

  let fast = head; // 快指针，用于定位尾结点的指针
  let slow = head; // 慢指针，用于定位删除结点的指针
  let slowPrev = dummyHead; // 用于定位需删除结点的前驱结点
  for (let i = n; i > 0; i--) {
    // 快指针先走n步
    if (fast !== null) {
      fast = fast.next;
    } else return null;
  }

  while (fast !== null) {
    // 快慢指针一起走，直到快指针到达尾结点
    fast = fast.next;
    slow = slow.next;
    slowPrev = slowPrev.next;
  }
  slowPrev.next = slow.next; // 删除slow
  return dummyHead.next;
};
```

</TabItem>

<TabItem value="py">

```py
class Solution:
    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        dummy_head = ListNode(None)
        dummy_head.next = head
        fast = head
        slow = head
        slow_prev = dummy_head
        while n and fast:
            fast = fast.next
            n = n - 1
        if n:
            return None
        while fast:
            fast = fast.next
            slow_prev = slow
            slow = slow.next
        # delete the node which the slow pointed to
        slow_prev.next = slow.next
        return dummy_head.next
```

</TabItem>

</Tabs>

## 复杂度

- 时间复杂度：O(n)
- 空间复杂度：O(1)
