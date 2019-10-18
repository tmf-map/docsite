---
id: communication
title: 通信
sidebar_label: 通信
---

import Hint from '../../../src/components/Hint'

![组件之间的关系图谱](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/io9G0J.jpg)

## 简单通信

### 父传子

通讯是单向的，数据必须是由一方传到另一方。在 React 中，父组件可以向子组件通过传 props 的方式，向子组件进行通讯。

[demo](https://jsbin.com/rixofod/1/edit?html,js,output)

### 子传父

子组件向父组件通信，同样也需要父组件向子组件传递 props 进行通信，只是父组件传递的是**作用域为父组件自身的函数**，子组件调用该函数，将子组件想要传递的信息作为参数，传递到父组件的作用域中。

[demo](https://jsbin.com/gulebam/2/edit?html,js,output)

## 复杂通信

复杂通信包括 **多级嵌套组件通信** 和 **兄弟组件通信**，通信的方式基本上差不多，项目里面主要是三种方式：

### 方式一：Redux 统一管理状态

在 `container` 里面直接在 `mapStateToProps` 里面从状态树或通过 `selector` 获取父组件的状态。

<Hint type="best">超过两个层级的通信，推荐使用 Redux 去管理这个状态。</Hint>


### 方式二：逐级传递

* 多级嵌套组件通信：[demo](https://jsbin.com/yibazoh/6/edit?html,js,output)
* 兄弟组件通信：[demo](https://jsbin.com/fopikor/3/edit?html,js,output)

### 方式三：context

* 多级嵌套组件通信：[demo](https://jsbin.com/yibazoh/6/edit?html,js,output)
* 兄弟组件通信：原理同上demo

<Hint type="warning">React 官方并不建议大量使用 context，因为尽管它可以减少逐层传递，但当组件结构复杂的时候，我们并不知道 context 是从哪里传来的。context 就像一个全局变量，而全局变量正是导致应用走向混乱的罪魁祸首之一。</Hint>


