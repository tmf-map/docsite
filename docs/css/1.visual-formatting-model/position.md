---
title: 定位
---

import Img from '../../../src/components/Img';

## 五种定位

- **static**: 默认值。没有定位，不脱离文档流（忽略 top, bottom, left, right 或者 z-index 声明）。
- **absolute**: 相对于 static 定位以外的第一个祖先元素进行定位。脱离文档流。
- **fixed**: 相对于浏览器视窗进行定位。脱离文档流。
- **relative**: 生成相对定位的元素，相对于其正常位置进行定位，不脱离文档流。
- **sticky**: relative + fixed，但不脱离文档流，需要指明 top，表示滚动到相对于 static 定位以外的第一个祖先元素的位置，变成类似 fixed 效果。demo

:::tip

position 还可以是： `inherit`, `initial`, `unset`, 这是一般 CSS 属性都具有的。

:::

注意 sticky 的兼容性：

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/rXLik9.jpg'/>

## 相对定位

Demo DOM 结构：

<Img width="450" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/5ACJIp.jpg'/>

:::tip

`relative` 和 `sticky` 都未脱离文档流, [demo](https://codepen.io/muwenzi/pen/vqdxab)

:::

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/bTLccz.jpg'/>

可以观察到黄色部分在紧紧挨着，没有发生重叠，所以相对定位其实并没有脱离文档流。

<Img width="300" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/smSxF1.jpg'/>

## 绝对定位

:::tip

广义的绝对定位包括 `absolute` 和 `fixed` ，它们都会脱离常规流和文本流，[demo](https://codepen.io/muwenzi/pen/ydvMjV)

:::

<img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/EjTstb.jpg'/>

和 float 一样的是，旁边的盒子无视了蓝色 div 的存在，也是顶着左边边框定位。但是文本也无视了蓝色 div 的存在，顶着左边边框定位。

<Img width="300" align="center" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/PEdJlr.jpg'/>

:::caution

绝对定位可以让元素块状化。

:::

:::caution

绝对定位的盒子， `float` 会被重置为 `none`

:::
