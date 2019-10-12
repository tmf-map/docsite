---
id: setTimeout-or-setInterval
title: 为什么使用 setTimeout 模拟 setInterval功能
author: Robbie Han
authorTitle: Front End Engineer @ Tradeshift
authorURL: https://github.com/USTC-Han
authorImageURL: https://robbie-pic.oss-cn-beijing.aliyuncs.com/IMG_4175.JPG?x-oss-process=style/compress
authorTwitter: 
tags: [setTimeout, setInterval]
---
## setTimeout 和 setInterval功能

`setTimeout()`会在确定的时间调用回调函数，且回调函数只会执行一次。

`setInterval()`会重复调用一个函数，在每次调用之间具有固定的时间延迟。

## 为什么要模拟

为什么使用`setTimeout`模仿`setInterval`呢？这需要通过事件循环机制来解释，如果不清楚的话可以点击查看[事件循环机制](https://thinkbucket.github.io/docsite/docs/javascript/8.async-programming/event-loop)和[浏览器内核](https://thinkbucket.github.io/docsite/docs/web/13.rendering-engine/rendering-engine)相关内容。

由于`setInterval`或`setTimeout`不是JS中定义的，他们并不会在JS引擎线程中直接执行。当代码执行到`setInterval`或`setTimeout`时，事件循环机制会为`setTimeout`或`setInterval`开一个定时器线程并开始计时，等定义的时间过后，将回调函数放到回调队列里，等到函数调用栈空（`JS`引擎线程空闲）时，将回调函数放入函数调用栈（使用JS引擎线程）执行。
<!--truncate-->
这种机制导致`setInterval`两次回调函数开始执行的时间间隔总会小于设定的间隔。如下所示：
```
.    *    *    *    *    *    *
     [-]  [-]  [-]  [-]  [-]  [-]
```
我们假设其中的`.`代表`setInterval`开始执行，`*`表示回调函数被触发， `[-]`表示回调函数的执行时间。很显然相邻的两次回调函数开始执行的时间会小于我们设定的interval。取个极限，假设回调执行**999ms,interval为1000ms，两次回调的间隔只用1ms**。很显然，使用setInterval很难满足两次回调函数执行间隔为固定为1000ms的需求。


## 模拟后两者的区别

使用`setTimeout`模仿`setInterval`代码对比如下：

```js
function tick() {
    doStuff();
    setTimeout(tick, 100);
}
tick();
```

```js
function doStuff(){
    // 此处为需要执行一段时间T的代码
    doStuff();
}
setInterVal(doStuff, 100);
```
我们假设`.`代表`setInterval`和`setTimeout`开始执行，`*`表示回调函数被触发，`[-]`表示回调函数的执行时间。两者区别如下

Timeout:
```
.    *  .    *  .    *  .    *  .
     [--]    [--]    [--]    [--]
```
Timeout执行周期：
```
100ms
.    *  .
     [--]
```
Interval:
```
.    *    *    *    *    *    *
     [--] [--] [--] [--] [--] [--]
```
Interval执行周期：
```
 100ms
 *    *
 [--] 
```
由上可知，当回调函数`doStuff()`执行的时间较长时，`setTimeout`的执行周期会变长（100 + T）,但是相邻回调函数还是可以保证设定间隔。

对比`setInterval`可知：
- 当`doStuff()`执行的时间忽略不计时，两者几乎是等价的；
- 当`doStuff()`执行的时间小于100ms时，相邻回调函数间隔为（100-T）

那么还有一种情况当`doStuff()`执行的时间大于100ms时,setInterval会怎么表现呢？

### 函数回调执行时长大于设定时间

对于`setTimeout`来说没啥问题，本身周期继续加长就行。

对于`setInterval`来说，当下一次的回调函数入队时，会检测队列是否为空。如果不为空，则忽略本次回调。如果为空，将本次回调入队。

我们假设下图中的`w`代表在队列中等待不能立即被执行的回调函数，`x`表示会被忽略的、不会执行的回调。具体如下图所示：

```
.    *    w    w    x    w    w    x
     [------][------][------][------]
```
当`doStuff()`执行的时间长于间隔时，浏览器会为了让回调函数执行的更好而吃掉大量的内存，可能会影响页面的响应。

## 小结
- 当回调执行时间较短时，完全不许要使用`setTimeout`代替`setInterval`。

- 另外当回调执行时间执行时间过长时，并不会造成队列的待执行回调堆积，不会产生因为队列堆积影响性能问题。

- 如果要保证回调函数执行间隔可以使用`setTimeout`代替`setInterval`。如果实现动画，在兼容性允许的情况下，使用requestAnimationFrame是更好的选择。

## 参考文章
[setTimeout or setInterval?](https://stackoverflow.com/questions/729921/settimeout-or-setinterval)

[为什么要用setTimeout模拟setInterval](https://juejin.im/post/5ca81370f265da308c199fe7)

[你真的了解setTimeout和setInterVal吗](http://qingbob.com/difference-between-settimeout-setinterval/)
