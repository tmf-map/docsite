---
id: queue
title: 队列
---

import Img from '../../../src/components/Img';

import GifPlayer from '../../../src/components/GifPlayer';

## 队列

队列也是一种操作受限的线性表。只允许一端插入另一端删除数据，满足先进先出的特性。

## 如何实现一个队列

队列主要包括两个操作：

- 入队`enqueue()`：往队尾添加一个数据
- 出队`dequeue()`：从队头取一个数据

<GifPlayer gif="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/queue.2020-08-14 15_21_10.gif" still="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/queue.png"/>

## 参考资料

1. [数据结构与算法之美, by 王争](https://time.geekbang.org/column/intro/126)
2. [队列 & 栈, leetcode 探索](https://leetcode-cn.com/leetbook/detail/queue-stack/)
