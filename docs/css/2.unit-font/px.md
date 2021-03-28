---
title: px
---

## 物理像素与独立像素

px 像素（Pixel），相对长度单位。本来 px 还是很好理解的，但是由于 Retina 屏让 px 变得扑所迷离，也是在移动端 Web 开发的时候不得不跨越的一个坎。我们先了解一下两个概念：

- **物理像素(实际像素)**：即小格子，是各个厂家所宣称的屏幕分辨率，比如：2880x1800，Retina 屏所说的像素就是物理实际像素。
- **独立像素**：即大格子，是 JS/CSS 所认为的像素
  - 非 Retina 屏 `独立像素 = 物理像素`
  - Retina 屏 `独立像素 < 物理像素`

打开 Chrome 的控制台，切换到移动端设备模式，红色箭头所代表的就是**独立像素**：

<Img w="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Ujio7U.png' />

## dpr

dpr(device pixel ratio) 即像素比，在 CSS 中 px 包括 JS 中比如 `window.screen.width` 的数值代表的是独立像素（大格子）。window 对象有一个 **devicePixelRatio** 属性，即像素比(可以理解称是一种像素密度)，定义为：

```js
window.devicePixelRatio = 物理像素(小格子) / 独立像素(大格子);
```

## ppi

ppi(pixels per inch) 即像素密度，表示屏幕每英寸有多少个物理像素，是手机厂家宣传的重点之一，通常会直接给出数值。我们也可以通过屏幕像素，和对角线长度估算出来。

:::tip

屏幕尺寸指屏幕的对角线长度，单位是英寸（inch），1 英寸 = 2.54 厘米。

:::

普通用户比较关心屏幕像素、对角线长度、ppi。屏幕对角线的物理长度，决定了屏幕实际有多大。而屏幕像素，决定了屏幕看起来的细腻程度。相同的物理尺寸上，像素越多，屏幕自然越细腻。屏幕细腻程度可以用 ppi 衡量。

比如 iPhone6 Plus 是 5.5 英寸，分辨率（也就是物理像素）是 1920\*1080 像素，那么它的 ppi 为：

```text
ppi = √(19202+10802) / 5.5 ≈ 401ppi
```

也就是说它每英寸可以显示 440 个物理像素点。

:::tip

dpi 是 dots per inch, 不论是 dpi 还是 ppi，实际都是一种换算的概念，即将图片承载的信息换算为现实中的图片（即人眼能实际看到的图像）。dpi 和 ppi 的区别在于换算的途径不同，dpi 面向的是打印机，而 ppi 面向的是屏幕。更多请参考：https://www.jianshu.com/p/aaa9fafdbc20

<Img w="350" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/pbQ4Nm.png' />

:::

## 移动端 1px 问题

当我们在写页面的时候设计师会提出这样一个要求：页面不管怎么缩放都可以，但是 1px 的边框必须给我是 1px，不能缩放。我们可能会觉得这个问题很奇怪，心里想大不了直接给 `border: 1px` 不就行了。可这个时候设计师又会说：我要的是手机上的实际像素 1px！

那这个时候就需要了解到这个知识点：何为 Retina(视网膜)屏幕？啥是设备像素比 dpr(device pixel ratio)？灵魂画师上图说话：

<Img w="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Si01bB.png' />

我们可以发现，在同样的大小下，2dpr 的屏幕是普通屏幕像素点的 4 倍，3dpr 的屏幕是普通屏幕像素点的 9 倍。这就是 Retina 屏幕用了都说好的原因（清晰）。而设计师要的实际 1px 的边框就是下面这种情况：

<Img w="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/b5Lcuv.png' />

说到这里我们再看一下设计师的问题：“我要的是手机上的实际像素 1px”。如果我们获取到的视觉稿大部分是 iPhone6 的，但我们看到的尺寸一般是双倍大小的。

首先我们要明白为什么设计稿的尺寸会是双倍大小：因为 iPhone6 这种屏幕属于高清屏，也即是 dpr 比较大，所以显示的像素较为清晰。一般手机的 dpr 是 1，iPhone4/5/6 这种高清屏是 2，iPhone6s plus 这种高清屏是 3，可以通过 JS 的 `window.devicePixelRatio` 获取到当前设备的 dpr，所以 iPhone6 给的视觉稿大小是（375\*2）750×1334 了。

双倍大小的设计稿就会造成一个问题：我们测量出设计稿的某一个元素的边框是 1px，因为设计稿是放大 2 倍的，按照 rem 适配的话，最终会在 dpr 为 2 的屏幕上显示 0.5px，也就是按照设计师所说要实现手机上实际像素也是 1px，

- 一般手机：1px
- iPhone6: 0.5px

这下我们终于明白设计师要的是啥效果了，那我们怎么解决呢？可以阅读后面 [rem](/docs/css/2.unit-font/rem) 的部分。

[这个例子](https://codepen.io/muwenzi/pen/LKezGK)，可以在 mac 上的 Chrome，Safari 以及 iPhone 上微信，Chrome，Safari 上分别观察效果，注意不同 dpr 的设备显示效果是不一样的，以 dpr 为 2 的 mac 为例，Chrome 是不支持 0.5px 显示的，Safari 可以。

<Img w="600" legend="图：不同像素在 mac 上的表现" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/oeIjp8.png' />

:::tip

- Safari: ≤0.5px 取最小值 0.5px，其他都是以 0.5px 为一个单位进行截断，所以 0.5-1 之间的也是 0.5px。
- Chrome: ≤1px 取最小值 1px，其他都是以 1px 为一个单位进行四舍五入。

:::

iPhone 上由于都是用的苹果的 webview 渲染的，故表现得较为一致。

## 参考资料

1. [HTML - 移动端 meta viewport, by liuxuan](https://www.jianshu.com/p/641589d0d975)
2. [十分钟快速理解 DPI 和 PPI，不再傻傻分不清！, by 卡米雷特](https://www.jianshu.com/p/aaa9fafdbc20)
