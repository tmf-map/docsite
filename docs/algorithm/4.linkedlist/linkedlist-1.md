---
id: linkedlist-1
title: 链表基本介绍
keywords:
  - singly linked list
  - circularly linked list
  - doubly linked list
---

import Img from '../../../src/components/Img';

## 链表和数组

链表和数组都属于基础的数据结构--线性表。它们在内存存储上表现不一样，各种操作的效率也不一样。

有了数组为什么还需要链表呢？链表存储数据时，在内存中不一定按照顺序存储，因此能充分利用计算机内存空间。但也同时失去了随机读取的优点。在实现时，每个结点需要增加一个指针域，用于存放下一个元素的地址。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/linkedlist-and-array.png' alt='linkedlist-and-array' width='600'/>

从上图中可以看出，数组需要一块连续的存储空间，对内存要求比较高。如果申请一个 100MB 大小的数组，在内存中没有连续的、足够大的空间时，即便剩余的总可用内存大于 100MB 也会申请失败。

而链表恰恰相反，它不需要一块连续的内存空间，它通过指针将一系列零散的内存小块串联起来使用，所以申请 100MB 大小的链表，根本不会有问题。

## 几种常见的链表

### 单链表

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/singly-linked-list.png' alt='singly-linked-list' width='580'/>

单链表的结构如上图所示。其中有两个结点很特殊，我们习惯性地称第一个结点为头结点，最后一个结点为尾结点。其中头结点用来记录链表地基地址，有了它才能遍历整个链表。而尾结点的特殊之处在于指针不再指向下一个结点，而是指向 NULL，表示这是链表上最后一个结点。

数组进行删除和插入操作时，为了保持内存数据的连续性，需要进行大量的数据移动，所以时间复杂度是 O(n)。而在链表中插入或者删除，并不需要移动，因为链表存储空间本身就是不连续的。所以，在链表中插入或删除一个数据是非常快的。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/delete-insert-singly-list.png' alt='delete-insert-singly-list' width='500'/>

如上图所示，在链表中插入和删除只需要更改几个相邻结点的指针，因此时间复杂度只有 O(1)。

但是，当链表需要访问第 k 个结点时，就没有那么高效了。数组是连续存储的，只需要首地址和下标就可以计算出某元素对应的内存地址。而链表是不连续的，只能从头开始一个一个往下数，因此需要 O(n)的时间复杂度。

### 循环链表

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/circularly-linked-list.png' alt='circularly-linked-list' width='550'/>

循环链表是一个特殊的单链表，区别仅在于尾结点。不同于单链表尾结点指向 NULL，循环链表尾结点指向头节点。从上图也可以看出，它像一个环一样首尾相连，所以叫做"循环"链表。与单链表相比，循环链表的优点在于从链尾到链头比较方便。当需要处理的数据具有环形结构的时候，就适合采用循环链表。比如著名的约瑟夫问题。

### 双向链表

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/doubly-linked-list.png' alt='doubly-linked-list' width='700'/>

单链表只有一个方向，双向链表，顾名思义，支持两个方向。双向链表中，每一个结点不止一个后继指针 next，还有一个前驱指针 prev。

### 双向循环链表

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/doubly-circularly-linked-list.png' alt='doubly-circularly-linked-list' width='630'/>

结合了双向链表和循环链表的特点，尾结点的后继指针 next 指向第一个结点，而第一个结点的前驱指针指 prev 向尾结点。

### 链表和数组的性能对比

| 时间复杂度 | 数组 | 链表 |
| :--------: | :--: | :--: |
|  插入删除  | O(n) | O(1) |
|  随机访问  | O(1) | O(n) |

## 参考链接

1. [数据结构与算法之美, by 王争](https://time.geekbang.org/column/intro/126)
