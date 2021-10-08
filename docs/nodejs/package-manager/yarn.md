---
title: yarn
---

## Get started

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

根据提示，由于已经安装了 yarn，所以需要先删除`~/.yarn`文件，然后再重新执行该命令，即可安装最新版 yarn。

:::note

好处就是如果使用`nvm`管理`node`的版本，那么每次对`node`进行版本升级之后，无需重新安装`yarn`。

:::

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

如果使用`nvm`管理`node`的版本，那么每次对`node`进行版本升级之后，都需要重新安装`yarn`，因为通过 `npm i -g` 方式安装的全局包和 node 版本挂钩，导致全局包全部丢失。不过，通过 `yarn global add` 方式添加的全局包不会丢失，对应包的 bin cli 也可以正常使用，原因参考 [yarn global](#yarn-global)。

:::

### Windows

1. 下载最新的.msi 文件，[点击这里下载](https://yarnpkg.com/latest.msi)，跟随指引安装即可。

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

### Check installation

```bash
yarn --version
```

安装成功会显示对应的版本号：

```text
1.19.2
```

### Uninstall yarn

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

:::tip

`yarn add [package]` 默认添加的是 `^` 符号，详情见 [Package Version](/docs/nodejs/package-manager/package-version)。

:::

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

See more: https://yarnpkg.com/cli/add

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

```bash
yarn config set <key> <value> [-g|--global]
```

例如设置镜像源为淘宝镜像：

```bash
yarn config set registry http://registry.npm.taobao.org
```

例如修改 package.json -> scripts 中运行的 shell，比如 "start": "source variables.sh; node app.js"，因为 Unix-like OS 默认是 `/bin/sh`，用该配置指明 shell 可以保证不同机器上运行 `source` 命令不会出错：

```bash
yarn config set script-shell /bin/bash
```

:::tip

配置也可以放在项目的 `.yarnrc` 或 `.npmrc` 文件中。

:::

其他常用命令：

```bash
yarn config get <key>
yarn config delete <key>
yarn config list # Displays the current configuration.
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

通过 yarn 安装的全局包（无论 yarn 的安装方式），会放在`~/.config/yarn/global/node_modules`里面。

```bash
# if has installed global packages via yarn
$ ll ~/.config/yarn/global
node_modules
package.json
yarn.lock
```

`yarn global bin` 查看 yarn 全局安装的 bin 文件夹地址：

```bash
$ yarn global bin
/usr/local/bin
$ ll
```

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Xnip2021-10-08_14-56-31.jpg' />

如上图 `pm2` 被安装在了全局，在 cli 中输入 `pm2` 将执行 yarn global 的 pm2，无论是否安装 `npm i -g pm2`。

:::danger

千万不要 `yarn global add npm`，否则会在 `/usr/local/bin` 中创建两个软链：`npm` 和 `npx`

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Xnip2021-10-08_14-57-34.jpg' />

将会导致无论用 nvm 怎么切换 node 或重新安装 npm，都会使 npm 的版本锁定在 yarn global 中 npm 的版本，如果 yarn global 中 npm 的版本过低，可能还会导致以下错误，没踩过坑的话会非常难以定位到该问题：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Xnip2021-10-08_15-02-05.jpg' />
<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Xnip2021-10-08_15-01-16.jpg' />

这时候也不要尝试升级 yarn global 中 npm 的版本，即使修改后版本兼容了，还有可能因为 yarn 中残留的 npm 版本问题导致以下错误：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Xnip2021-10-08_23-09-35.jpg' />

最好通过 `yarn global remove npm`删除或者全局包不多的话可以彻底删除 global 文件夹:

```bash
$ rm -rf ~/.config/yarn/global
```

:::

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

:::tip

npm 中除了`start`, `install`, `test`等官方命令外，自定义的命令前面都需要加 `run`，而 yarn 中自定义命令前的 `run` 可以省略。

:::

## yarn test

运行指定的`test`脚本，是 `yarn run test` 的快捷命令

## yarn upgrade

该命令会根据在 `package.json` 文件中所指定的版本范围将依赖更新到其最新版本。也会重新生成 `yarn.lock` 文件

```bash
yarn upgrade [package | package@tag | package@version | @scope/] [--ignore-engines] [--pattern]
```

- `[package]`：如果只写包的名字不指定版本，会自动升级到最新版本
- `[package@tag]`: 指定包包含标签时，将升级到该标签的版本
- `[package@version]`: 当指定包包含版本时，将升级到该版本
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

:::tip

当 major 为零的阶段（0.y.z），不会更 minor，只会更新 patch，因为该阶段相对不稳定。

- 如：`^0.6.6`，表示更新版本范围 `>=0.6.6 <0.7.0`，可以是`0.6.x`。
- 如：`^0.6`，表示更新版本范围`>=0.6.0 <0.7.0`，可以是`0.6.x`。

:::

## yarn [command] --verbose

详细日志模式，运行 yarn 命令时，增加参数`--verbose`，这在排查错误时很有帮助

## yarn --cwd [path] [command]

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

如果想在`project/`中指定`yarn install`命令在`/layer1`路径下执行，则该命令需要写为：

```bash
yarn --cwd layer1 install
```

如果`--cwd [path]`参数的使用顺序不对，则会报错，无法识别`--cwd`参数：

```bash
yarn install --cwd layer1
```

```bash
error: unknown option '--cwd'
```

## `yarn.lock`

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

## `.yarnrc`

可以通过`.yarnrc`文件配置更多的 yarn 功能。 也可以用 `yarn config` 命令来配置这些选项。 yarn 会把 `.yarnrc`文件 merge 进文件树里。

:::note

优先级：`.npmrc` > `yarn config` > `.yarnrc`

:::

## References

1. [Yarn 中文网](http://yarnpkg.top/index.html) [Yarn official site](https://yarnpkg.com/cli/add)
2. [yarn config](https://classic.yarnpkg.com/en/docs/cli/config/)
3. [npm-run-script](https://docs.npmjs.com/cli/run-script)
