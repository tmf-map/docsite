---
title: Installation
---

## Download

- Go 官网下载地址：https://golang.org/dl/
- Go 官方大陆镜像下载地址：https://golang.google.cn/dl/

下图中的版本号可能并不是最新的，但总体来说安装教程是类似的。Go 语言更新迭代比较快，推荐使用较新版本，体验最新特性。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/FJBQf9.png' alt='go download'/>

## Installation on Mac

<Img w="650" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/go-install-on-mac.png' alt='go-install-on-mac'/>

1. Open the package file you downloaded and follow the prompts to install Go.

   The package installs the Go distribution to `/usr/local/go`. The package should put the `/usr/local/go/bin` directory in your PATH environment variable. You may need to restart any open Terminal sessions for the change to take effect.

2. Verify that you've installed Go by opening a command prompt and typing the following command:

```bash
$ go version
go version go1.15.8 darwin/amd64
```

Confirm that the command prints the installed version of Go.

You can reinstall go via installation pkg if you want upgrade go to the latest version:

<Img w="650" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Screen Shot 2021-10-14 at 9.49.01 PM.png' />

Then check the version

```bash
$ go version
go version go1.17.2 darwin/amd64
```

## Environment Variables

### GOROOT

`GOROOT` 和 `GOPATH` 都是环境变量，其中 `GOROOT` 是我们安装 go 开发包的路径。

### GOPATH

从 **Go 1.8** 版本开始，Go 开发包在安装完成后会为 `GOPATH` 设置一个默认目录，在 macOS 中默认是 `~/go`。

我们只需要记住默认的 `GOPATH` 路径在哪里就可以了，并且默认情况下 `GOROOT` 下的 `bin` 目录及 `GOPATH` 下的 `bin` 目录都已经添加到环境变量中了，我们也不需要额外配置了。

<Img w="380" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/uPic/I1yEzW.png' alt='go-path'/>

### GOPROXY

Go1.14 版本之后，都推荐使用 `go mod` 模式来管理依赖环境了，也不再强制我们把代码必须写在 `GOPATH` 下面的 `src` 目录了，你可以在你电脑的任意位置编写 go 代码。

:::tip

1.11 版本之前不支持 `go mod`，1.14 正式发布了 `go mod`。

:::

默认 `GOPROXY` 配置是：

```bash
GOPROXY=https://proxy.golang.org,direct
```

由于国内访问不到 `https://proxy.golang.org`，所以推荐使用下面的命令去修改 `GOPROXY`:

```bash
go env -w GOPROXY=https://goproxy.cn,direct
# or
go env -w GOPROXY=https://goproxy.io,direct
```

`direct` 为特殊指示符，用于指示 Go 回源到模块的源地址去抓取(比如 GitHub 等)。

## Reference

1. [从零开始搭建 Go 语言开发环境, by 李文周](https://www.liwenzhou.com/posts/Go/install_go_dev_old/)
2. [go mod 设置 GOPROXY 环境变量中的 direct 意义, by 陶士涵](https://www.cnblogs.com/taoshihan/p/14473934.html)
