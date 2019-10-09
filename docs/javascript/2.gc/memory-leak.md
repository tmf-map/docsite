---
title: 内存泄漏
sidebar_label: 内存泄漏
---

不再用到的内存，没有及时释放，就叫做内存泄漏（memory leak）。

JS 中常见的内存泄漏有：

- 意外的全局变量
- setInterval 没有被清除
- 循环引用

## 内存泄漏的识别方法

怎样可以观察到内存泄漏呢？经验法则是，如果连续五次垃圾回收之后，内存占用一次比一次大，就有内存泄漏。这就要求实时查看内存占用。

Chrome 浏览器查看内存占用，按照以下步骤操作。

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/EhyK50.jpg'/>

1. 打开开发者工具，选择 Timeline 面板
2. 在顶部的Capture字段里面勾选 Memory
3. 点击左上角的录制按钮。
4. 在页面上进行各种操作，模拟用户的使用情况。
5. 一段时间后，点击对话框的 stop 按钮，面板上就会显示这段时间的内存占用情况。

如果内存占用基本平稳，接近水平，就说明不存在内存泄漏。

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/CV36w8.jpg'/>

反之，就是内存泄漏了。

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/ToRLx2.jpg'/>

前面说过，及时清除引用非常重要。但是，你不可能记得那么多，有时候一疏忽就忘了，所以才有那么多内存泄漏。

最好能有一种方法，在新建引用的时候就声明，哪些引用必须手动清除，哪些引用可以忽略不计，当其他引用消失以后，垃圾回收机制就可以释放内存。这样就能大大减轻程序员的负担，你只要清除主要引用就可以了。

ES6 考虑到了这一点，推出了两种新的数据结构：WeakSet 和 WeakMap。它们对于值的引用都是不计入垃圾回收机制的（**其实就是对key或者value的引用计数不再增加，相当于WeakMap中这次引用计数是不算数的**），所以名字里面才会有一个"Weak"，表示这是弱引用。

下面以 WeakMap 为例，看看它是怎么解决内存泄漏的。

```js
const wm = new WeakMap();
const element = document.getElementById('example');

wm.set(element, 'some information');
wm.get(element) // "some information"
```

上面代码中，先新建一个 WeakMap 实例。然后，将一个 DOM 节点作为键名存入该实例，并将一些附加信息作为键值，一起存放在 WeakMap 里面。这时，WeakMap 里面对element的引用就是弱引用，不会被计入垃圾回收机制。

也就是说，DOM 节点对象的引用计数是1，而不是2。这时，一旦消除对该节点的引用，它占用的内存就会被垃圾回收机制释放。 WeakMap 保存的这个键值对，也会自动消失。

基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。只要外部的引用消失（比如element的引用被解除），WeakMap 内部的引用，就会自动被垃圾回收清除（'some information'的空间就会被回收）。
