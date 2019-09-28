---
id: DOMContentLoaded
title: DOMContentLoaded和load
sidebar_label: DOMContentLoaded和load
---

当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载。

load整个页面加载后会触发该事件，包括所有相关资源，如样式表、图像。 

关于DOMContentLoaded 事件，事件的执行发生在其所在script脚本的执行过程中，而JS的执行需要等待script标签之前的样式表的加载。换句话说JS中DOMContentLoaded 事件的执行需要等待script标签之前的CSSOM的构建。

在下图中，在控制台中展示了DOMContentLoaded、load的执行时间，其中蓝色线代表的是DOMContentLoaded，红色的线代表load的时间。

通过这个[链接](https://testdrive-archive.azurewebsites.net/HTML5/DOMContentLoaded/Default.html)，可以直观感受下两者的不同。

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/BpF56S.png)
