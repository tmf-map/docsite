---
title: 图片
sidebar_label: 图片
---

## `<img />`

### `src="url"`

### `alt="text"`

### `height=""`

### `width=""`

### `border=""`

### `vspace=""`

### `hspace=""`

## `<map>...</map>`

`<map>`属性与 `<area>` 属性一起使用来定义一个图像映射(一个可点击的链接区域)。

### `name=""`

name 属性给 map 一个名字用来查询，这个属性是必须的，值必须不能为空并且不能带空格。name 属性不准与同文档中其他 map 元素的值相同，如果 id 属性也被添加，name 属性和 id 属性的值必须相同。

## `<area />`

## 示例

```jsx live
<>
  <img
    src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/9r8L1g.jpg"
    alt="Planets"
    usemap="#planetmap"
  />
  <map name="planetmap">
    <area
      shape="rect"
      coords="0,0,110,260"
      href="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/j5tDJS.jpg"
      target="_blank"
      alt="Sun"
    />
    <area
      shape="circle"
      coords="129,161,10"
      href="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/YFhLoI.jpg"
      target="_blank"
      alt="Mercury"
    />
    <area
      shape="circle"
      coords="180,139,14"
      href="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/eHsJgW.jpg"
      target="_blank"
      alt="Venus"
    />
  </map>
</>
```
