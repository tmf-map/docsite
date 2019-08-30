<h1 align="center">
    <img width="436" src="https://user-images.githubusercontent.com/12554487/40153405-4784fd0e-59bc-11e8-893e-946b246b6076.jpg" alt="earth-ui logo">
    <br>
    <br>
</h1>

> 一套基于ReactJS的极简风格的UI组件库。

[![build status][travis-image]][travis-url]
[![npm version][npm-version-image]][npm-version-url]
[![npm downloads][npm-downloads-image]][npm-downloads-url]
[![license][license-image]][license-url]

[English][en-url] | 简体中文

## 安装

```sh
npm i earth-ui
```

## 基础使用

```js
import Button from 'earth-ui/lib/Button';
import 'earth-ui/dist/earth-ui.min.css';

ReactDOM.render(<Button>Name</Button>, mountNode);
```

## Use in create-react-app

[create-react-app][create-react-app-url] 是业界最优秀的 React 应用开发工具之一，我们会尝试在 `create-react-app` 创建的工程中使用 `earth-ui` 组件。

首先，需要在命令行中安装 `create-react-app` 工具，[详细安装说明][create-react-app-url] 。

现在从 yarn 或 npm 安装并引入 `earth-ui` 。

```sh
yarn add earth-ui
```

修改 `src/App.js`，引入 `earth-ui` 的按钮组件。

```js
import React, { Component } from 'react';
import './App.css';
import Button from 'earth-ui/lib/Button';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Button icon="plus">添加</Button>
      </div>
    );
  }
}

export default App;
```

修改 `src/App.css`，在文件顶部引入 `earth-ui/dist/earth-ui.min.css` 。

```css
@import '~earth-ui/dist/earth-ui.min.css';

.App {
  text-align: center;
}

...
```

现在你应该能看到页面上已经有了 `earth-ui` 的按钮组件，接下来就可以继续选用其他组件开发应用了。其他开发流程你可以参考 [User Guide][create-react-app-user-guide-url] .

## 组件全局配置

覆盖或扩展 `defaultProps` 即可，以 [Tooltip][tooltip-url] 为例:

```js
Tooltip.defaultProps = Object.assign(Tooltip.defaultProps || {}, {
  triggerMode: 'click'
})
```

命令式 API 模块：[message][message-url]、[xhr][xhr-url] 也支持全局配置，涉及 url 方式加载数据的组件以及 [Form][form-url] 均依赖 xhr，详细配置请参考其各自文档。

> 全局配置后，这些 API 会变成有状态的，即最终结果受配置影响，所以尽量一次性配置并向其它开发者说明。

## 本地开发

```sh
git clone git@github.com:G-Explorer/earth-ui.git
cd earth-ui
npm i
npm run site:dev
```

打开浏览器访问 http://127.0.0.1:3003 ， 更多本地开发文档参见 [Development Instructions][dev-instructions-url] .

#### 创建一个新组件

```sh
npm run create MyComponent
```
查看：http://localhost:3003/components/MyComponent

## 更新日志

[CHANGELOG][changelog-url]

## 贡献

欢迎大家参与贡献开源项目，贡献前请先阅读 [CONTRIBUTING.md][contributing-url]。你可以通过 [Pull Requests][pr-url] 或者 [GitHub issues][issue-url] 来贡献你的想法或代码。如果你想改进代码，请先查看 [Development Instructions][dev-instructions-url] 祝coding愉快！:)

## License

MIT © [Kimi Gao](https://github.com/muwenzi)

[travis-url]: https://travis-ci.org/G-Explorer/earth-ui
[travis-image]: https://img.shields.io/travis/G-Explorer/earth-ui/master.svg?style=flat-square
[npm-version-url]: https://www.npmjs.com/package/earth-ui
[npm-version-image]: https://img.shields.io/npm/v/earth-ui.svg?style=flat-square
[npm-downloads-url]: https://www.npmjs.com/package/earth-ui
[npm-downloads-image]: https://img.shields.io/npm/dt/earth-ui.svg?style=flat-square
[license-url]: https://github.com/G-Explorer/earth-ui/blob/master/LICENSE
[license-image]: https://img.shields.io/github/license/G-Explorer/earth-ui.svg?style=flat-square
[en-url]: https://github.com/G-Explorer/earth-ui/blob/master/README.md
[tooltip-url]: https://ui.muwenzi.com/components/Tooltip
[message-url]: https://ui.muwenzi.com/components/message
[xhr-url]: https://ui.muwenzi.com/components/xhr
[form-url]: https://ui.muwenzi.com/components/Form
[dev-instructions-url]: https://github.com/G-Explorer/earth-ui/wiki/Local-development
[changelog-url]: https://ui.muwenzi.com/changelog
[contributing-url]: https://github.com/G-Explorer/earth-ui/blob/master/.github/CONTRIBUTING.md
[pr-url]: https://github.com/G-Explorer/earth-ui/pulls
[issue-url]: https://github.com/G-Explorer/earth-ui/issues
[create-react-app-url]: https://github.com/facebookincubator/create-react-app
[create-react-app-user-guide-url]: https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md