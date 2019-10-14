import Hint from '../../../src/components/Hint'

# 5. 路由管理

## react-router

{% embed url="http://reacttraining.cn/web/example/basic" %}

React Router被拆分成三个包：`react-router`,`react-router-dom`和`react-router-native`。`react-router`提供核心的路由组件与函数。其余两个则提供运行环境（即浏览器与react-native）所需的特定组件。

进行网站（将会运行在浏览器环境中）构建，我们应当安装`react-router-dom`。`react-router-dom`暴露出`react-router`中暴露的对象与方法，它会自动安装 `react-router` ，因此你只需要安装并引用`react-router-dom`即可。

## @reach/router

<Hint type="better">路由管理推荐使用 [@reach/router](https://github.com/reach/router)，功能简洁而强大，没有 react-router 的繁琐，详情请参考官方文档：[https://reach.tech/router](https://reach.tech/router)</Hint>


<Hint type="tip">在 `@reach/router` 中，父路由组件有一个特殊的 props: **`*`** ，它作为一个特殊的 key，可以帮助父路由组件取到子路由组件的 path。</Hint>


详细的 Rematch 介绍请参考该文章：[Reach-Router “真香👍”](https://zhuanlan.zhihu.com/p/37718650)。

