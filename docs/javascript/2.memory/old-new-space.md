---
title: 分代回收
sidebar_label: 分代回收
---
### Node的GC特点

https://github.com/v8/v8/wiki

- 64bit: 1.4GB
- 32bit: 0.7GB

无法读取大文件到内存，带着手镣铐跳舞。Why？

- 浏览器用不到。
- GC，1.5GB垃圾需要1s左右的回收的时间，会阻塞JS主线程。

<img width="400" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/6umXqr.jpg'/>
<img width="400" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/x9XnBT.jpg'/>

process.memoryUsage返回一个对象，包含了 Node 进程的内存占用信息。该对象包含四个字段，单位是字节，含义如下：

- rss（resident set size）：所有内存占用，包括指令区和堆栈。
- heapTotal："堆"占用的内存，包括用到的和没用到的。
- heapUsed：用到的堆的部分。
- external： V8 引擎内部的 C++ 对象占用的内存。

node程序启动时候可以手动设置，但启动后不能动态更改：

```bash
node --max-old-space-size=1700 app.js # 单位为MB
node --max-new-space-size=1024 app.js # 单位为KB，因为新生代空间比较小
```

GC的三大基础算法 https://segmentfault.com/a/1190000004665100#articleHeader4

聊聊V8引擎的垃圾回收 https://juejin.im/post/5ad3f1156fb9a028b86e78be#heading-6

现代的垃圾回收器改良了算法，但是本质是相同的：可达内存被标记，其余的被当作垃圾回收。

特点：

- 基于分代式垃圾回收机制
- 不同场景利于利用不同GC算法（和统计学相关）

<img width="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/M2O65a.jpg'/>

## 新生代：Scavenge算法

Scavenge，拷贝-收集算法，它将新生代划分为两半即 semi space ，将存活的对象从From空间拷贝到To空间，过程中也会判断是否需要将对象“晋升”到老生代，拷贝完后，From空间的对象将会被回收。然后将To空间“**翻转**”成“From”空间，下次回收的时候再进行以上流程。

这是一种典型的以空间换时间的算法，空间利用率低，其速度也最快，只适用于生命周期短的场景。在64bit计算机上两块最大总共占32MB空间，故max-new-space-size 单位也是用KB。**默认大小呢**？

晋升：对象多次拷贝后依然存活将会晋升到老生代。

晋升条件：

- 对象是否经历过Scavenge回收
- To空间的内存占比是否超过25%（如果占比过高，To转成From后会影响后续内存分配）

## 老生代：Mark-Sweep算法

V8 GC主要使用该算法。

Mark-Sweep，标记清除，分为标记和清除两个阶段。老生代空间的算法第一个阶段都是标记阶段。当变量进入执行环境的时候，比如**函数中声明一个变量**，垃圾回收器将其标记为“进入环境”，当变量离开环境的时候（函数执行结束）将其标记为“离开环境”。垃圾回收器会在运行的时候给存储在内存中的所有变量加上标记，然后去掉环境中的变量以及被环境中变量所引用的变量（闭包），在这些完成之后仍存在标记的就是要删除的变量了。

从逻辑上讲，永远不能释放进入环境的变量所占用的内存，因为只要执行流进入相应的环境，就可能会用到它们。可以使用任何方式来标记变量。比如，可以通过翻转某个特殊的位来记录一个变量何时进入环境，或者使用一个“进入环境的”变量列表及一个“离开环境的”变量列表来跟踪哪个变量发生了变化。如何标记变量并不重要，关键在于采取什么策略。

- 标记阶段：遍历老生代堆中所有对象（这些对象是从新生代晋升过来的），并**标记存活对象**。
- 清除阶段：直接清除死亡对象（即没有标记的），但会造成碎片化（一小块区域可能永远不会被分配，也可能提前触发GC增大空间后可以解决，但这次是不必要的）

目前，IE、Firefox、Opera、Chrome和Safari的JavaScript实现使用的都是标记清除式的垃圾回收策略（或类似的策略），只不过垃圾收集的时间间隔互有不同。

<img width="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/yWLjGW.jpg'/>

<img width="300" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/8TjihR.jpg'/>

## 老生代：Mark-Compact算法

V8 GC辅助算法，当从新生代晋升过来的对象过大，空间不足时候才会使用该算法。

Mark-Compact，标记整理。它是Mark-Sweep算法的增强，让所有存活的对象都向一端移动，然后直接清理掉端边界以外的内存。

<img width="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/o7N0wh.jpg'/>
