---
title: 分代回收
---

## Intro to V8

https://github.com/v8/v8/wiki

## Node 的 GC 特点

输入 `process.memoryUsageO)` 可以查看 node 内存的使用情况：

<Img width="400" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/6umXqr.jpg'/>

`process.memoryUsage` 返回一个对象，包含了 Node 进程的内存占用信息。该对象包含四个字段，单位是字节：

- rss（resident set size）：所有内存占用，包括指令区和堆栈。
- heapTotal："堆"占用的内存，包括用到的和没用到的。
- heapUsed：用到的堆的部分。
- external： V8 引擎内部的 C++ 对象占用的内存。

Node 启动时默认的内存大小分配：

- 64bit: 1.4GB
- 32bit: 0.7GB

node 程序启动时候可以手动设置，但启动后不能动态更改：

```bash
node --max-old-space-size=1700 app.js # 单位为MB
node --max-new-space-size=1024 app.js # 单位为KB，因为新生代空间比较小
```

无法读取大文件到内存，带着手镣铐跳舞，因为：

- 浏览器用不到。
- GC，1.5GB 垃圾需要 1s 左右的回收的时间，会阻塞 JS 主线程。

现代的垃圾回收器改良了算法，但是本质是相同的：可达内存被标记，其余的被当作垃圾回收。特点：

- 基于分代式垃圾回收机制
- 不同场景利于利用不同 GC 算法（和统计学相关）

<Img width="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/M2O65a.jpg'/>

## 新生代

### Scavenge 算法

Scavenge，拷贝-收集算法，它将新生代划分为两半即 semi space ，将存活的对象从 From 空间拷贝到 To 空间，过程中也会判断是否需要将对象“晋升”到老生代，拷贝完后，From 空间的对象将会被回收。然后将 To 空间“**翻转**”成“From”空间，下次回收的时候再进行以上流程。

这是一种典型的以空间换时间的算法，空间利用率低，其速度也最快，只适用于生命周期短的场景。在 64bit 计算机上两块最大总共占 32MB 空间，故 `max-new-space-size` 单位也是用 KB。

:::note

晋升：对象多次拷贝后依然存活将会晋升到老生代。

:::

晋升条件：

- 对象是否经历过 Scavenge 回收
- To 空间的内存占比是否超过 25%（如果占比过高，To 转成 From 后会影响后续内存分配）

<Img w="340" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Scavenge.svg'/>

## 老生代

老生代为什么不用 Scavenge 算法?

- 老生代中的存活对象较多，复制存活对象的效率较低
- Scavenge 算法会浪费一半的存储空间

### Mark-Sweep 算法

就如它的字面意思一样，Mark-Sweep 算法由标记阶段和清除阶段构成。标记阶段是把所有活动对象都做上标记的阶段。清除阶段是把那些没有标记的对象，也就是非活动对象回收的阶段。

- **标记阶段**：遍历老生代堆中所有对象（这些对象是从新生代晋升过来的），并**标记为存活对象**。
- **清除阶段**：对老生代空间中没有被标记的变量进行清除。

:::note

存活对象：存活对象可以简单理解为在执行"环境"中的那些变量和被执行环境所引用的那些变量（闭包）。

:::

通过这两个阶段，就可以令不能利用的内存空间重新得到利用。Mark-Sweep 算法的操作过程如下图所示<sup>[4]</sup>：

<Img width="570" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/bPLpnZ.png' legend="图 执行 GC 前堆的状态" />

<Img width="580" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/dD14g7.png' legend="图 设置标志位的处理" />

<Img width="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/lpdWZ9.png' legend="图 标记阶段结束后的堆状态" />

<Img width="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/PVWVI5.png' legend="图 清除阶段结束后的堆状态" />

#### 变量清除后的问题：碎片化

对死对象进行清除后，内存可能会出现不连续的状态（如下图），逐渐产生被细化的分块，不久后就会导致无数的小分块散布在堆的各处，这种情况会对后续的内存分配造成麻烦。我们称这种状况为**碎片化(Fragmentation)**。众所周知，Windows 的文件系统也会产生这种现象。

<Img width="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/yWLjGW.jpg'/>

目前，IE、Firefox、Opera、Chrome 和 Safari 的 JavaScript 实现使用的都是标记清除式的垃圾回收策略（或类似的策略），只不过垃圾收集的时间间隔互有不同。

:::note

在 V8 的源代码里是不存在 MarkSweep 类这种东西的。MarkSweep 算法是在 MarkCompact 类里实现的。MarkSweep 算法和 MarkCompact 算法的实现有很多相似的部分，可能想用同一个类来搞定它们<sup>[5]</sup>。

:::

### Mark-Compact 算法

V8 GC 辅助算法，当从新生代晋升过来的对象过大，空间不足时候才会使用该算法。

Mark-Compact，标记整理。它是 Mark-Sweep 算法的增强，让所有存活的对象都向一端移动，然后直接清理掉端边界以外的内存。

<Img width="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/o7N0wh.jpg'/>

## Reference

1. [GC 的三大基础算法](https://segmentfault.com/a/1190000004665100#articleHeader4)
2. [聊聊 V8 引擎的垃圾回收](https://juejin.im/post/5ad3f1156fb9a028b86e78be#heading-6)
3. [深入浅出 Nodejs：内存控制 by 朴灵](https://book.douban.com/subject/25768396/)
4. [垃圾回收的算法与实现，作者：(日)中村成洋 相川光：2 GC 标记-清除算法](https://www.ituring.com.cn/book/1460)
5. [垃圾回收的算法与实现，作者：(日)中村成洋 相川光：13.5.3 GC 概要](https://www.ituring.com.cn/book/1460)
