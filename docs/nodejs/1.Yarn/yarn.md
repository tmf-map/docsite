---
title: yarn基本使用
---

## yarn 安装、升级

### macOS

1. 使用脚本安装，每次安装的都是最新版：

```bash
curl -o- -L https://yarnpkg.com/install.sh | bash
```

如需升级，再次运行此命令，然后会出现以下信息：

```bash
/Users/xxx/.yarn already exists, possibly from a past Yarn install.
> Remove it (rm -rf /Users/xxx/.yarn) and run this script again.
```

根据提示，由于已经安装了 yarn，所以需要先删除`.yarn`文件，然后再重新执行该命令，即可安装最新版 yarn。

2. 通过`npm`安装/升级最新版本：

```bash
npm install -g yarn@latest
```

可以查看 yarn 历史版本：

```bash
npm view yarn versions --json
```

安装指定版本的 yarn：

```bash
npm install -g yarn@1.19.2
```

:::note

如果你使用`nvm`管理`node`的版本，那么每次对`node`进行版本升级之后，都需要重新安装`yarn`。不过，通过 npm 安装依赖包的速度非常快，所以即使需要重新安装，花费的时间也非常少。

:::

### windows

1. 下载最新的.msi 文件，[点击这里下载](yarnpkg.com/latest.msi)，跟随指引安装即可。

2. 通过`Chocolatey`安装。`Chocolatey` 是一个 Windows 专用的软件包管理工具，请按照此[说明](https://chocolatey.org/install)安装`Chocolatey`。安装成功后，在控制台执行如下命令安装 yarn：

```bash
choco install yarn
```

更新 yarn:

```bash
choco update yarn
```

3. 通过`Scoop`安装。`Scoop`是一个用于 Windows 的基于命令行的安装工具。 请按照此[说明](https://github.com/lukesampson/scoop/wiki/Quick-Start)安装`Scoop`。安装`Scoop`后，在控制台执行如下命令安装`yarn`：

```bash
scoop install yarn
```

更新 yarn：

```bash
scoop update yarn
```

### 查看是否安装成功

```bash
yarn --version
```

安装成功会显示对应的版本号：

```bash
1.19.2
```

## 卸载 yarn

1. 如果是 npm 安装的，则可通过命令`npm uninstall yarn -g`卸载 yarn
2. 可通过`yarn global bin`命令找到 yarn 全局安装的根目录，然后删除 yarn 文件夹即可

```bash
rm -rf /usr/local/bin/yarn
```

3. 如果是通过`Chocolatey`安装的，可以通过`choco uninstall yarn`命令卸载 yarn
4. 如果是通过`Scoop`安装的，可以通过`scoop uninstall yarn`命令卸载 yarn

## yarn init

初始化一个新项目

## yarn add

新增一个依赖，添加到 package.json 文件的`dependencies`属性中

```bash
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```

加上参数`--dev`或者`-D`，添加`package`依赖到`devDependencies`属性中

```bash
yarn add [package] --dev
yarn add [package] -D
```

加上参数`--peer`或者`-P`，添加`package`依赖到`peerDependencies`属性中

```bash
yarn add [package] --peer
yarn add [package] -P
```

加上参数`--optional`或者`-O`，添加`package`依赖到`optionalDependencies`属性中

```bash
yarn add [package] --optional
yarn add [package] -O
```

## yarn upgrade

升级依赖包，可以指定版本或者 tag

```bash
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

## yarn remove

移除依赖包

```bash
yarn remove [package]
```

## yarn install

安装 package.json 文件里定义的所有依赖包

```bash
yarn
```

或者

```bash
yarn install
```

## yarn cache

列出匹配指定模式的已缓存的包

```bash
yarn cache list [--pattern]
```

打印出当前的 yarn 全局缓存在哪里

```bash
yarn cache dir
```

清除全局缓存，下次运行 yarn 或者 yarn install 时会重新填充

```bash
yarn cache clean
```

## yarn config

yarn 设置镜像源为淘宝镜像

```bash
yarn config set registry http://registry.npm.taobao.org
```

## yarn create

从任何 `create-*` 初学者工具包创建新项目

```bash
yarn create <starter-kit-package> [<args>]
```

这个命令包含两个功能：

1. 安装工具包，或者更新包到最新版本

2. 执行新手工具包`package.json`中`bin`字段指向的程序，并向他转发所有的`<args>`

以`yarn create react-app my-app`命令为例，它等价于：

```bash
yarn global add create-react-app
create-react-app my-app
```

## yarn global

`yarn global` 是一个命令前缀，可用于 `add`、`bin`、`list` 和 `remove` 等命令，在原有行为基础上用一个全局目录来存储包

:::tip

与 npm 不同，在 yarn 中`global`参数必须紧跟在 yarn 后才能将依赖全局添加，即必须为`yarn global add package-name`的形式。如果写为`yarn add global package-name`的形式，会把名为 `global` 和 `package-name` 的包添加到本地，而非全局添加 `package-name`。

:::

`yarn global bin` 查看 yarn 全局安装的根目录

## yarn help

显示帮助信息，效果如下：

```bash
Displays help information.

  Options:

    --cache-folder <path>               specify a custom folder that must be used to store the yarn cache
    --check-files                       install will verify file tree of packages for consistency
    --cwd <cwd>                         working directory to use (default: /Users/sherryshen/code-other/docsite)
    --disable-pnp                       disable the Plug'n'Play installation
    ......
```

## yarn import

依据原 npm 安装后的`node_modules`目录生成一份`yarn.lock`文件

:::note

背景介绍：许多使用 `npm shrinkwrap` 或 `node_modules` 的项目无法轻易迁移到 Yarn，因为 `yarn install` 可能产生有很大差异的逻辑依赖关系树。不是所有树都可以用 Yarn 的 `yarn.lock` 表示，并且部分有效的树会在安装后自动按重复剔除。

yarn import 旨在使用在 `node_modules` 内找到的版本， 根据普通的 `require.resolve()` 解决规则生成一个 `yarn.lock` 文件以缓解这一重大问题。

:::

## yarn info

`yarn info <package> [<field>]`拉取包的信息。以`yarn info react`命令为例，在命令行输入：

```bash
yarn info react
```

打印的信息如下：

```bash
yarn info v1.19.2
warning package.json: No license field
{ name:
   'react',
  description:
   'React is a JavaScript library for building user interfaces.',
  'dist-tags':
   { latest:
      '16.13.1',
     next:
      '0.0.0-d7382b6c4',
     experimental:
      '0.0.0-experimental-e5d06e34b',
     canary:
      '0.0.0-57333ca33',
     unstable:
      '0.0.0-da834083c' },
      ......
```

可以添加`--json`参数，例如：`yarn info react --json`，输出为`JSON`行格式；还可以添加版本参数 `@[version]` ，例如：`yarn info react@16.13.1`，以查看特定版本的信息

## yarn list

yarn list 命令模仿 Unix 列目录命令的预期行为。 `yarn list`命令列出当前工作文件夹所有的依赖，通过参考所有包管理器的元信息文件，包括项目的依赖。实现效果如下：

```bash
yarn list v1.19.2
├─ @babel/code-frame@7.8.3
│  └─ @babel/highlight@^7.8.3
├─ @babel/compat-data@7.9.0
│  ├─ browserslist@^4.9.1
│  ├─ invariant@^2.2.4
│  └─ semver@^5.5.0
......
```

默认情况下，所有包和它们的依赖会被显示。 如果要限制依赖的深度，可以给 `list` 命令添加一个标志 `--depth`以控制所需的深度。注意：深度层级是从零索引的。

```bash
yarn list --depth=0
```

还可以根据 pattern 参数筛选出依赖列表：

```bash
yarn list --pattern gulp
yarn list --pattern "gulp|grunt"
yarn list --pattern "gulp|grunt" --depth=1
```

## yarn login

此命令用来登录自己的 npm 账号。根据提示分别输入注册账号时填写的用户名和邮箱，不需要输入密码。之后就可以运行 `yarn publish`命令发布包，此时需要输入 npm 账号的密码才能成功发布。

## yarn logout

退出登录 npm 账号

## yarn publish

发布一个包到 npm 库

```bash
yarn publish
```

发布当前目录里 `package.json` 定义的包

```bash
yarn publish [tarball]
```

发布一个 `.tgz` gzip 压缩文件定义的包

```bash
yarn publish [folder]
```

发布包含在指定目录里的包。 `<folder>` package.json 应该指定包的细节

```bash
yarn publish --new-version <version>
```

使用`version`的值，跳过对新版本的询问

```bash
yarn publish --tag <tag>
```

`<tag>`参数为发布的包指定标签

## yarn run

如果你已经在你的包里定义了 scripts，这个命令会运行指定的 `script`。例如：

```bash
yarn run test
```

还可以在脚本名称后放置要传递给脚本的额外参数：

```bash
yarn run test -o --watch
```

也可以在该命令中忽略 run，效果与`yarn run test`一样：

```bash
yarn test -o --watch
```

## yarn test

运行指定的`test`脚本，是 `yarn run test` 的快捷命令

## yarn upgrade

该命令会根据在 package.json 文件中所指定的版本范围将依赖更新到其最新版本。也会重新生成 yarn.lock 文件

```bash
yarn upgrade [package | package@tag | package@version | @scope/]... [--ignore-engines] [--pattern]
```

- `[package]`：如果只写包的名字不指定版本，会自动升级到最新版本
- `[package@tag]`: 指定包包含标签时，将升级到该标签的版本
- `[package@version]`: 当指定包包含版本时，将升级到该版本
- `package.json` 中指明的依赖也将同时更改为指定的版本。 你可以使用任何语义版本的版本号或版本范围
- `--ignore-engines`: 此标志可用于跳过引擎检查。

```bash
yarn upgrade
yarn upgrade left-pad
yarn upgrade left-pad@^1.0.0
yarn upgrade left-pad grunt
yarn upgrade @angular
```

`yarn upgrade --pattern <pattern>` 将升级所有匹配此模式的包

```bash
yarn upgrade --pattern gulp
yarn upgrade left-pad --pattern "gulp|grunt"
yarn upgrade --latest --pattern "gulp-(match|newer)"
```

### 版本详解

一般来说，版本号主要分为三部分：`主版本号(major)`、`次版本号(minor)`和`修补版本号(patch)`。以`2.6.6`为例，major 为 2，minor 为 6，patch 为 6。

- patch：修复 bug，兼容老版本
- minor：新增功能，兼容老版本
- major：新的架构调整，不兼容老版本

版本号的主要符号：

1、> 大于某个版本，表示只要大于这个版本的安装包都行，如`>2.0.0`。

2、>= 大于某个版本，表示只要大于或等于这个版本的安装包都行，如`>=2.0.0`。

3、< 小于某个版本，表示只要小于这个版本的安装包都行，如`<2.0.0`。

4、<= 小于或等于某个版本，表示更新版本范围只要小于或等于这个版本的安装包都行，如`<=2.0.0`。

5、~ 如：`~2.6.6`，表示更新版本范围`>=2.6.6 <2.7.0`，可以是`2.6.x`，兼容 patch。如：`~2.6`，表示更新版本范围`>=2.6.0 <2.7.0`，可以是`2.6.x`，兼容 patch。如：`~2`，表示更新版本范围`>=2.0.0 <3.0.0`，可以是`2.x.x`，兼容 minor 和 patch。

6、^ 如果 major 是非零数字，则兼容 minor 和 patch，如果是 0，则兼容 patch。如：`^2.6.6` ，表示更新版本范围`>=2.6.6 <3.0.0`，可以是`2.x.x`，兼容 minor 和 patch。如：`^0.6.6`，表示更新版本范围>=0.6.6 <0.7.0，可以是`0.6.x`，兼容 patch。如：`^0.6`，表示更新版本范围`>=0.6.0 <0.7.0`，可以是`0.6.x`，兼容 patch。

7、_ 表示任意版本。如：_，表示更新版本范围为`>=0.0.0`的任意版本。

## yarn [command] --verbose

详细日志模式，运行 yarn 命令时，增加参数`--verbose`，这在排查错误时很有帮助

## --cwd

- `cwd`是`current working directory`的缩写，中文是`当前工作目录`
- 使用方式：`yarn --cwd [path] [command]`，这个命令的含义是：通过`--cwd`和`path`参数，使得命令在`path`这个文件路径下执行
- 注意：参数的顺序非常重要，不能改变，否则会出错
- 适用于多层嵌套的项目

假设当前有一个多层嵌套的项目，结构如下：

```bash
/project
  /layer1
  /layer2
```

如果想在`project/`中指定`yarn run`命令在`/layer1`路径下执行，则该命令需要写为：

```bash
yarn --cwd layer1 run
```

如果`--cwd [path]`参数的使用顺序不对，则会报错，无法识别`--cwd`参数：

```bash
yarn run --cwd layer1
```

```bash
error: unknown option '--cwd'
```

## yarn.lock 文件

`yarn.lock`文件是在安装期间，由`Yarn`自动生成的，其中准确地存储着每个依赖的具体版本信息。当我们通过 yarn 增加、升级或者删除依赖时，它会自动更新 yarn.lock 文件。yarn.lock 文件应该由 yarn 来管理，不应该手动去更改，更不应该删除，且要提交到版本控制系统中，以免因为不同机器安装的包版本不一致引发问题。

```json
# THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
# yarn lockfile v1


"@babel/code-frame@7.8.3", "@babel/code-frame@^7.0.0", "@babel/code-frame@^7.8.3":
  version "7.8.3"
  resolved "https://registry.yarnpkg.com/@babel/code-frame/-/code-frame-7.8.3.tgz#33e25903d7481181534e12ec0a25f16b6fcf419e"
  integrity sha512-a9gxpmdXtZEInkCSHUJDLHZVBgb1QS0jhss4cPP93EW7s+uC5bikET2twEF3KV+7rDblJcmNvTR7VJejqd2C2g==
  dependencies:
    "@babel/highlight" "^7.8.3"
```

以`@babel/code-frame`为例，看看 yarn.lock 中会记录哪些信息：

- 第一行`"@babel/code-frame@7.8.3"`包的 name 和语义化版本号，这些都来自`package.json`中的定义
- `version`字段，记录的是一个确切的版本
- `resolved`字段记录的是包的 URL 地址
- `dependencies`字段记录的是当前包的依赖，即当前包在`package.json`的`dependencies`字段中的所有依赖

## .yarnrc 文件

可以通过`.yarnrc`文件配置更多的 yarn 功能。 也可以用 `yarn config` 命令来配置这些选项。 yarn 会把 `.yarnrc`文件 merge 进文件树里。

:::note

优先级：`.npmrc` > `yarn config` > `.yarnrc`

:::

## npm 与 yarn 常用命令对比

### 同操作同名的命令

| npm | yarn | 功能描述 |
| --- | --- | --- |
| npm run | yarn run | 运行 `package.json` 中预定义的脚本 |
| npm config list | yarn config list | 查看配置信息 |
| npm config set registry 仓库地址 | yarn config set registry 仓库地址 | 更换仓库地址 |
| npm init | yarn init | 互动式创建/更新 package.json 文件 |
| npm list | yarn list | 查看当前目录下已安装的所有依赖 |
| npm login | yarn login | 登录你的用户名、邮箱 |
| npm logout | yarn logout | 退出你的用户名、邮箱 |
| npm publish | yarn publish | 将包发布到 npm |
| npm test | yarn test(yarn run test) | 测试 |
| npm bin | yarn bin | 显示 bin 文件所在的安装目录 |
| yarn info | yarn info | 显示一个包的信息 |

### 同操作不同名的命令

| npm | yarn | 功能描述 |
| --- | --- | --- |
| npm install(npm i) | yarn install(yarn) | 根据 `package.json` 安装所有依赖 |
| npm i [package] | yarn add [package] | 添加依赖包 |
| npm i -dev [package] | yarn add [package] –dev | 添加依赖包至 `devDependencies` |
| npm i -g [package] | yarn global add [package] | 全局安装依赖包 |
| npm update –save | yarn upgrade [package] | 升级依赖包 |
| npm uninstall [package] | yarn remove [package] | 移除依赖包 |

## References

[Yarn 中文网](http://yarnpkg.top/index.html)
