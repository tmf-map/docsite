---
id: middle-of-the-linked-list
title: 链表的中间结点
---

import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';

import Img from '@site/src/components/Img';

- 在线：[LeetCode: 876](https://leetcode.com/problems/middle-of-the-linked-list/)

## 题目

Given a non-empty, singly linked list with head node head, return a middle node of linked list.If there are two middle nodes, return the second middle node.

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

双指针。让快指针两步两步走，同时慢指针一步一步走，当快指针走到末尾时，慢指针便指向了中间结点。

**Solution 1**

如果快指针可以前进的条件是：当前快指针和当前快指针的下一个结点都非空。

```py
while fast and fast.next:
    fast = fast.next.next
    sLow = slow.next
```

当结点个数为奇数时，slow 结点落在链表的中间结点：

<Img w="660" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/oY7h7f.png' alt='oY7h7f'/>

当结点个数为偶数时： slow 结点落在靠右的中间结点（符合题意）：

<Img w="550" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/LHpvrJ.png' alt='LHpvrJ'/>

**Solution 2**

如果快指针可以前进的条件是：当前快指针下一个结点和下下个结点都非空。

```py
while fast.next and fast.next.next:
    slow = slow.next
    fast = fast.next.next
```

当结点个数为奇数时，slow 结点落在链表的中间结点：

<Img w="660" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/oY7h7f.png' alt='oY7h7f'/>

当结点个数为偶数时： slow 结点落在靠左的中间结点（ 不符合题意）：

<Img w="550" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/LOmcqj.png' alt='LOmcqj'/>

## 代码实现

<Tabs defaultValue="js" values={[ {label: 'JavaScript', value: 'js'}, {label: 'Python', value: 'py'} ]}>

<TabItem value="js">

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
  let fast = head;
  let slow = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow;
};
```

</TabItem>

<TabItem value="py">

```py
class Solution:
    def middleNode(self, head: ListNode) -> ListNode:
        fast = head
        slow = head
        while fast and fast.next:
            fast = fast.next.next
            slow = slow.next
        return slow
```

</TabItem>

</Tabs>

## 复杂度

- 时间复杂度：O(n)
- 空间复杂度：O(1)

## 参考资料

1. [快慢指针 by liweiwei1419](https://leetcode-cn.com/problems/middle-of-the-linked-list/solution/kuai-man-zhi-zhen-zhu-yao-zai-yu-diao-shi-by-liwei/)
