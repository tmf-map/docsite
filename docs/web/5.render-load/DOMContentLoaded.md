---
id: DOMContentLoaded
title: DOMContentLoaded & load
---

## DOMContentLoaded 和 load

- 当初始的 HTML 文档被完全加载和解析完成之后，**DOMContentLoaded 事件**被触发，而无需等待样式表、图像和子框架的完成加载。

- **load 事件**，当整个页面加载后会触发该事件，包括所有相关资源，如样式表、图像。

在下图中，在控制台中展示了 DOMContentLoaded、load 的执行时间，其中蓝色线代表的是 DOMContentLoaded，红色的线代表 load 的时间。

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/L5hJR0.png)

通过这个[链接](https://testdrive-archive.azurewebsites.net/HTML5/DOMContentLoaded/Default.html)，可以直观感受下两者的不同。

## 两者的意义

对于 load 来说，它代表了访问页面所需要的所有资源已经全部加载完毕。

但是如果拿 load 事件来衡量网页加载速度其实并不准确，因为我们访问网页时可能并不需要文档的所有信息。打个比方，对于官方文档来说，你所需要关注的可能只有文档的文字是否已经加载完毕，并不需要等待页面上广告和图片的加载。而 DOMContentLoaded 则是来衡量网页从白屏到出现内容所需要的时间。

## JS 脚本与 DOMContentLoaded

DOMContentLoaded 事件的触发代表**HTML 文档被加载和解析完成**，由[页面渲染](https://thinkbucket.github.io/docsite/docs/web/6.browser-rendering/page-rendering)这一节可知，JS 脚本的加载、解析和执行会会影响 DOM 树的构建，那么两者之间到底是什么关系呢？本节将对两者的关系进行详细的介绍。

## 1. JS 脚本都在 CSS 引入前

如果 CSS 的引入都在 JS 脚本后，DOMContentLoaded 事件的触发不需要等到 css 加载完毕。

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

## 2. 存在 JS 脚本在 CSS 引入后

如果存在 JS 脚本在 CSS 引入后，那么该脚本的执行必须等到 CSSOM 树构建完才能执行，而 DOM 树的构建会因为 js 脚本加载或执行而暂停，直到脚本执行完，才会继续构建 DOM 树。所以 DOMContentLoaded 事件的触发要等待 CSSOM 构建完后触发。

关于 GUI 渲染线程与 JS 线程之间的关系可以参考：[浏览器内核](https://thinkbucket.github.io/docsite/docs/web/13.rendering-engine/rendering-engine)

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

## async 和 defer 与 DOMContentLoaded

由[async 和 defer](https://thinkbucket.github.io/docsite/docs/web/6.browser-rendering/async-defer)这一节可知，当外联的 script 添加了 async 或 defer 时，会影响页面 DOM 树的构建。那么这两个属性和 DOMContentLoaded 是什么关系呢？

### 1. async 和 DOMContentLoaded

对于设置了 async 属性的外链 JS 脚本，DOMContentLoaded 事件的触发无需等待样式表加载，当 DOM 构建完成后就可以触发。

由[async 和 defer](https://thinkbucket.github.io/docsite/docs/web/6.browser-rendering/async-defer)中可知，设置 async 的脚本加载不影响 DOM 的构建，执行的时候会影响。也就是说如果 DOM 的构建快于 JS 脚本的加载速度，那么 DOMContentLoaded 和外联脚本无关。如果 DOM 构建的速度慢于 JS 脚本的加载时间，那脚本的执行会影响 DOMContentLoaded 的触发时间。

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

测试截图： ![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/bh7fCd.png)

### 2. defer 和 DOMContentLoaded

> defer 这个布尔属性被设定用来通知浏览器该脚本将在文档完成解析后，触发 DOMContentLoaded 事件前执行

从[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script)上可以看出,当 defer 对应的脚本执行完成且 DOM 构建完成后，DOMContentLoaded 事件触发。

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

## 参考资料

1. [css 加载会造成阻塞吗？by 可乐好喝不胖](https://juejin.im/post/5b88ddca6fb9a019c7717096#heading-0)
2. [你不知道的 DOMContentLoaded by 编译青春](https://zhuanlan.zhihu.com/p/25876048)
