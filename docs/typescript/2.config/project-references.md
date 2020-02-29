---
title: 工程引用
sidebar_label: 工程引用
---

## 概述

工程引用是`TypeScript 3.0`的新特性，它支持将`TypeScript`程序的结构分割成更小的组成部分，并可以配置这些小的部分产生依赖关系。这样可以改善构建时间，强制在逻辑上对组件进行分离，更好地组织你的代码。

`TypeScript 3.0`还引入了`tsc`的一种新模式，即`--build`（简写为`-b`）标记，它与工程引用协同工作可以加速`TypeScript`的构建。使用方式：

```
tsc -b 文件路径
```

## 工程引用前

工程应用出现前，因为所有的配置都是在同一个文件`tsconfig`中，配置起来顾此失彼，略显笨重。可以看一下下面这个目录结构：

```
├── src
│   ├── client
│   │   ├── index.ts
│   ├── common
│   │   ├── index.ts
│   ├── server
│   │   ├── index.ts
├── test
│   ├── client.spec.ts
│   ├── server.spec.ts
├── package.json
├── tsconfig.json
```

可以将该项目的看作一个前后端未分离的项目，`client`下是客户端代码，`server`下是服务器代码，`common`是两者共用的文件，其中`client/index.ts` 和 `server/index.ts` 会引用`common/index.ts`的代码。`test`中存放的是`client`和`server`的单元测试代码。

`tsconfig.json`的配置如下：

```js
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist"
  }
}
```

项目编译后的`dist`目录如下：

```
├── dist
│   ├── src
│   │   ├── client
│   │   ├── common
│   │   ├── server
│   ├── test
```

通过上面的内容可以看出，在没有引入工程引用前存在以下几个缺点：

1. 希望 `src` 下面的文件直接被编译到 `dist` 目录下, 但由于需要编译`test`文件而达不到这样的效果。

2. 我们无法单独构建 `client` 端, 或者 `server` 端的代码，构建体积较大。

3. 我们不希望把`test`构建到 `dist` 目录下。

4. 一个文件发生改动，要编译所有文件，构建比较耗时。

虽然`1`可以通过配置`include`字段实现只将`src`下的文件编译到`dist`，同时也满足了`3`，但是这样`test`不能一起编译会显得很麻烦。此时我们可以通过使用工程引用，单独编译各个模块。

## 使用工程引用

为了优化构建过程，我们可以使用工程引用，将之前的目录改造如下：

```
├── src
│   ├── client
│   │   ├── index.ts
│   │   ├── tsconfig.json
│   ├── common
│   │   ├── index.ts
│   │   ├── tsconfig.json
│   ├── server
│   │   ├── index.ts
│   │   ├── tsconfig.json
├── test
│   ├── client.spec.ts
│   ├── server.spec.ts
│   ├── tsconfig.json
├── package.json
├── tsconfig.json

```

通过目录结构可以看出，我们为每个目录都添加了`tsconfig.json`来满足各个模块的编译需求。

根 `tsconfig.json` 文件配置如下：

```js
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    // "outDir": "./dist"  关闭 outDir 选项, 即不在根配置中指定输入目录

    "composite": true, // 使用 composite, 它意味着工程可以被引用, 可以帮助ts编译器快速定位工程文件的输出文件
    "declaration": true // 使用 composite 选项必须开启 declaration
  }
}

```

使用工程引用时，`client/tsconfig.json`的配置：

```js
{
  "extends": "../../tsconfig.json", // 导入根配置文件
  "compilerOptions": {
    "outDir": "../../dist/client" // 指定输出目录
  },
  "references": [{ "path": "../common" }] // 因为 client 引用了 common, 故需要将 common 引入进来
}

```

其中`extends`用来导入根配置文件。而`references`导入引用工程中的模块**实际加载的是它输出的声明文件**（`.d.ts`），这也是在根配置文件中必须配置`"composite": true`和`"declaration": true`的原因。

在使用`tsc -b src/client`进行编译时，它所依赖的`common`也会被编译到`dist`文件。

`server/tsconfig.json`的配置与`client/tsconfig.json`类似，只需要将`outDir`改动以下即可。当`server`编译时，由于`common`文件已经被编译过了，所以此时不会对其再次编译，这样也节省了编译的时间。

`common/tsconfig.json`的配置：

```js
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "../../dist/common"
  }
}
```

`test/tsconfig.json`的配置：

```js
{
  "extends": "../tsconfig.json", // 导入根配置文件
  "references": [{ "path": "../src/client" }, { "path": "../src/server" }] // 引用工程文件
}

```

## tsc -b 命令行

上面也提到，使用`tsc -b`可以对`ts`文件进行编译。

```
 > tsc -b                                # Build the tsconfig.json in the current directory
 > tsc -b src                            # Build src/tsconfig.json
 > tsc -b foo/release.tsconfig.json bar  # Build foo/release.tsconfig.json and bar/tsconfig.json
```

tsc -b 还支持其它一些选项：

- --verbose：打印详细的日志（可以与其它标记一起使用）
- --dry: 显示将要执行的操作但是并不真正进行这些操作
- --clean: 删除指定工程的输出（可以与--dry 一起使用）
- --force: 把所有工程当作非最新版本对待
- --watch: 观察模式（可以与--verbose 一起使用）

对于前面提到的项目，在编译`client`和`server`时就可以添加`--verbose`参数，通过打印日志可以看出`common`只编译了一次，不会被重复编译。

当编译文件完成后，可以使用通过添加`--clean`，清除已经编译好的文件。

```
tsc -b test --clean // 清除已经构建好的`test`文件
```

## 参考目录

1. [配置 tsconfig.json：工程引用，by 梁宵](https://time.geekbang.org/course/detail/211-117236)
2. [聊一聊 TypeScript 的工程引用， by YanceyOfficial](https://juejin.im/post/5ddbe560f265da7e00264371#heading-1)
3. [TypeScript official docs: Project References ](https://www.typescriptlang.org/docs/handbook/project-references.html)
