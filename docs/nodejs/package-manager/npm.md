---
title: npm
---

import Img from '../../../src/components/Img';

[npm (Node Packaged Modules)](https://www.npmjs.com/) is node's official package manager. You can also see all the versions of node and corresponding npm [here](https://nodejs.org/zh-cn/download/releases/).

## Overview

[npm CLI documentation](https://docs.npmjs.com/cli-documentation/)

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Atnz2F.png' alt='Atnz2F'/>

## npm outdated

Run `npm outdated` and you will see:

<Img w="650" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/0zEWlT.png' alt='0zEWlT'/>

`wanted` is decided by `dependencies`, `devDependencies` in `package.json`. Assume that the version of `less` is defined as `~` in `package.json`, so "wanted" will be shown as minor version.

## npm install

### Install package

这个是 npm 中最常用的命令：

```bash
npm install packageName  # npm i packageName
```

这个命令会将 package 安装在当前目录下 `node_modules` 目录内，可执行命令（如果有）安装在 `node_modules/.bin` 目录下。全局安装使用 `-g` 选项:

```bash
npm install -g packageName  # npm i -g packageName
```

:::tip

具体安装在 `usr` 还是 `~` 下面，还需要看 node/npm 的安装方式，推荐将 node 安装在 `~` 下面，可以使用 nvm 和 n 来安装 node。

:::

如果想指定具体的安装位置，可以使用以下方法：

- 在命令中添加 `--prefix` 标记 (e.g. `npm i -g packageName --prefix ~/.node_modules` )。
- 使用 `npm_config_prefix` 环境变量。
- 使用用户配置文件 `~/.npmrc` 。

第一个方法已不被推荐因为你需要记住位置并且每次操作都需要添加参数。第二个方法只是添加下列行到你的 shell 配置文件 (e.g. `.bash_profile`, `.zshrc`)。

```bash
PATH="$HOME/.node_modules/bin:$PATH"
export npm_config_prefix=~/.node_modules
```

不要忘记`source`一下 shell 配置文件。

第三个方法你可以使用命令：

```bash
npm config edit
```

你可以找到 prefix 选项并且设置一个期望的位置：

```bash
prefix=~/.node_modules
```

不要忘记删除行前面的`;` 否则会被当作注释。你现在可以添加可执行命令的位置到你的 shell 配置文件。

```bash
export PATH="$HOME/.node_modules/bin:$PATH"
```

同样，也不要忘记`source`一下 shell 配置文件。

### Install local package

在 npm@5 之前的版本，如果将本地目录作为依赖来安装，将会把文件目录作为副本拷贝到 `node_modules` 中。而在 npm@5 中，将改为使用创建 symlinks 的方式来实现（使用本地 tarball 包除外），而不再执行文件拷贝。这将会提升安装速度：

```bash
npm install ../packages/mylib
npm install file://packages/mylib
```

有关新的 `file://` 规范描述可以参考官方的 [file-specifiers](https://github.com/npm/npm/blob/link-specifier/doc/spec/file-specifiers.md)。

### Update package

除了安装包，`npm i` 也可以用于升级包，比如 `npm i packageName` 将会把 `node_modules` 中相应的包升级到 `wanted` 版本，同时也会自动更新 `package.josn` 和 `package-lock.json` 。

:::caution

`npm i` 和 `npm i packageName` 的行为是不一样的，`npm i` 会优先去 lockfile 里面找对应的版本，即使有 wanted 的更新版本也不会去下载安装，除非没有 lockfile。

:::

## npm ci

该命令类似于 `npm i` ，但它旨在用于自动化环境，如测试平台，持续集成和部署。通过跳过某些面向用户的功能，它可以比常规的 npm 安装快得多。它也比常规安装更严格，它可以帮助捕获由于用户的增量安装而本地环境引起的错误或不一致。

例如配置 Travis 以使用 `npm ci` 而不是 `npm i`:

```yml
# .travis.yml
install:
  - npm ci
# keep the npm cache around to speed up installs
cache:
  directories:
    - '$HOME/.npm'
```

总之，使用 `npm i` 和使用的主要区别 `npm ci` 是：

- 该项目**必须**有一个 `package-lock.json` 或 `npm-shrinkwrap.json` 。
- 它永远不会写入 `package.json` 或任何 lockfile，安装基本上是冻结的。
- 如果 lockfile 中的依赖项与其中的依赖项不匹配 `package.json`，`npm ci` 则将退出并显示错误，而不是更新 lockfile。
- 如果 `node_modules` 已经存在，它将在 `npm ci` 开始安装之前自动删除。
- `npm ci` 只能一次安装整个项目，使用此命令无法添加单个依赖包。

:::tip

yarn 没有这个命令，但有一个比较类似的命令：`yarn install --frozen-lockfile`

:::

## npm update

更新包有两种方式 `npm i packageName<@version>` 或者 `npm up packageName`

:::caution

- `npm i` 的方式不加版本号和 `up` 的效果是一样的，只更新到 `wanted` 版本，有新版的改动都会更新 package.json 和 lock 文件。
- `npm i` 可以加版本号更新到最新版，比如`^2.3.0`更新到最新版`^3.0.0`之后，package.json 和 lock 文件都会更新，且以插入号的方式来更新 package.json 文件。但是 `up` 命令无论加不加版本号它只会更新到 wanted 版本。

:::

**关于 up 命令方面的基础知识**

```bash
npm update packageName # alias up
```

对于全局环境安装的包 ( `-g` )

```bash
npm up -g packageName
```

> Note: 全局安装的包可能需要管理员权限

**更新所有包** 有时你只希望更新所有包，去掉包名将试图更新所有包。

```bash
npm up
```

或者添加 `-g` 标记更新全局环境安装的包

```bash
npm up -g
```

更新单个全局包，比如`yarn`

```bash
npm up -g yarn
```

## npm uninstall

删除使用 `-g` 标记安装的包只须：

```bash
npm uninstall -g packageName # aliases: un, r
```

:::tip

全局安装的包可能需要管理员权限，取决于 node 的安装目录是否是 `~`。

:::

若删除个人用户目录下的包去掉标记执行：

```bash
npm r packageName
```

## npm list

若要显示已安装的包的树形视图执行：

```bash
npm ls -g  # aliases: list, la, ll
```

若只要显示第一层结构的包（你自己安装的包），可以执行：

```bash
npm ls -g --depth=0
```

## npm cache

`npm install`或`npm update`命令，从 registry 下载压缩包之后，都存放在本地的缓存目录。

### 缓存策略

npm 的缓存目录是通过 cache 变量指定的，一般默认是在`~/.npm` 文件夹，可以执行下面的命令查看

```bash
npm config get cache
```

在 npm@5 以前，每个缓存的模块在 `~/.npm` 文件夹中以模块名的形式直接存储，例如 koa 模块存储在`~/.npm/koa` 文件夹中。而 npm@5 版本开始，数据存储在 `~/.npm/_cacache` 中，并且不是以模块名直接存放。

npm@5 重写了整个缓存系统，缓存将由 npm 来全局维护不用用户操心，这点也是在向 yarn 看齐。升级新版后，用户基本没有手动操作 npm cache 的场景。npm cache clean 将必须带上 --force 参数才能执行，并且会收到警告：

npm 的缓存是使用 [pacote](https://www.npmjs.com/package/pacote) 模块进行下载和管理，基于 [cacache](https://www.npmjs.com/package/cacache) 缓存存储。由于 npm 会维护缓存数据的完整性，一旦数据发生错误，就回重新获取。因此不推荐手动清理缓存，除非需要释放磁盘空间，这也是要强制加上`--force` 参数的原因。

目前没有提供用户自己管理缓存数据的命令，随着你不断安装新的模块，缓存数据也会越来越多，因为 npm 不会自己删除数据。

:::caution

npm@5 版本开始，数据存储在 `~/.npm/_cacache` 中，并且不是以模块名直接存放。

:::

### 缓存命令

[npm cache](https://docs.npmjs.com/cli/cache) 提供了三个命令，分别是`npm cache add`, `npm cache clean`, `npm cache verify`。

```bash
npm cache add
```

官方解释说这个命令主要是 npm 内部使用，但是也可以用来手动给一个指定的 package 添加缓存。(This command is primarily intended to be used internally by npm, but it can provide a way to add data to the local installation cache explicitly.)

```bash
npm cache clean --force
```

删除缓存目录下的所有数据。从 npm@5 开始，为了保证缓存数据的有效性和完整性，必须要加上 `--force` 参数。

```bash
npm cache verify
```

验证缓存数据的有效性和完整性，清理垃圾数据。

### 离线安装

npm 提供了离线安装模式，使用 `--offline`, `--prefer-offline`, `--prefer-online` 可以指定离线模式。

#### `--prefer-offline / --prefer-online`

离线优先/网络优先模式。

- 如果设置为 `--prefer-offline` 则优先使用缓存数据，如果没有匹配的缓存数据，则从远程仓库下载。
- 如果设置为 `--prefer-online` 则优先使用网络数据，忽略缓存数据，这种模式可以及时获取最新的模块。

#### `--offline`

完全离线模式，安装过程不需要网络，直接使用匹配的缓存数据，一旦缓存数据不存在，则安装失败。

## npm config

```bash
npm config set <key> <value>
npm config get [<key>]
npm config delete <key>
npm config list [--json]
npm config edit
npm set <key> <value>
npm get [<key>]
```

比如更换仓库

```bash
npm config set registry https://registry.npmjs.org/
```

## npm link/unlink

https://docs.npmjs.com/cli/link

同一个目录下：

```bash
cd path/my-project
npm link path/my-package
```

不同目录下：

```bash
# 先到模块目录，把它 link 到全局
cd path/my-package
npm link

# 再去项目目录通过包名来 link
cd path/my-project
npm link my-package
```

去掉 link：

```bash
npm unlink my-package
```

:::caution

- 如果在 my-project 里面重新执行过 `npm i` 那么 link 就会失效，需要重新 link。
- 在 my-package 里面的修改能自动同步到 my-project。
- 使用 `nvm` 的时候要注意不同项目是否用的是同一个版本的 node，否则 link 是不会生效的。

:::

## npx

- **安装**

如果 npm 的版本 `>=5.2.0` 应该会自带 npx 命令，直接使用即可。如果没有则 `npm install -g npx`。完整的命令使用说明，运行`npx`即可

- **机制**

1. 首先会自动检查当前项目中的可执行依赖文件（即`./node_modules/.bin`下面的可用依赖）
1. 如果不存在就会去环境变量 path 中寻找
1. 如果还没有就会自动安装，其安装的依赖位于`~/.npm/_npx`之中(_macOS@10.14, npm@6.3.0_，`npm config get cache`可查看`_npx`所在目录)，安装的依赖只是临时的。

比如运行了 `npx http-server` 会在该目录下面生成 `24745`，当服务停掉时，该目录会自动删除。

<Img w="400" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/ftmFX1.png' alt='ftmFX1'/>

> PS: 具体能临时存放多久，待补充。

- **本地二进制的简写方式**

一般情况下，如果你想执行一个本地项目安装的二进制文件而不是全局安装的，你需要这样：

```bash
./node_modules/.bin/jest
```

有了 npx 之后可以 简写如下形式：

```bash
$ npx jest
```

- **不用下载直接使用的 npm 包命令**

使用 `npx create-react-app my-app` 来执行 create-react-app 命令时，它会正常地帮我们创建 React 应用而不会实际安装 create-react-app。

也可以快速开启一个静态服务器：

```bash
$ npx serve
   ┌─────────────────────────────────────────────────┐
   │                                                 │
   │   Serving!                                      │
   │                                                 │
   │   - Local:            http://localhost:5000     │
   │   - On Your Network:  http://172.20.10.8:5000   │
   │                                                 │
   │   Copied local address to clipboard!            │
   │                                                 │
   └─────────────────────────────────────────────────┘
```

这将可以简化一次性命令的包，比如 xxx-init 来初始化项目，直接 `npx xxx-init` 即可。

- **直接运行来自于 Gist 的脚本**

```bash
$ npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32
npx: 1 安装成功，用时 9.985 秒
yay gist
```

- **测试不同的 npm 包版本**

查询最新的 uglify-js 的版本：

```bash
$ npx uglify-js --version
uglify-js 3.4.9
```

现在我们想获得最新的 2.x 版本的 uglify-js：

```bash
$ npx uglify-js@2 --version
uglify-js 2.8.29
```

所以我们就可以很轻松的使用不同版本的 uglify-js 来压缩代码了：

```bash
npx uglify-js@2.8.29 main.js -o ./dist/main.js
```

更多阅读：

- https://github.com/zkat/npx
- [Introducing npx: an npm package runner(The npm Blog)](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner)

## `.npmrc`

### 为什么要使用 `.npmrc`

常用场景：前端项目开发离不开安装各种 npm 依赖包，可以选择 npm 官方仓库也可以私有仓库，但更改仓库地址需要在安装时控制台打命令，比较麻烦，而 `.npmrc` 可以很方便地解决上面问题。当安装项目的依赖包时，会优先查找并读取项目根目录下的.npmrc 文件的配置。

### 如何使用

npmrc 使用起来非常的方便。只需要如下几个步骤：

1. 在项目根目录创建一个.npmrc 的文件
2. 在这个文件中写入相关配置信息

### 相关配置说明

#### `registry=https://registry.npmjs.org`

定义仓库地址，进入该工程目录下，npm registry 会自动以该配置为准，不需要手动执行 `npm config set registry https://registry.npmjs.org`

#### `save-exact=true`

例如配置该项之后执行 `npm install lodash` 会产生如下效果：

```json
{
  "dependencies": {
    "lodash": "3.10.1"
  }
}
```

#### `engine-strict=true`

执行 `npm install` 的时候会检查是否满足 package.json 中"engines"定义的 node 和 npm 的版本。

但要注意的是如果开启了此项，**也会检查依赖包的 package.json 中"engines"定义的 node 和 npm 的版本**。有可能会版本定义不一致报错，此配置要慎用。

node 和默认的 npm 版本对照：https://nodejs.org/zh-cn/download/releases/

`.npmrc`完整配置请参考: https://docs.npmjs.com/misc/config

:::caution

`.npmrc` 在 `npm publish` 的时候会自动忽略该文件

<img src="https://user-images.githubusercontent.com/12554487/52620734-567b8b80-2ee0-11e9-878d-d7e868e4c819.png" width="400" />

:::

See more: https://docs.npmjs.com/files/package.json

## nrm

taobao 使用的坑点

## lockfile

### `package-lock.json`

重新安装模块之所以快，是因为 `package-lock.json` 文件中已经记录了整个 node_modules 文件夹的**树状结构**，甚至连模块的**下载地址**都记录了，再重新安装的时候只需要直接下载文件即可

详细机制注意事项请看：[npm 命令和机制指南 3. 新增包](https://github.com/muwenzi/Program-Blog/issues/104#3)

### `npm-shrinkwrap.json`

npm@5 新增的 `package-lock.json` 文件和~~之前~~通过 `npm shrinkwrap` 命令生成的 `npm-shrinkwrap.json` 文件的格式完全相同，文件内记录了**版本，来源，树结构等所有依赖的 metadata**。

需要注意的是 npm shrinkwrap 并不是一个新功能特性，而是从 npm@2 就开始有的功能。也就是说在 npm@5 之前的版本也是可以通过 shrinkwrap 锁定依赖的。（在这一点上，其实 Facebook 也是早期在使用 npm shrinkwrap 等功能时无法满足需求才导致了现在 yarn 的出现。可以阅读 Facebook 的这篇文章了解他们开发 yarn 的动机。）

而最新的 npm@5 在生成了 `package-lock.json` 之后，再运行 `npm shrinkwrap` 命令，会发现就是把 `package-lock.json` 重命名为 `npm-shrinkwrap.json` 而已。

因此 `package-lock.json` 表面上看只是把 `npm-shrinkwrap.json` 作为了默认创建，为何还要新建一个文件呢？官方对于此也给出了答复和解释：新增 `package-lock.json` 主要是为了使得 `npm-shrinkwrap.json` 可以**向下兼容，保证旧版也可使用**。另外 package-lock 的名称也比 shrinkwrap 相对更加直观。

:::tip

1. **开发**时提交和使用 `package-lock.json` 来保证不同环境、人员安装依赖的一致性。
1. **发布包**时如果有锁定的需求，可以用 `npm shrinkwrap` 命令把 `package-lock.json` 转为 `npm-shrinkwrap.json` 随包发布。
1. 如果项目中已经在使用 `npm-shrinkwrap.json`，可以继续使用（但要注意从旧版本升级到 npm@5 后 install 时会被更新），其优先级高于 `package-lock.json`，并且不会再被重复创建。

:::

## Issues

**node-gyp python 错误**

有些使用 node-gyp 的工具不支持系统上的 Python 3，要解决这个问题，需要安装 `python2`并在 nvm 中设置:

```bash
npm config set python /usr/bin/python2
```

如果出现 `gyp WARN EACCES user "root" does not have permission to access the ... dir`，可以使用 `--unsafe-perm` 选项:

```bash
sudo npm install --unsafe-perm -g node-inspector
```

## References

1. [Node.js (简体中文)](<https://wiki.archlinux.org/index.php/Node.js_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)>)
2. [The .bin folder stackoverflow](https://stackoverflow.com/questions/25306168/the-bin-folder)
3. [npm 入门](https://zhuanlan.zhihu.com/p/27539908)
4. [npm 模块安装机制简介](http://www.ruanyifeng.com/blog/2016/01/npm-install.html)
5. [你所不知道的模块调试技巧 - npm link, 作者：atian25](https://github.com/atian25/blog/issues/17)
6. [npx 简介, 作者：jackPan](https://www.jianshu.com/p/84daa0bea35c)
7. [npmrc 使用小记，作者：绯雨闲丸](https://www.vanadis.cn/2017/03/25/npmrc/)
8. https://nodesource.com/blog/configuring-your-npmrc-for-an-optimal-node-js-environment/
9. [npm 5 发布，有什么值得关注的新特性吗？](https://www.zhihu.com/question/60519361/answer/177577759)
10. [说说 npm 5 的新坑](https://toutiao.io/posts/hrihhs/preview)
11. [npm 和 yarn 缓存策略对比](https://segmentfault.com/a/1190000009709213)
12. [npm5 新版功能特性解析及与 yarn 评测对比](https://www.qcloud.com/community/article/171211)
13. [npm CLI documentation > CLI commands npm-ci](https://docs.npmjs.com/cli/ci.html)
14. [Stackoverflow: What is the closest to `npm ci` in yarn](https://stackoverflow.com/questions/58482655/what-is-the-closest-to-npm-ci-in-yarn)
