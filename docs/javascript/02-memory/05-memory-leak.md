---
title: 内存泄漏
---

## 概述

不再用到的内存，没有及时释放，就叫做内存泄漏 (Memory Leak)。

JS 中常见的内存泄漏有：

- 意外的全局变量
- 创建以及删除 DOM
- 循环引用

## 内存泄漏的识别方法

### 找出周期性增长的内存

怎样可以观察到内存泄漏呢？经验法则是，如果连续五次垃圾回收之后，内存占用一次比一次大，就有内存泄漏。这就要求实时查看内存占用。Chrome 浏览器查看内存占用：

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/cf5diM.png'/>

具体如何查看内存占用请阅读 Chrome DevTools 官方教程：[Chrome DevTools: 解决内存问题](https://developers.google.com/web/tools/chrome-devtools/memory-problems)，如果内存占用基本平稳，接近水平，就说明不存在内存泄漏。反之，就是内存泄漏了。

### 保存两个快照

切换到 Chrome Dev Tools 的 `Profiles` 标签，刷新页面，等页面刷新完成之后，点击 Take Heap Snapshot 保存快照作为基准。而后再次点击 The Button 按钮，等数秒以后，保存第二个快照。

筛选菜单选择 Summary，右侧选择 Objects allocated between Snapshot 1 and Snapshot 2，或者筛选菜单选择 Comparison ，然后可以看到一个对比列表。

此例很容易找到内存泄漏，看下 (string) 的 Size Delta Constructor，8MB，58 个新对象。新对象被分配，但是没有释放，占用了 8MB。

如果展开 (string) Constructor，会看到许多单独的内存分配。选择某一个单独的分配，下面的 retainers 会吸引我们的注意。

我们已选择的分配是数组的一部分，数组关联到 window 对象的 x 变量。这里展示了从巨大对象到无法回收的 root（window）的完整路径。我们已经找到了潜在的泄漏以及它的出处。

我们的例子还算简单，只泄漏了少量的 DOM 节点，利用以上提到的快照很容易发现。对于更大型的网站，Chrome 还提供了 Record Heap Allocations 功能。

### Record heap allocations 找内存泄漏

回到 Chrome Dev Tools 的 profiles 标签，点击 Record Heap Allocations。工具运行的时候，注意顶部的蓝条，代表了内存分配，每一秒有大量的内存分配。运行几秒以后停止。

上图中可以看到工具的杀手锏：选择某一条时间线，可以看到这个时间段的内存分配情况。尽可能选择接近峰值的时间线，下面的列表仅显示了三种 constructor：其一是泄漏最严重的（string），下一个是关联的 DOM 分配，最后一个是 Text constructor（DOM 叶子节点包含的文本）。

从列表中选择一个 HTMLDivElement constructor，然后选择 Allocation stack。

现在知道元素被分配到哪里了吧（grow -> createSomeNodes），仔细观察一下图中的时间线，发现 HTMLDivElement constructor 调用了许多次，意味着内存一直被占用，无法被 GC 回收，我们知道了这些对象被分配的确切位置（createSomeNodes）。回到代码本身，探讨下如何修复内存泄漏吧。

### 另一个有用的特性

在 heap allocations 的结果区域，选择 Allocation。

这个视图呈现了内存分配相关的功能列表，我们立刻看到了 grow 和 createSomeNodes。当选择 grow 时，看看相关的 object constructor，清楚地看到 (string), HTMLDivElement 和 Text 泄漏了。

结合以上提到的工具，可以轻松找到内存泄漏。

## 意外的全局变量

先看以下例子，可以本地建一个 `html` 文件运行一下。

```html
<body>
  <button id="btn">Click</button>
</body>
<script>
  var happy; // global
  var poop = function () {
    for (var i = 0; i < 100000; i++) {
      happy += ' a ';
    }
  };
  document.getElementById('btn').addEventListener('click', poop);
</script>
```

当我们不断点击 `button` 的时候通过 `Performance` 面板可以分析出以下内存占用图：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/fP2iLE.png'/>

可以看出发生了内存泄漏，如果修改一下代码，将全局变量换成局部变量：

```html
<body>
  <button id="btn">Click</button>
</body>
<script>
  var poop = function () {
    var happy; // local
    for (var i = 0; i < 100000; i++) {
      happy += ' a ';
    }
  };
  document.getElementById('btn').addEventListener('click', poop);
</script>
```

再看一下内存占用图，内存得到了及时的回收：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/uxQLmN.png'/>

尤其当全局变量用于临时存储和处理大量信息时，需要多加小心。如果必须使用全局变量存储大量数据时，确保用完以后把它设置为 `null` 或者重新定义。与全局变量相关的增加内存消耗的一个主因是缓存。

:::tip

缓存数据是为了重用，**缓存必须有一个大小上限才有用**。高内存消耗导致缓存突破上限，因为缓存内容无法被回收。

:::

## 创建以及删除 DOM

有一组很经典的情况就是游离状的 DOM 无法被回收。以下的代码， `node` 已经被删除了，那么 `node` 中的子元素是否可以被回收？

```js
let node = document.getElementById('node');
for (let i = 0; i < 2000; i++) {
  let div = document.createElement('div');
  node.appendChild(div);
}
document.body.removeChild(node);
```

答案是 `NO` ，因为 `node` 的引用还存在着，虽然在 DOM 中被删除了，但在 `window` 中引用还在，这个时候 node 的子元素就会以游离状态的 DOM 存在，而且无法被回收，如下图所示：

<Img width="300" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/fGBpmf.png'/>

解决方案就是 `node = null` ，手动清空引用，消除游离状态的 DOM。

即使 `setInterval` 像下面这样写，其实也没发生内存泄漏：

```js
setInterval(function () {
  var happy;
  for (var i = 0; i < 100000; i++) {
    happy += ' a ';
  }
}, 1000);
```

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/qpzkFL.png'/>

`setInterval` 只是放大了内存泄漏，但并不是罪魁祸首。

## 循环引用

对于观察者的例子，一旦它们不再需要（或者关联的对象变成不可达），明确地移除它们非常重要。老的 IE 6 是无法处理循环引用的。如今，即使没有明确移除它们，一旦观察者对象变成不可达，大部分浏览器是可以回收观察者处理函数的。

观察者代码示例：

```js
var element = document.getElementById('button');
function onClick(event) {
  element.innerHTML = 'text';
}
element.addEventListener('click', onClick);
```

老版本的 IE 是无法检测 DOM 节点与 JavaScript 代码之间的循环引用，会导致内存泄漏。如今，现代的浏览器（包括 IE 和 Microsoft Edge）使用了更先进的垃圾回收算法，已经可以正确检测和处理循环引用了。换言之，回收节点内存时，不必非要调用 removeEventListener 了。

在 Chrome 中查看一下内存情况，发现其实并没有发生泄漏：

## WeakSet/WeakMap

前面说过，及时清除引用非常重要。但是，你不可能记得那么多，有时候一疏忽就忘了，所以才有那么多内存泄漏。

最好能有一种方法，在新建引用的时候就声明，哪些引用必须手动清除，哪些引用可以忽略不计，当其他引用消失以后，垃圾回收机制就可以释放内存。这样就能大大减轻程序员的负担，你只要清除主要引用就可以了。

ES6 考虑到了这一点，推出了两种新的数据结构：WeakSet 和 WeakMap。它们对于值的引用都是不计入垃圾回收机制的（**其实就是对 key 或者 value 的引用计数不再增加，相当于 WeakMap 中这次引用计数是不算数的**），所以名字里面才会有一个"Weak"，表示这是弱引用。

下面以 WeakMap 为例，看看它是怎么解决内存泄漏的。

```js
const wm = new WeakMap();
const element = document.getElementById('example');

wm.set(element, 'some information');
wm.get(element); // "some information"
```

上面代码中，先新建一个 WeakMap 实例。然后，将一个 DOM 节点作为键名存入该实例，并将一些附加信息作为键值，一起存放在 WeakMap 里面。这时，WeakMap 里面对 `element` 的引用就是弱引用，不会被计入垃圾回收机制。

也就是说，DOM 节点对象的引用计数是 1，而不是 2。这时，一旦消除对该节点的引用，它占用的内存就会被垃圾回收机制释放。 WeakMap 保存的这个键值对，也会自动消失。

基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。只要外部的引用消失（比如 `element` 的引用被解除），WeakMap 内部的引用，就会自动被垃圾回收清除（`'some information'`的空间就会被回收）。

## 更多阅读

1. [YouTube Video: Find memory leaks with Chrome Dev Tools](https://youtu.be/nrPa0mEk4Pw)
2. [YouTube Video: He's Dead Jim: Finding JS Memory Leaks with Chrome Dev Tools](https://youtu.be/RJRbZdtKmxU)
3. [YouTube Video: How Javascript Causes Memory Leak](https://youtu.be/xrX_BtOUDls)
4. [深度解密 setTimeout 和 setInterval——为 setInterval 正名！作者：小美娜娜](https://juejin.im/post/5c4044e1f265da614f708f7d)
