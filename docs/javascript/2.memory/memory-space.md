---
title: 内存空间
sidebar_label: 内存空间
---

## Object

### 继承关系

0bject类是Javascript的对象的具体表现。Javascript 的对象种类繁多，它们是以继承object类的子对象的形式表现出来的。Object类的继承关系如图1所示：

<div align="center">
    <img width="450" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/cDO0Dx.png'/>
    <p>图1：Object类的继承关系</p>
</div>

Object类的子对象的分配方法各有不同，下文所说的 `对象` 指的是顶层的 `Object`。

图1中的 `Smi (Small integer)` 类和 `Failure` 类是下文将要介绍过的“内嵌对象”。也就是说，它们是没有被分配到 VMHeap 的直接数据。

生成实例时会把图1中的 `HeapObject` 类从 VM Heap 分配出去。也就是说， `HeapObject` 类的实例是 GC 的对象。因此，我们没必要明确地销毁实例。 `HeapObject` 类是用于生成 GC 对象，也就是实例的，所以可以说是本章中最为重要的类。

`HeapObject` 类实例(对象)必定存有指向 `Map` 类实例(map对象)的指针。本文将其称为 `map地址` 。这个 `Map` 类负责管理对象的型信息，例如保留实例的大小和型的种类等。 `Map` 这个名字来源于 `SelfVM` 。

### 内嵌对象

这里所说的“内嵌对象”指的是不经过VMHeap的对象分配，而把对象的信息直接嵌人指针本身的对象。它跟C++.上的int、double、 float 等“直接数据”是不同的东西。

Rubinius的内嵌对象包括以下几种:

1. number(数值)
2. symbol(符号)
3. true、false
4. null、undefined

下面就以其中的Number 为例来说明。 Number 不会分配 VM Heap 的对象，而是把信息嵌入指针本身。

为什么要这么办呢?这是为了实现高速化。因为 Number 是经常被使用的对象，所以把它一个一个地分配到 VM Heap 太浪费时间和资源了。因此才通过将信息本身嵌入指针来实现高速化。不过如果指针是32位的话， Number 只能处理不超过 31 位的数值。如果超过了31位，也就超过了嵌人的信息量，这样一来Number就会把对象当成  Bignum 分配到 VMHeap。
