---
title: 延迟加载
sidebar_label: 延迟加载
---

import Hint from '../../../src/components/Hint'
import Img from '../../../src/components/Img'

延迟加载即懒加载，对于一些占用带宽的资源比如图片，使用延时加载首屏外资源，而不是加载所有资源。延迟加载图像和视频时，可以减少初始页面加载时间、初始页面负载以及系统资源使用量，优化页面的性能。

## 为何要延迟加载？

因为直接加载可能会加载用户永远不会查看的内容， 进而导致一些问题：

- **浪费数据流量**。 如果使用无限流量网络，这可能还不是最坏的情况（不过，这些宝贵的带宽原本可以用来下载用户确实会查看的其他资源）。 但如果流量有限，加载用户永远不会查看的内容实际上是在浪费用户的金钱。
- **浪费处理时间、电池电量和其他系统资源**。 下载媒体资源后，浏览器必须将其解码，并在视窗中渲染其内容。
延迟加载图像和视频时，可以减少初始页面加载时间、初始页面负载以及系统资源使用量，所有这一切都会对性能产生积极影响。

## 延迟加载图像

### HTML 中的图像

#### (1) 使用 loading="lazy" 属性

Chrome76 开始 `<img>` 和 `iframe` 支持原生懒加载特性，无需任何其他的 JS 代码，仅仅一个属性即可：

```html
<img src="./example.jpg" width="600" loading="lazy" alt="image">
```

兼容性如下：

<Img w="750" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Teh7yU.png'/>

原生延迟加载的 5 个行为特性：

- Lazy loading 加载数量与屏幕高度有关，高度越小加载数量越少，但并不是线性关系。
- Lazy loading 加载数量与网速有关，网速越慢，加载数量越多，但并不是线性关系。
- Lazy loading 加载没有缓冲，滚动即会触发新的图片资源加载。
- Lazy loading 加载在窗口 resize 尺寸变化时候也会触发，例如屏幕高度从小变大的时候。
- Lazy loading 加载也有可能会先加载后面的图片资源，例如页面加载时滚动高度很高的时候。

与 JavaScript 有关的几个行为特征：

- 判断浏览器是否支持原生 loading，可以使用 `'loading' in HTMLImageElement.prototype` 判断。
- 获取 loading 属性值可以直接 `img.loading`。

<Hint type="tip">图片的延迟加载要想取得比较好的效果，最好先指定 `width="" height=""`。</Hint>

否则浏览器控制台会有如下警告：

```text
[Intervention] An <img> element was lazyloaded with loading=lazy, but had no dimensions specified. Specifying dimensions improves performance.
```

#### (2) 使用 Intersection Observer

现代浏览器支持通过 Intersection Observer API 来检查元素的可见性，这种方式的**性能和效率更好**。兼容性方面可以使用 [polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)，或者检测 Intersection Observer 不可用时回退到兼容性更好的旧方法。

<Img w="750" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/QP0bGN.png'/>

与依赖于各种事件处理程序的代码相比，Intersection Observer 更容易使用和阅读。这是因为开发者只需要注册一个 Observer 即可监视元素，而无需编写冗长的元素可见性检测代码。 然后，开发者只需要决定元素可见时需要做什么即可。 假设我们的延迟加载 `<img>` 元素采用以下基本标记模式：

```html
<img
  class="lazy"
  src="placeholder-image.jpg"
  data-src="image-to-lazy-load-1x.jpg"
  data-srcset="image-to-lazy-load-2x.jpg 2x, image-to-lazy-load-1x.jpg 1x"
  alt="I'm an image!"
/>
```

在此标记中，我们应关注三个相关部分：

- `class` 属性，这是我们在 JavaScript 中选择元素时要使用的类选择器。
- `src` 属性，引用页面最初加载时显示的占位符图像。
- `data-src` 和 `data-srcset` ([HTML5](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img))属性，属于占位符属性，其中包含元素进入视窗后要加载的图像的网址。

现在，我们来看看如何在 JavaScript 中使用 Intersection Observer，并通过以下标记模式延迟加载图像：

```js
document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to a more compatible method here
  }
});
```

在文档的 `DOMContentLoaded` 事件中，此脚本会查询 DOM，以获取类属性为 `lazy` 的所有 `<img>` 元素。 如果 Intersection Observer 可用，我们会创建一个新的 Observer，以在 `img.lazy` 元素进入视窗时运行回调。请参阅[此 CodePen](https://codepen.io/malchata/pen/YeMyrQ) 示例，查看代码的实际运行情况。

#### (3) 使用事件处理程序（兼容性最好的方法）

基于 `<img>` 标签，在初次加载时，不把图片 url 放在 `src` 属性中，而是自定义一个属性，例如 `data-src` 。然后检测 "scroll", "resize", "orientationchange" 等事件，判断图片是否进入了可视范围。如果进入，则将 `data-src` 的字段替换到 `src`，此时浏览器会自动去加载对应图片资源。

假定使用与上文相同的 HTML 结构，以下 JS 可提供延迟加载功能：

```js
document.addEventListener("DOMContentLoaded", function() {
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  let active = false;

  const lazyLoad = function() {
    if (active === false) {
      active = true;

      setTimeout(function() {
        lazyImages.forEach(function(lazyImage) {
          if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.srcset = lazyImage.dataset.srcset;
            lazyImage.classList.remove("lazy");

            lazyImages = lazyImages.filter(function(image) {
              return image !== lazyImage;
            });

            if (lazyImages.length === 0) {
              document.removeEventListener("scroll", lazyLoad);
              window.removeEventListener("resize", lazyLoad);
              window.removeEventListener("orientationchange", lazyLoad);
            }
          }
        });

        active = false;
      }, 200);
    }
  };

  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);
});
```

此代码在 scroll 事件处理程序中使用 `getBoundingClientRect` 来检查是否有任何 `img.lazy` 元素处于视窗中。 使用 `setTimeout` 调用来延迟处理，active 变量则包含处理状态，用于限制函数调用。 延迟加载图像时，这些元素随即从元素数组中移除。 当元素数组的 `length` 达到 0 时，滚动事件处理程序代码随即移除。 您可在[此 CodePen 示例](https://codepen.io/malchata/pen/mXoZGx)中，查看代码的实际运行情况。

虽然此代码几乎可在任何浏览器中正常运行，但却存在潜在的性能问题，即重复的 setTimeout 调用可能纯属浪费，即使其中的代码受限制，它们仍会运行。在此示例中，当文档滚动或窗口调整大小时，不管视窗中是否有图像，每 200 毫秒都会运行一次检查。 此外，跟踪尚未延迟加载的元素数量，以及取消绑定滚动事件处理程序的繁琐工作将由开发者来完成。

<Hint type="best">尽可能使用 Intersection Observer，如果有严格的兼容性要求，则回退到事件处理程序。</Hint>

### CSS 中的图像

虽然 `<img>` 标记是在网页上使用图像的最常见方式，但也可以通过 CSS `background-image` 属性（以及其他属性）来调用图像。 与加载时不考虑可见性的 `<img>` 元素不同，CSS 中的图像加载行为是建立在更多的推测之上。 构建文档和 CSS 对象模型以及渲染树后，浏览器会先检查 CSS 以何种方式应用于文档，再请求外部资源。 如果浏览器确定涉及某外部资源的 CSS 规则不适用于当前构建中的文档，则浏览器不会请求该资源。

#### 基本原理

这种推测性行为可用来延迟 CSS 中图像的加载，方法是使用 JavaScript 来确定元素在视窗内，然后将一个类应用于该元素，以应用调用背景图像的样式。如此即可在需要时而非初始加载时下载图像。

例如，假定一个元素中包含大型主角背景图片：

```html
<div class="lazy-background">
  <h1>Here's a hero heading to get your attention!</h1>
  <p>Here's hero copy to convince you to buy a thing!</p>
  <a href="/buy-a-thing">Buy a thing!</a>
</div>
```

`div.lazy-background` 元素通常包含由某些 CSS 调用的大型主角背景图片。 但是，在此延迟加载示例中，我们可以通过 `visible` 类来隔离 `div.lazy-background` 元素的 `background-image` 属性，而且我们会在元素进入视窗时对其添加这个类：

```css
.lazy-background {
  background-image: url("hero-placeholder.jpg"); /* Placeholder image */
}

.lazy-background.visible {
  background-image: url("hero.jpg"); /* The final image */
}
```

我们将从这里使用 JavaScript 来检查该元素是否在视窗内（通过 Intersection Observer 进行检查），如果在视窗内，则对 `div.lazy-background` 元素添加 `visible` 类以加载该图像：

```js
document.addEventListener("DOMContentLoaded", function() {
  var lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));

  if ("IntersectionObserver" in window) {
    let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          lazyBackgroundObserver.unobserve(entry.target);
        }
      });
    });

    lazyBackgrounds.forEach(function(lazyBackground) {
      lazyBackgroundObserver.observe(lazyBackground);
    });
  }
});
```

如上文所述，由于并非所有浏览器都支持 Intersection Observer，因此您需要确保提供回退方案或 polyfill。 请参阅[此 CodePen 演示](https://codepen.io/malchata/pen/wyLMpR)，查看代码的实际运行情况。

## 参考资料

1. [延迟加载图像和视频，By Jeremy Wagner](https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/?hl=zh-cn)
2. [浏览器IMG图片原生懒加载loading=”lazy”实践指南，作者：张鑫旭](https://www.zhangxinxu.com/wordpress/2019/09/native-img-loading-lazy/)
