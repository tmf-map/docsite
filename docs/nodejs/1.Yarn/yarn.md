---
title: yarn基本使用
---

## yarn init

初始化一个新项目

## yarn add

新增一个依赖，添加到 package.json 文件的`dependencies`属性中

```
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```

添加到 `devDependencies`属性中

```
yarn add [package] --dev
```

添加到`peerDependencies`属性中

```
yarn add [package] --peer
```

添加到`optionalDependencies`属性中

```
yarn add [package] --optional
```

## yarn upgrade

升级依赖包，可以指定版本或者 tag

```
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

## yarn remove

移除依赖包

```
yarn remove [package]
```

## yarn install

安装 package.json 文件里定义的所有依赖包

```
yarn
```

或者

```
yarn install
```

## yarn cache

列出匹配指定模式的已缓存的包

```
yarn cache list [--pattern]
```

打印出当前的 yarn 全局缓存在哪里

```
yarn cache dir
```

清除全局缓存，下次运行 yarn 或者 yarn install 时会重新填充

```
yarn cache clean
```

## yarn config

yarn 设置镜像源为淘宝镜像

```
yarn config set registry http://registry.npm.taobao.org
```

## yarn create

从任何 `create-*` 初学者工具包创建新项目

```
yarn create <starter-kit-package> [<args>]
```

这个命令包含两个功能: 1. 安装工具包，或者更新包到最新版本 2. 执行新手工具包`package.json`中`bin`字段指向的程序，并向他转发所有的`<args>` 以`yarn create react-app my-app`命令为例，它等价于：

```
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

```
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

yarn import 旨在使用在 `node_modules` 内找到的版本， 根据普通的 `require.resolve()` 决议规则生成一个 `yarn.lock` 文件以缓解这一重大问题。

:::

## yarn info

`yarn info <package> [<field>]`拉取包的信息，显示效果如下：

```
yarn info react
```

```
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

yarn list 命令模仿 Unix 列目录命令的预期行为。 `Yarn list`命令列出当前工作文件夹所有的依赖，通过参考所有包管理器的元信息文件，包括项目的依赖。实现效果如下：

```
yarn list vx.x.x
├─ package-1@1.3.3
├─ package-2@5.0.9
│  └─ package-3@^2.1.0
└─ package-3@2.7.0
```

默认情况下，所有包和它们的依赖会被显示。 如果要限制依赖的深度，可以给 `list` 命令添加一个标志 `--depth`以控制所需的深度。注意：深度层级是从零索引的。

```
yarn list --depth=0
```

还可以根据 pattern 参数筛选出依赖列表：

```
yarn list --pattern gulp
yarn list --pattern "gulp|grunt"
yarn list --pattern "gulp|grunt" --depth=1
```

## yarn login

此命令用来存储`registry`用户名和`email`，需要根据提示输入`npm registry`的用户名和 email。它不会要求你提供密码。之后运行像 yarn publish 这样的命令请求验证时，必须输入密码才能做。

## yarn logout

移除用 `yarn login` 保存给 `npm registry` 的用户名和 email

## yarn publish

发布一个包到 npm 库

```
yarn publish
```

发布当前目录里 `package.json` 定义的包

```
yarn publish [tarball]
```

发布一个 `.tgz` gzip 压缩文件定义的包

```
yarn publish [folder]
```

发布包含在指定目录里的包。 `<folder>` package.json 应该指定包的细节

```
yarn publish --new-version <version>
```

使用`version`的值，跳过对新版本的询问

```
yarn publish --tag <tag>
```

`<tag>`参数为发布的包指定标签

## yarn run

如果你已经在你的包里定义了 scripts，这个命令会运行指定的 `script`。例如：

```
yarn run test
```

还可以在脚本名称后放置要传递给脚本的额外参数：

```
yarn run test -o --watch
```

也可以在该命令中忽略 run，每个脚本都可以用其名字执行，效果与`yarn run test`一样：

```
yarn test -o --watch
```

## yarn test

运行指定的`test`脚本，是 `yarn run test` 的快捷命令

## yarn upgrade

该命令会根据在 package.json 文件中所指定的版本范围将依赖更新到其最新版本。也会重新生成 yarn.lock 文件

```
yarn upgrade [package | package@tag | package@version | @scope/]... [--ignore-engines] [--pattern]
```

`[package]`：如果只写包的名字不指定版本，会自动升级到最新版本. `[package@tag]`: 指定包包含标签时，将升级到该标签的版本。 `[package@version]`: 当指定包包含版本时，将升级到该版本。 package.json 中指明的依赖也将同时更改为指定的版本。 你可以使用任何语义版本的版本号或版本范围。 `--ignore-engines`: 此标志可用于跳过引擎检查。

```
yarn upgrade
yarn upgrade left-pad
yarn upgrade left-pad@^1.0.0
yarn upgrade left-pad grunt
yarn upgrade @angular
```

`yarn upgrade --pattern <pattern>` 将升级所有匹配此模式的包

```
yarn upgrade --pattern gulp
yarn upgrade left-pad --pattern "gulp|grunt"
yarn upgrade --latest --pattern "gulp-(match|newer)"
```

## yarn [command] --verbose

详细日志模式，运行 yarn 命令时，增加参数`--verbose`，这在排查错误时很有帮助

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

可以通过`.yarnrc`文件配置更多的 Yarn 功能。 也可以用 `yarn config` 命令来配置这些选项。 Yarn 会把 `.yarnrc`文件 merge 进文件树里。

## References

[Yarn 中文网](http://yarnpkg.top/index.html)
