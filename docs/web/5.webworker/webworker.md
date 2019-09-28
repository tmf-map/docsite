---
id: webworker
title: webWorker
sidebar_label: webWorker
---

Web Woker是浏览器 Web API 之一，由于JavaScript 语言采用的是单线程模型，也就是说，所有任务只能在一个线程上完成，一次只能做一件事。前面的任务没做完，后面的任务只能等着。随着电脑计算能力的增强，尤其是多核 CPU 的出现，单线程带来很大的不便，无法充分发挥计算机的计算能力。

Web Worker 的作用，就是为 JavaScript 创造**多线程**环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。**在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程**。这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。

Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。这样有利于随时响应主线程的通信。但是，这也造成了 Worker 比较耗费资源，不应该过度使用，**而且一旦使用完毕，就应该关闭**。

与 Node.js 中 [cluster](https://eggjs.org/zh-cn/core/cluster-and-ipc.html) 模块 以及现在还是 Stability: 1 - Experimental 状态的 [worker_threads](https://nodejs.org/api/worker_threads.html) 有什么关系？
这三者都涉及到 worker 的概念，woker_threads 差不多是 node版的web worker

CPU核数即进程利用---cluster：master，worker
线程利用---web worker / worker_threads

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/FdcUi4.png)

https://caniuse.com/#feat=webworkers
https://zhuanlan.zhihu.com/p/38393122
https://nodejs.org/api/worker_threads.html#worker_threads_class_worker
https://nodejs.org/api/cluster.html#cluster_class_worker
https://eggjs.org/zh-cn/core/cluster-and-ipc.html
http://www.ruanyifeng.com/blog/2018/07/web-worker.html
