---
title: 队列
---

## 队列的基本操作

队列也是一种操作受限的线性表。只允许一端插入另一端删除数据，满足先进先出（FIFO）的特性。

队列主要包括两个操作：

- 入队`enqueue()`：往队尾添加一个数据
- 出队`dequeue()`：从队头取一个数据

<GifPlayer gif="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/queue.2020-09-12 12_46_06.gif" still="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/queue.2020-09-12 12_46_06.png"/>

如上图所示，队列是典型的 FIFO 数据结构。新元素始终在队列的末尾。而在删除时，只能删除第一个元素。

## 队列的缺点：假溢出

我们考虑如下的例子:

<Img w="400" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/vCKJ8w.png' alt='vCKJ8w'/>

1. 分配一个长度为 6 的队列，假设里面已有 `3-1-4-9-8`，这时还剩一个空位。
2. 将 `6` 入队列后，此时队列已满。
3. 做一次出队操作，此时队列头部会有一个空位。
4. 将 `5` 入队列，虽然头部还有空位，但不能成功。

这就是队列的"**假溢出**"现象，随着头指针向后移动，浪费的空间将越来越多。如何解决这个问题呢？

## 循环队列

为充分利用空间，克服"假溢出"现象，将空间想象为一个首尾相接的圆环，这种队列我们将其称为[循环队列（Circular Queue）](/docs/algorithm/3.stack-queue/circular-queue)，如下图所示：

<Img w="750" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/crnFrD.png' alt='crnFrD'/>

在循环队列中，当队列为空时，有`head = tail`，如果当所有队列空间全占满时，也有`head = tail`，将无法区别这两种情况，所以规定循环队列最多只能有`MaxSize - 1`个队列元素，当循环队列中只剩下一个空存储单元时，队列就已经满了。因此，队列判空的条件是`head = tail`，而队列判满的条件是`head =（tail+1) % MaxSize`。

对于"假溢出"现象，比如下面这张图，刚开始队列已满，然后进行了一次出队操作，空出了 `0` 这个位置，下一个元素 `8` 入队列时，因为是循环队列，`tail` 可以继续移动到 `0` 的位置：

<Img w="760" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/EV9ea5.png' alt='EV9ea5'/>

## 双端队列

双端队列 Double-ended queue，简称为 Deque，一个队列，其中的元素可以从头或尾添加或删除。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/dYvgsS.png' alt='deque' width="550"/>

## 参考资料

1. [数据结构与算法之美, by 王争](https://time.geekbang.org/column/intro/126)
2. [队列 & 栈, leetcode 探索](https://leetcode-cn.com/leetbook/detail/queue-stack/)
