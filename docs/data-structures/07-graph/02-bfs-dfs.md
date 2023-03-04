---
title: 广度和深度优先搜索
---

## 什么是搜索算法

我们都知道，算法是作用在具体的数据结构之上的。深度优先搜索和广度优先搜索算法都是基于图这种数据结构。图这种数据结构的表达能力很强，很多生活中的场景都可以抽象成图。

图上的搜索算法，最直接的理解是，从图中一个顶点出发，到另一个顶点的路径。

## 广度优先搜索

广度优先搜索（breadth-first-search），通常简称为 BFS。直观的讲，它是一种地毯式搜索，层层递进。即先查找离起始点最近的，然是是次近的，依次往外搜索。如下图所示：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/bfs.png' alt='bfs' width="450"/>

代码请参考：[岛屿数量](/docs/data-structures/07-graph/03-number-of-islands#bfs)

## 深度优先搜索

深度优先搜索（depth-first-search），通常简称 DFS。最直观的例子是走迷宫。面对某个岔路口，随意选择一条路走，走着走着发现不通后，退回到上一个岔路口，选择另一条路走。直到最终找到出口。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/dfs.png' alt='dfs' width="450"/>

代码请参考：[岛屿数量](/docs/data-structures/07-graph/03-number-of-islands#dfs)

## 参考资料

1. [数据结构与算法之美, by 王争](https://time.geekbang.org/column/intro/126)
