---
id: graph
title: 图的基本概念
---

日常生活中，在微信这类社交软件中，两个人可以相互加好友，那么该如何表示及存储社交网络的好友关系呢？

## 如何理解"图"

图和树一样，是一种非线性表结构，图比树更为复杂。树中的元素称为节点，而在图中称之为顶点（vertex）。不同于树，图中的每两个顶点之间都可以建立连接关系，这种关系称为边（edge）。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/graph.png' alt='graph' width="430"/>

生活中有很多符合图这种结构的例子。比如开头提到的社交网络。拿微信来说，每个用户看作一个顶点，如果两位用户成为了好友，就在他们之间建立一条边。这样微信的好友关系就可以使用一张如上图所示的图表示。这种图称为无向图。

其中每个用户有多少个好友，即每个点有多少条边，称为顶点的度（degree）。

还有一些社交网络，比如微博，存在方向的概念。某位用户关注了另一位用户，就建立一条该用户到其关注用户的边，如下图所示：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/directed-graph.png' alt='directed-graph' width="430"/>

这种图叫做有向图。顶点有从其出发的边，和以其为结尾的边。前者的数量称为顶点的出度（out-degree），后者称为入度（in-degree）。

前面我们讲到了微信和微博，对应无向图和有向图。QQ 的好友关系当中，有一个亲密度的概念。两位用户来往的越多，亲密度越高。那么亲密度该如何表示吗？

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/weighted-graph.png' alt='weighted-graph' width="430"/>

我们使用如上图所示的图来表示，这种图称为带权图。带权图中，每条边都有一个权重，可以使用这个权重来表示 QQ 好友间的亲密度。

## 如何存储图

### 邻接矩阵

邻接矩阵（adjacency matrix）是图的最直观的一种表示方法。

这种方法是使用一个二维数组来存储：

- 无向图：如果顶点 i、j 之间有边，则 A[i][j]为 1

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/graph-matrix.png' alt='graph-matrix' width="450"/>

- 有向图：如果顶点 i 到顶点 j 有箭头，则 A[i][j]为 1

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/directed-graph-matrix.png' alt='directed-graph-matrix' width="450"/>

- 带权图：相应的 A[i][j]为权值即可

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/weighted-graph-matrix.png' alt='weighted-graph-matrix' width="450"/>

用邻接矩阵存储一个图虽然简单直观，但非常浪费空间。像微信，其用户数量有好几亿，但每个用户的好友一般只有几百。使用邻接矩阵存储，因为顶点多需要一个很大的矩阵，但有意义的数据，即边的数量很少。

邻接矩阵也有很多优点。一方面，基于数组存储，获取两个顶点之间的关系时非常高效。另一方面，使用邻接矩阵存贮可以方便计算。可以将很多图之间的计算转化为矩阵运算。

### 邻接表

针对邻接矩阵浪费存储空间问题，我们来看另一种存储方法，邻接表（adjacency list）。

每一个顶点对应一条链表：

- 无向图：链表中存储了与该顶点之间有边的顶点

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/graph-list.png' alt='graph-list' width="600"/>

- 有向图：链表中存储了从该点出发的相邻的顶点

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/directed-graph-list.png' alt='directed-graph-list' width="600"/>

- 带权图：链表的每个结点多一个域存储权值

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/weighted-graph-list.png' alt='weighted-graph-list' width="750"/>

上一节我们总结了邻接矩阵虽然存储起来比较浪费空间，但是使用起来效率高节省时间。相反的，邻接表虽然节省存储空间，使用起来却比较浪费时间。

比如需要确定某顶点到另一顶点之间是否存在一条边，需要遍历查找某顶点的整个邻接链表。

为了提高查找效率，可以将邻接表"改进升级"。比如将链表改为平衡二叉查找树。实际开发中，可以选择红黑树、跳表等。也可以改为有序动态数组，利用二分法加快查找。

## 参考资料

1. [数据结构与算法之美, by 王争](https://time.geekbang.org/column/intro/126)
