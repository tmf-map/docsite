---
id: principle
title: js动画原理
sidebar_label: js动画原理
---
动画效果可以通过两种方式来实现：一种是通过JS间接的操作CSS，每隔几秒执行一次，另外一种是利用纯CSS实现，该方法在CSS3成熟后广泛应用。这里主要讲JS里面的动画:

JS动画用的最多的3个api就是：
1. setInterval() / clearInterval()
2. setTimeout() / clearTimeout()
3. requestAnimationFrame()
