---
id: DOMContentLoaded
title: DOMContentLoaded和load
sidebar_label: DOMContentLoaded和load
---

## DOMContentLoaded和load

- 当初始的 HTML 文档被完全加载和解析完成之后，**DOMContentLoaded 事件**被触发，而无需等待样式表、图像和子框架的完成加载。

- **load事件**，当整个页面加载后会触发该事件，包括所有相关资源，如样式表、图像。

在下图中，在控制台中展示了DOMContentLoaded、load的执行时间，其中蓝色线代表的是DOMContentLoaded，红色的线代表load的时间。

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/L5hJR0.png)

通过这个[链接](https://testdrive-archive.azurewebsites.net/HTML5/DOMContentLoaded/Default.html)，可以直观感受下两者的不同。

## 两者的意义

对于load来说，它代表了访问页面所需要的所有资源已经全部加载完毕。

但是如果拿load事件来衡量网页加载速度其实并不准确，因为我们访问网页时可能并不需要文档的所有信息。打个比方，对于官方文档来说，你所需要关注的可能只有文档的文字是否已经加载完毕，并不需要等待页面上广告和图片的加载。而DOMContentLoaded则是来衡量网页从白屏到出现内容所需要的时间。

## JS脚本与DOMContentLoaded

DOMContentLoaded事件的触发代表**HTML文档被加载和解析完成**，由[页面渲染](https://thinkbucket.github.io/docsite/docs/web/6.browser-rendering/page-rendering)这一节可知，JS脚本的加载、解析和执行会会影响DOM树的构建，那么两者之间到底是什么关系呢？本节将对两者的关系进行详细的介绍。

## 1. JS脚本都在CSS引入前

如果CSS的引入都在JS脚本后，DOMContentLoaded事件的触发不需要等到css加载完毕。

测试代码：

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>JS脚本都在CSS引入前</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        console.log('DOMContentLoaded');
      })
    </script>
    <script>
      console.log('hello world');
    </script>

    <link href="https://cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.css" rel="stylesheet">

  </head>
  <body>
  </body>
</html>
```
测试截图：

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/2ysZtE.png)

## 2. 存在JS脚本在CSS引入后

如果存在JS脚本在CSS引入后，那么该脚本的执行必须等到CSSOM树构建完才能执行，而DOM树的构建会因为js脚本加载或执行而暂停，直到脚本执行完，才会继续构建DOM树。所以DOMContentLoaded事件的触发要等待CSSOM构建完后触发。

关于GUI渲染线程与JS线程之间的关系可以参考：[浏览器内核](https://thinkbucket.github.io/docsite/docs/web/13.rendering-engine/rendering-engine)

测试代码：

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>JS脚本都在CSS引入前</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        console.log('DOMContentLoaded');
      })
    </script>
    <link href="https://cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.css" rel="stylesheet">
  </head>
  <body>
  </body>
  <script>
    console.log('hello world');
  </script>
</html>
```

测试截图：

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/cdZQTk.png)

## async和defer与DOMContentLoaded

由[async和defer](https://thinkbucket.github.io/docsite/docs/web/6.browser-rendering/async-defer)这一节可知，当外联的script添加了async或defer时，会影响页面DOM树的构建。那么这两个属性和DOMContentLoaded是什么关系呢？

### 1. async和DOMContentLoaded

对于设置了async属性的外链JS脚本，DOMContentLoaded事件的触发无需等待样式表加载，当DOM构建完成后就可以触发。

由[async和defer](https://thinkbucket.github.io/docsite/docs/web/6.browser-rendering/async-defer)中可知，设置async的脚本加载不影响DOM的构建，执行的时候会影响。也就是说如果DOM的构建快于JS脚本的加载速度，那么DOMContentLoaded和外联脚本无关。如果DOM构建的速度慢于JS脚本的加载时间，那脚本的执行会影响DOMContentLoaded的触发时间。

测试脚本：

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>css阻塞</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        console.log('DOMContentLoaded');
      })
    </script>
    <link href="https://cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/lodash.js/4.17.15/lodash.core.js" async></script>
  </head>
  <body>
  </body>
</html>

```
测试截图：
![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/bh7fCd.png)

### 2. defer和DOMContentLoaded
> defer 这个布尔属性被设定用来通知浏览器该脚本将在文档完成解析后，触发 DOMContentLoaded 事件前执行

从[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script)上可以看出,当defer对应的脚本执行完成且DOM构建完成后，DOMContentLoaded事件触发。

测试代码：

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>css阻塞</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        console.log('DOMContentLoaded');
      })
    </script>
    <link href="https://cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/lodash.js/4.17.15/lodash.core.js" defer></script>
  </head>
  <body>
  </body>
</html>
```

测试截图：

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/uY4AEb.png)

## 参考链接

[参考链接1](https://juejin.im/post/5b88ddca6fb9a019c7717096#heading-0)

[参考链接2](https://zhuanlan.zhihu.com/p/25876048)
