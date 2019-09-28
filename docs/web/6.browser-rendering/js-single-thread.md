---
id: js-single-thread
title: 单线程js
sidebar_label: 单线程js
---

JS代码在一个线程中执行，即主线程，这意味着一次只能执行一行JS代码。需要注意的是，这一个线程还负责文档的生命周期，比如：layout 和 paint。因此，JS代码运行的时候将会阻碍其他工作：
![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/CHWd5i.png)
如果HTML解析器碰到`<script>`标签，会暂停解析HTML文档并加载、解析和执行JS代码。因为JS有可能通过document.write()修改文档，进而改变DOM结构（HTML标准的“解析模型”有一张图可以一目了然：http://t.cn/Ai9cupLc ）：
![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/3PxN7P.png)


所以HTML解析器必须停下来执行JavaScript，然后再恢复解析HTML。至于执行JavaScript的细节，大家可以关注V8团队相关的分享：http://t.cn/RB9qP51 。
