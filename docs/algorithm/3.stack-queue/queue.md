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

## 循环队列

为充分利用空间，克服"假溢出"现象，将空间想象为一个首尾相接的圆环。存储在其中的队列称为循环队列（Circular Queue）。循环队列是把顺序队列首尾相连，把存储队列元素的表从逻辑上看成一个环。在一个普通队列里，一旦一个队列满了，即使在队列前部仍有空间，也不能再入队。但是使用循环队列，我们能使用这些空间去存储新的值。循环队列的一个好处是我们可以利用这个队列之前用过的空间。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/circular-queue-null.png' alt='circular-queue-null' width="380"/>

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/circular-queue.png' alt='circular-queue' width="380"/>

## 双端队列

双端队列 Double-ended queue，简称为 Deque，一个队列，其中的元素可以从头或尾添加或删除。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/deque.png' alt='deque' width="600"/>

## 参考资料

1. [数据结构与算法之美, by 王争](https://time.geekbang.org/column/intro/126)
2. [队列 & 栈, leetcode 探索](https://leetcode-cn.com/leetbook/detail/queue-stack/)
