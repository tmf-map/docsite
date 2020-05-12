---
title: 内存检测
---

## 对象大小

将内存视为具有原始类型（如数字和字符串）和对象（引用类型）的图。形象一点，可以将内存表示为一个由多个互连的节点组成的图，如下所示：

<div align="center">
    <img width="350" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Z3bLkf.jpg'/>
    <p>图中数字只是节点编号，并不是实际的值</p>
</div>

对象可通过以下两种方式占用内存：

- 直接通过对象自身占用。
- 通过保持对其他对象的引用隐式占用，这种方式可以阻止这些对象自动被垃圾回收器（简称 GC）回收。

使用 DevTools 中的 `Memory` 分析器时，将会看到多个信息列。`Shallow Size` 和 `Retained Size` 这两个列（均以字节`Byte`为单位）表示什么呢？

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/0ZbdLb.png'/>

### Shallow Size

这是对象自身占用内存的大小。

典型的 JavaScript 对象会将一些内存用于自身的说明和保存中间值。通常，只有数组和字符串会有明显的 `Shallow Size` 。不过，字符串和外部数组的主存储一般位于渲染器内存中，仅将一个小包装对象置于 JavaScript 堆上。

> 渲染器内存是渲染检查页面的进程的内存总和：原生内存 + 页面的 JS 堆内存 + 页面启动的所有专用工作线程的 JS 堆内存。

尽管如此，即使一个小对象也可能通过阻止其他对象被自动垃圾回收进程处理的方式间接地占用大量内存。

### Retained Size

这是将对象本身连同其无法从 **GC 根**到达的相关对象一起删除后释放的内存大小。

**GC 根**由 **handles** (官方翻译成“句柄”，这里使用原始英文术语) 组成，这些 handles 在从原生代码引用 V8 外部的 JavaScript 对象时创建（本地或全局）。所有这些 handles 都可以在 **GC roots > Handle scope** 和 **GC roots > Global handles** 下的 `Heap snapshot` 内找到。

存在很多内部 **GC 根**，其中的大部分都不需要用户关注。从应用角度来看主要关注以下类型的根：

- **Window 全局对象**（位于每个 iframe 中）。`Heap snapshot`中有一个距离字段，表示从 window 出发的最短保留路径上的属性引用数量。
- **文档 DOM 树**，由可以通过遍历文档到达的所有原生 DOM 节点组成。并不是所有的节点都有 JS 包装器，不过，如果有包装器(JS wrappers)，并且文档处于活动状态，包装器也将处于活动状态。

> 内存图**从根开始**，根可以是浏览器的 `window` 对象或 Node.js 模块的 `global` 对象。你无法控制此根对象的垃圾回收方式。

<div align="center">
    <img width="420" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/enmBSs.jpg'/>
</div>

任何无法从根到达的对象都会被 GC 回收。

## Retainers

堆是一个由互连的对象组成的网络。在数学领域，此结构被称为“图”或内存图。图由通过**边**连接的节点组成，两者都是给定标签。

- **节点**（或对象）使用构造函数（用于构建节点）的名称进行标记。
- **边**使用属性的名称进行标记。

了解 [how to record a profile using the Heap Profiler](https://developers.google.com/web/tools/chrome-devtools/profile/memory-problems/heap-snapshots)。我们可以从下面的 `Heap Profiler` 中看到一些引人注目的参数，例如距离：距离是指与 GC 根之间的距离。如果相同类型的几乎所有对象的距离都相同，只有少数对象的距离偏大，则有必要进行检查。

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/FKT1pk.png'/>

## 支配项

支配对象由一个树结构组成，因为每个对象都有且仅有一个支配项。对象的支配项可能缺少对其所支配对象的直接应用；也就是说，支配项的树不是图表的生成树。

在下面的图表中：

- 节点 1 支配节点 2
- 节点 2 支配节点 3 、4 和 6
- 节点 3 支配节点 5
- 节点 5 支配节点 8
- 节点 6 支配节点 7

<div align="center">
    <img width="210" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/fN93zR.jpg'/>
</div>

在下面的示例中，节点 `#3` 是 `#10` 的支配项，但 `#7` 也存在于从 GC 到 `#10` 的每一个简单路径中。因此，如果对象 B 存在于从根到对象 A 的每一个简单路径中，那么对象 B 就是对象 A 的支配项。

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/dominators.gif'/>
