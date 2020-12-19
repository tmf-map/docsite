---
title: 浏览器窗口
---

## window 的大小

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/kqJMh6.jpg'/>

### innerWith/innerHeight

`window.innerHeight` 和 `window.innerWidth` 属性，返回网页在当前窗口中可见部分的高度和宽度，即“视窗”（viewport）的大小（单位像素）。这两个属性只读。

用户放大网页的时候（比如将网页从 100%的大小放大为 200%），这两个属性会变小。因为这时网页的像素大小不变（比如宽度还是 960 像素），只是每个像素占据的屏幕空间变大了，因为可见部分（视口）就变小了。

:::caution

这两个属性值包括滚动条的高度和宽度。

:::

### outerWith/outerHeight

`window.outerWidth` 和 `window.outerHeight`属性返回浏览器窗口的高度和宽度，包括浏览器菜单和边框（单位像素）。这两个属性只读。

:::tip

outerWith/outerHeight 即为浏览器窗口的宽高。

:::

## window 的位置

以下属性返回 window 对象的位置信息和大小信息。

### screenX/screenY

`window.screenX` 和 `window.screenY` 属性，返回浏览器窗口（outerWith/outerHeight）左上角相对于当前屏幕左上角的水平距离和垂直距离（单位像素）。这两个属性只读。

<Img width="300" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/154ED23.png'/>

蓝色盒子代表浏览器，而黑色盒子代表整个屏幕，在 macOS 下，Y 的距离是包含上部的任务栏的，所以该属性是距离到屏幕边缘的距离。

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/6n2feo.png'/>

### pageXOffset/pageYOffset

`window.pageXOffset` 属性和 `window.pageYOffset` 属性，是 `window.scrollX` 和 `window.scrollY` 别名。

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/P110eW.png'/>

### screenLeft/screenTop

`window.screenLeft` 和 `window.screenTop` 属性返回窗口相对于屏幕的 X 和 Y 坐标。

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/HV11sN.png'/>

### window.moveTo()

`window.moveTo()`方法用于移动浏览器窗口到指定位置。它接受两个参数，分别是窗口左上角距离屏幕左上角的水平距离和垂直距离，单位为像素。

```javascript
window.moveTo(100, 200);
```

上面代码将窗口移动到屏幕`(100, 200)`的位置。

### window.moveBy()

`window.moveBy`方法将窗口移动到一个相对位置。它接受两个参数，分布是窗口左上角向右移动的水平距离和向下移动的垂直距离，单位为像素。

```javascript
window.moveBy(25, 50);
```

上面代码将窗口向右移动 25 像素、向下移动 50 像素。

:::caution

为了防止有人滥用这两个方法，随意移动用户的窗口，目前只有一种情况，浏览器允许用脚本移动窗口：该窗口是用 `window.open` 方法新建的，并且它所在的 Tab 页是当前窗口里面唯一的。除此以外的情况，使用上面两个方法都是无效的。

:::

## window 的缩放

### window.resizeTo()

`window.resizeTo()`方法用于缩放窗口到指定大小。

它接受两个参数，第一个是缩放后的窗口宽度（`outerWidth`属性，包含滚动条、标题栏等等），第二个是缩放后的窗口高度（`outerHeight`属性）。

```javascript
window.resizeTo(window.screen.availWidth / 2, window.screen.availHeight / 2);
```

上面代码将当前窗口缩放到，屏幕可用区域的一半宽度和高度。

### window.resizeBy()

- `window.resizeBy()`方法用于缩放窗口，它按照相对的量（加或减）缩放。
- `window.resizeTo()`需要给出缩放后的绝对大小。

它接受两个参数，第一个是水平缩放的量，第二个是垂直缩放的量，单位都是像素。

```javascript
window.resizeBy(-200, -200);
```

上面的代码将当前窗口的宽度和高度，都缩小 200 像素。

## window 的滚动

### scrollX/scrollY

`window.scrollX` 属性返回页面的水平滚动距离，`window.scrollY` 属性返回页面的垂直滚动距离，单位都为像素。这两个属性只读。

:::caution

这两个属性的返回值不是整数，而是双精度浮点数。如果页面没有滚动，它们的值就是 0。

:::

举例来说，如果用户向下拉动了垂直滚动条 75 像素，那么 window.pageYOffset 就是 75 左右。用户水平向右拉动水平滚动条 200 像素，window.pageXOffset 就是 200 左右。

```js
if (window.scrollY < 75) {
  window.scroll(0, 75);
}
```

上面代码中，如果页面向下滚动的距离小于 75 像素，那么页面向下滚动 75 像素。

### window.scrollTo()

`window.scrollTo`方法用于将文档滚动到指定位置。它接受两个参数，表示滚动后位于窗口左上角的页面坐标。

```javascript
window.scrollTo(x - coord, y - coord);
```

它也可以接受一个配置对象作为参数。

```javascript
window.scrollTo(options);
```

配置对象`options`有三个属性。

- `top`：滚动后页面左上角的垂直坐标，即 y 坐标。
- `left`：滚动后页面左上角的水平坐标，即 x 坐标。
- `behavior`：字符串，表示滚动的方式，有三个可能值（`smooth`、`instant`、`auto`），默认值为`auto`。

```javascript
window.scrollTo({
  top: 1000,
  behavior: 'smooth'
});
```

### window.scroll()

`window.scroll()`方法是`window.scrollTo()`方法的别名。

### window.scrollBy()

`window.scrollBy()`方法用于将网页滚动指定距离（单位像素）。它接受两个参数：水平向右滚动的像素，垂直向下滚动的像素。

```javascript
window.scrollBy(0, window.innerHeight);
```

上面代码用于将网页向下滚动一屏。

如果不是要滚动整个文档，而是要滚动某个元素，可以使用下面三个属性和方法。

- Element.scrollTop
- Element.scrollLeft
- Element.scrollIntoView()

## window 的开启关闭和停止

### window.open()

`window.open`方法用于新建另一个浏览器窗口，类似于浏览器菜单的新建窗口选项。它会返回新窗口的引用，如果无法新建窗口，则返回`null`。

```javascript
var popup = window.open('somefile.html');
```

上面代码会让浏览器弹出一个新建窗口，网址是当前域名下的`somefile.html`。

`open`方法一共可以接受三个参数。

```javascript
window.open(url, windowName, [windowFeatures]);
```

- `url`：字符串，表示新窗口的网址。如果省略，默认网址就是`about:blank`。
- `windowName`：字符串，表示新窗口的名字。如果该名字的窗口已经存在，则占用该窗口，不再新建窗口。如果省略，就默认使用`_blank`，表示新建一个没有名字的窗口。
- `windowFeatures`：字符串，内容为逗号分隔的键值对（详见下文），表示新窗口的参数，比如有没有提示栏、工具条等等。如果省略，则默认打开一个完整 UI 的新窗口。如果新建的是一个已经存在的窗口，则该参数不起作用，浏览器沿用以前窗口的参数。

下面是一个例子。

```javascript
var popup = window.open(
  'somepage.html',
  'DefinitionsWindows',
  'height=200,width=200,location=no,status=yes,resizable=yes,scrollbars=yes'
);
```

上面代码表示，打开的新窗口高度和宽度都为 200 像素，没有地址栏和滚动条，但有状态栏，允许用户调整大小。

第三个参数可以设定如下属性。

- left：新窗口距离屏幕最左边的距离（单位像素）。注意，新窗口必须是可见的，不能设置在屏幕以外的位置。
- top：新窗口距离屏幕最顶部的距离（单位像素）。
- height：新窗口内容区域的高度（单位像素），不得小于 100。
- width：新窗口内容区域的宽度（单位像素），不得小于 100。
- outerHeight：整个浏览器窗口的高度（单位像素），不得小于 100。
- outerWidth：整个浏览器窗口的宽度（单位像素），不得小于 100。
- menubar：是否显示菜单栏。
- toolbar：是否显示工具栏。
- location：是否显示地址栏。
- personalbar：是否显示用户自己安装的工具栏。
- status：是否显示状态栏。
- dependent：是否依赖父窗口。如果依赖，那么父窗口最小化，该窗口也最小化；父窗口关闭，该窗口也关闭。
- minimizable：是否有最小化按钮，前提是`dialog=yes`。
- noopener：新窗口将与父窗口切断联系，即新窗口的`window.opener`属性返回`null`，父窗口的`window.open()`方法也返回`null`。
- resizable：新窗口是否可以调节大小。
- scrollbars：是否允许新窗口出现滚动条。
- dialog：新窗口标题栏是否出现最大化、最小化、恢复原始大小的控件。
- titlebar：新窗口是否显示标题栏。
- alwaysRaised：是否显示在所有窗口的顶部。
- alwaysLowered：是否显示在父窗口的底下。
- close：新窗口是否显示关闭按钮。

对于那些可以打开和关闭的属性，设为`yes`或`1`或不设任何值就表示打开，比如`status=yes`、`status=1`、`status`都会得到同样的结果。如果想设为关闭，不用写`no`，而是直接省略这个属性即可。也就是说，如果在第三个参数中设置了一部分属性，其他没有被设置的`yes/no`属性都会被设成`no`，只有`titlebar`和关闭按钮除外（它们的值默认为`yes`）。

另外，`open`方法的第二个参数虽然可以指定已经存在的窗口，但是不等于可以任意控制其他窗口。为了防止被不相干的窗口控制，浏览器只有在两个窗口同源，或者目标窗口被当前网页打开的情况下，才允许`open`方法指向该窗口。

`window.open`方法返回新窗口的引用。

```javascript
var windowB = window.open('windowB.html', 'WindowB');
windowB.window.name; // "WindowB"
```

注意，如果新窗口和父窗口不是同源的（即不在同一个域），它们彼此不能窗口对象获取对方的内部属性。

下面是另一个例子。

```javascript
var w = window.open();
console.log('已经打开新窗口');
w.location = 'http://example.com';
```

上面代码先打开一个新窗口，然后在该窗口弹出一个对话框，再将网址导向`example.com`。

由于`open`这个方法很容易被滥用，许多浏览器默认都不允许脚本自动新建窗口。只允许在用户点击链接或按钮时，脚本做出反应，弹出新窗口。因此，有必要检查一下打开新窗口是否成功。

```javascript
var popup = window.open();
if (popup === null) {
  // 新建窗口失败
}
```

### window.close()

`window.close`方法用于关闭当前窗口，一般只用来关闭`window.open`方法新建的窗口。

```javascript
popup.close();
```

该方法只对顶层窗口有效，`iframe`框架之中的窗口使用该方法无效。

### window.stop()

`window.stop()`方法完全等同于单击浏览器的停止按钮，会停止加载图像、视频等正在或等待加载的对象。

```javascript
window.stop();
```

## window.screen

screen 对象表示当前窗口所在的屏幕，提供显示设备的信息。`window.screen`属性指向这个对象。

该对象有下面的属性。

- `screen.height`：浏览器窗口所在的屏幕的高度（单位像素）。除非调整显示器的分辨率，否则这个值可以看作常量，不会发生变化。显示器的分辨率与浏览器设置无关，缩放网页并不会改变分辨率。
- `screen.width`：浏览器窗口所在的屏幕的宽度（单位像素）。
- `screen.availHeight`：浏览器窗口可用的屏幕高度（单位像素）。因为部分空间可能不可用，比如系统的任务栏或者 Mac 系统屏幕底部的 Dock 区，这个属性等于`height`减去那些被系统组件的高度。
- `screen.availWidth`：浏览器窗口可用的屏幕宽度（单位像素）。
- `screen.pixelDepth`：整数，表示屏幕的色彩位数，比如`24`表示屏幕提供 24 位色彩。
- `screen.colorDepth`：`screen.pixelDepth`的别名。严格地说，colorDepth 表示应用程序的颜色深度，pixelDepth 表示屏幕的颜色深度，绝大多数情况下，它们都是同一件事。
- `screen.orientation`：返回一个对象，表示屏幕的方向。该对象的`type`属性是一个字符串，表示屏幕的具体方向，`landscape-primary`表示横放，`landscape-secondary`表示颠倒的横放，`portrait-primary`表示竖放，`portrait-secondary`。

下面是`screen.orientation`的例子。

```js
window.screen.orientation;
// { angle: 0, type: "landscape-primary", onchange: null }
```

下面的例子保证屏幕分辨率大于 1024 x 768。

```js
if (window.screen.width >= 1024 && window.screen.height >= 768) {
  // 分辨率不低于 1024x768
}
```

下面是根据屏幕的宽度，将用户导向不同网页的代码。

```js
if (screen.width <= 800 && screen.height <= 600) {
  window.location.replace('small.html');
} else {
  window.location.replace('wide.html');
}
```

## 参考资料

1. [JavaScript 标准参考教程（alpha）：window 对象，作者：阮一峰](http://javascript.ruanyifeng.com/bom/window.html)
2. [JavaScript 中的各种 XY 定位属性以及元素宽高属性，作者：zhangzhengyi12](https://blog.yinode.tech/articles/2019/01/21/1567739719667.html)
