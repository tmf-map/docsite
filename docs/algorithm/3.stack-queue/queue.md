---
id: queue
title: 队列
---

## 队列的基本操作

队列也是一种操作受限的线性表。只允许一端插入另一端删除数据，满足先进先出（FIFO）的特性。

队列主要包括两个操作：

- 入队`enqueue()`：往队尾添加一个数据
- 出队`dequeue()`：从队头取一个数据

<GifPlayer gif="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/queue.2020-08-14 15_21_10.gif" still="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/queue.png"/>

如上图所示，队列是典型的 FIFO 数据结构。新元素始终在队列的末尾。而在删除时，只能删除第一个元素。

## 队列的缺点

我们考虑如下的例子：分配一个长度为 6 的队列。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/queue1.png' alt='queue1' width="415"/>

做一次入队操作，可以成功。操作完成后，队列如下：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/queue2.png' alt='queue2' width="415"/>

做一次出队操作，可以成功，操作完成后，队列如下：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/queue3.png' alt='queue3' width="415"/>

此时，如果还想做一次入队操作，却不能成功，但其实队列中是有剩余空间的。这叫做队列的"假溢出"现象。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/queue4.png' alt='queue4' width="415"/>

随着头指针向后移动，浪费的空间将越来越多。如何解决这个问题呢？

## 循环队列

为充分利用空间，克服"假溢出"现象，将空间想象为一个首尾相接的圆环。存储在其中的队列称为[循环队列（Circular Queue）](/docs/algorithm/3.stack-queue/circular-queue)。在一个普通队列里，一旦一个队列满了，即使在队列前部仍有空间，也不能再入队。但是使用循环队列，可以利用这个队列之前用过的空间去存储新的值。当存储空间的最后一个位置已被使用而再要进入队时，只要存储空间的第一个位置空闲，便可将元素加入到第一个位置，即将存储空间的第一个位置作为队尾。

在循环队列中，当队列为空时，有`head = tail`：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/circular-queue-null.png' alt='circular-queue-null' width="380"/>

而当所有队列空间全占满时，也有`head = tail`。为了区别这两种情况，规定循环队列最多只能有`MaxSize-1`个队列元素，当循环队列中只剩下一个空存储单元时，队列就已经满了。因此，队列判空的条件是`head = tail`，而队列判满的条件是`head =（tail+1)%MaxSize`。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/circular-queue.png' alt='circular-queue' width="380"/>

## 双端队列

双端队列 Double-ended queue，简称为 Deque，一个队列，其中的元素可以从头或尾添加或删除。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/deque.png' alt='deque' width="600"/>

## 参考资料

1. [数据结构与算法之美, by 王争](https://time.geekbang.org/column/intro/126)
2. [队列 & 栈, leetcode 探索](https://leetcode-cn.com/leetbook/detail/queue-stack/)
