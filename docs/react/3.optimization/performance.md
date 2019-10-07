---
id: performance
title: 性能分析
sidebar_label: 性能分析
---

## React 16 性能分析

在开发环境下，可以用浏览器 DevTools 中的 **performance** 去分析组件的挂载、更新和卸载的性能开销。

示例：

![performance analysis](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/QwmpGS.jpg)

Chrome浏览器内：

1. 在项目地址栏内添加查询字符串 `?react_perf`（例如， `http://localhost:3000/?react_perf`），也可以在代码里面根据不同环境去配置。
2. 打开Chrome开发工具 [**Performance**](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool)  标签页点击 **Record**.
3. 执行你想要分析的动作。不要记录超过 20s，不然 Chrome 可能会挂起。
4. 停止记录。
5. React 事件将会被归类在 **User Timing** 标签下。

更多的详细操作，请参考 [BenSchwarz 的这篇文章](https://building.calibreapp.com/debugging-react-performance-with-react-16-and-chrome-devtools-c90698a522ad)。

> **提示：由于这些数字是相对的，因此组件在生产版本中会运行更快**。然而，这也能够帮助你了解何时会有无关的组件被错误的更新，以及你的组件更新的深度和频率。


> **提示**：目前浏览器中仅有Chrome，Edge和IE支持此特性，但是 React 官方使用此标准[用户Timing API](https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API)，未来将会有更多的浏览器对其添加支持。


## React 15 性能分析

低版本的 React 请参考官方文档：[react-addons-perf](https://reactjs.org/docs/perf.html)

