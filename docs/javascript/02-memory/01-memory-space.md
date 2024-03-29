---
title: 内存空间
---

## Object

### 继承关系

Object 类是 Javascript 的对象的具体表现。Javascript 的对象种类繁多，它们是以继承 Object 类的子对象的形式表现出来的。Object 类的继承关系如图 1 所示，根据 [V8 源码](https://github.com/v8/v8/blob/master/src/objects/objects.h) 整理。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/j1MT8i.png' legend="图1：Object 类的继承关系"/>

这些类本质上都是 C++ 的类，和 JS 相关的会以 "JS" 前缀命名。Object 类的子对象的分配方法各有不同，下文所说的 `对象` 指的是顶层的 `Object`。

图 1 中的 `Smi (Small integer)` 类是下文将要介绍的“内嵌对象”。也就是说，它们是没有被分配到 VMHeap 的直接数据。生成实例时会把图 1 中的 `HeapObject` 类从 VM Heap 分配出去。也就是说， `HeapObject` 类的实例是 GC 的对象。因此，我们没必要明确地销毁实例。 `HeapObject` 类是用于生成 GC 对象，也就是实例的，所以可以说是最为重要的类。

`HeapObject` 类实例(对象)必定存有指向 `Map` 类实例(map 对象)的指针。本文将其称为 `map地址` 。这个 `Map` 类负责管理对象的型信息，例如保留实例的大小和型的种类等。 `Map` 这个名字来源于 `SelfVM` 。

### 内嵌对象

这里所说的 “内嵌对象” 指的是不经过 VMHeap 的对象分配，而把对象的信息直接嵌人指针本身的对象。它跟 C++ 上的 int、double、 float 等“直接数据”是不同的东西。

JS 的内嵌对象包括以下几种:

1. number
2. symbol
3. string
4. boolean
5. null
6. undefined

下面就以其中的 number 为例来说明。 number 不会分配 VM Heap 的对象，而是把信息嵌入指针本身。

为什么要这么办呢?这是为了实现高速化。因为 Number 是经常被使用的对象，所以把它一个一个地分配到 VM Heap 太浪费时间和资源了。因此才通过将信息本身嵌入指针来实现高速化。不过如果指针是 32 位的话， Number 只能处理不超过 31 位的数值。如果超过了 31 位，也就超过了嵌人的信息量，这样一来 Number 就会把对象当成 Bignum 分配到 VMHeap。

## V8 详细信息

分析内存时，了解`Heap snapshot`的显示方式非常有用。本部分将介绍一些特定于 **V8 JavaScript 虚拟机**（V8 VM 或 VM）的内存相关主题。

### 对象表示

存在三种原始类型：

- 数字（例如 3.14159..）
- 布尔值（true 或 false）
- 字符串（例如“Werner Heisenberg”）

它们无法引用其他值，并且始终是叶或终止节点。

#### 数字

可以存储为：

- 中间 31 位整型值（称为**小整型** (SMI, Small Integer)），或
- 堆对象，作为**堆数字**引用。堆数字用于存储不适合 SMI 格式的值（例如双精度），或者在需要将值“包装”起来时使用（例如在值上设置属性）。

#### 字符串

可以存储在以下位置：

- **VM 堆**中，或
- **渲染器内存**中（外部）。将创建一个包装器对象并用于访问外部存储空间，例如，外部存储空间是存储脚本源和从网页接收（而不是复制到 VM 堆上）的其他内容的位置。

新 JavaScript 对象的内存分配自专用的 JavaScript 堆（或 **VM 堆**）。这些对象由 V8 的垃圾回收器管理，因此，只要存在一个对它们的强引用，它们就会一直保持活动状态。

#### 原生对象

JavaScript 堆之外的任何对象。与堆对象相反，原生对象在其生命周期内不由 V8 垃圾回收器管理，并且只能使用其 JavaScript 包装器对象从 JavaScript 访问。

#### Cons 字符串

一种由存储并联接的成对字符串组成的对象，是串联的结果。cons 字符串内容仅根据需要进行联接。一个示例便是需要构造已联接字符串的子字符串。

例如，如果你将 a 与 b 串联，你将获得一个字符串 (a, b)，它表示串联结果。如果你稍后将 d 与该结果串联，你将得到另一个 cons 字符串 ((a, b), d)。

#### 数组

数组是一个具有数字键的对象。它们在 V8 VM 中广泛使用，用于存储大量数据。用作字典的成套键值对采用数组形式。

典型的 JavaScript 对象可以是两个数组类型之一，用于存储：

- 命名属性，以及
- 数字元素

数字元素如果属性数量非常少，可以将其存储在 JavaScript 对象自身内部。

#### Map

一种用于说明对象种类及其布局的对象。例如，可以使用 Map 说明用于 [快速属性访问](https://developers.google.com/v8/design.html#prop_access) 的隐式对象层次结构。

### 对象组

每个原生对象组都由保持对彼此的相互引用的对象组成。例如，在 DOM 子树中，每个节点都有一个指向其父级的链接，并链接到下一个子级和下一个同级，形成一个互连图。请注意，原生对象不会在 JavaScript 堆中表示 - 这正是它们的大小为什么为零的原因。相反，创建包装器对象。

每个包装器对象都会保持对相应原生对象的引用，用于将命令重定向到自身。这样，对象组会保持包装器对象。不过，这不会形成一个无法回收的循环，因为 GC 非常智能，可以释放包装器对象不再被引用的对象组。但是，忘记释放单个包装器将保持整个组和关联的包装器。
