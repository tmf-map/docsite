---
title: 'vh/vw'
---

## viewport

### 基本概念

**视区**在有一些文章中也会翻译成“视口”，即网页中视线可见区域，用户通过它来浏览网页。当网页过长时，视区只能显示局部网页的时候，网页要可以滚动浏览。图中绿色部分即视区范围：

<Img legend="图：viewport 区域和其他区域对比" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/kqJMh6.jpg'/>

### 移动端

我们在做响应式布局的时候，有时要考虑到适配移动端的屏幕，最常见的一个操作就是把下面这段代码复制到 `<head>` 标签中：

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
/>
```

该 `<meta>` 标签的作用是让当前 viewport 的宽度等于设备的宽度，同时不允许用户手动缩放。也许允不允许用户缩放不同的网站有不同的要求，但让 viewport 的宽度等于设备的宽度，这个应该是大家都想要的效果，如果你不这样的设定的话，那就会使用那个比屏幕宽的默认 viewport，也就是说会出现横向滚动条。

meta viewport 标签首先是由苹果公司在其 Safari 浏览器中引入的，目的就是解决移动设备的 viewport 问题。后来安卓以及各大浏览器厂商也都纷纷效仿，引入对 meta viewport 的支持，事实也证明这个东西还是非常有用的。

在苹果的规范中，meta viewport 有 6 个属性，如下：

| Name | Value | Description |
| --- | --- | --- |
| width | 正整数或 device-width | 定义视区的宽度，单位为像素 |
| height | 正整数或 device-height | 定义视区的高度，单位为像素 |
| initial-scale | [0.0-10.0] | 定义初始缩放值 |
| minimum-scale | [0.0-10.0] | 定义缩小最小比例，它必须小于或等于 maximum-scale 设置 |
| maximum-scale | [0.0-10.0] | 定义放大最大比例，它必须大于或等于 minimum-scale 设置 |
| user-scalable | yes/no | 定义是否允许用户手动缩放页面，默认值 yes |

## vh/vw

`v` 指 viewport，那 vh/vw 指的是什么？[在线 Demo](https://www.zhangxinxu.com/study/201209/vw-vh-to-pixel.html)

```text
vw = window.innerWidth
vh = window.innerHeight
```

- **vw**: 1vw = 视区宽度的 1%
- **vh**: 1vh = 视区高度的 1%
- **vmin**: 选取 vw 和 vh 中最小的那个
- **vmax**: 选取 vw 和 vh 中最大的那个

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/4h4phi.jpg'/>

## calc()

用于动态计算长度值。

- 运算符前后都需要保留一个空格，例如：`width: calc(100% - 10px)`，%不一定在前；
- 任何长度值都可以使用 `calc()` 函数进行计算；
- `calc()` 函数支持 `+`, `-`, `*`, `/` 运算；
- `calc()` 函数使用标准的数学运算优先级规则；

:::caution

`+`, `-` 运算符左右要有空格，否则会报 `Invalid property value`，不会生效，但 `*`, `/` 不受此限制。

:::

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/ej1QJV.jpg'/>

## 参考资料

1. [移动前端开发之 viewport 的深入理解, by 无双](www.cnblogs.com/2050/p/3877280.html)
2. [移动前端第一弹：viewport 详解, by 杜瑶（@doyoe）](http://blog.doyoe.com/2015/10/13/mobile/%E7%A7%BB%E5%8A%A8%E5%89%8D%E7%AB%AF%E7%AC%AC%E4%B8%80%E5%BC%B9%EF%BC%9Aviewport%E8%AF%A6%E8%A7%A3/)
3. [HTML - 移动端 meta viewport, by liuxuan](https://www.jianshu.com/p/641589d0d975)
4. [什么是 Viewport Meta（width 详解）及在手机上的应用, by Gideon](https://justcode.ikeepstudying.com/2016/07/%E4%BB%80%E4%B9%88%E6%98%AFviewport-meta%EF%BC%88width%E8%AF%A6%E8%A7%A3%EF%BC%89%E5%8F%8A%E5%9C%A8%E6%89%8B%E6%9C%BA%E4%B8%8A%E7%9A%84%E5%BA%94%E7%94%A8/)
5. [移动端适配之三：使用 meta 标签设置 viewport, by 程序员不止程序猿](https://segmentfault.com/a/1190000020218602)
