---
id: lifecycle
title: 生命周期
sidebar_label: 生命周期
---

import Hint from '../../../src/components/Hint'

## Before React v16.3

![React v15 生命周期图](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/C2ehgN.jpg)

## After React v16.3

React v16.3，引入了两个新的生命周期函数：

* **getDerivedStateFromProps**
* **getSnapshotBeforeUpdate**

<Hint type="tip">`getDerivedStateFromProps` 实际上就是用来取代以前的 `componentWillReceiveProps` 。</Hint>

随着 `getDerivedStateFromProps` 的推出，同时deprecate了一组生命周期API，包括：

* **componentWillReceiveProps**
* **componentWillMount**
* **componentWillUpdate**

新的生命周期图如下图所示：

![React v16.3 生命周期图](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/w9HKPM.jpg)
