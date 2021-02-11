---
title: Installation
---

## 下载地址

- Go 官网下载地址：https://golang.org/dl/
- Go 官方大陆镜像站：https://golang.google.cn/dl/

下图中的版本号可能并不是最新的，但总体来说安装教程是类似的。Go 语言更新迭代比较快，推荐使用较新版本，体验最新特性。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/FJBQf9.png' alt='go download'/>

## Mac 安装

<Img w="650" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/go-install-on-mac.png' alt='go-install-on-mac'/>

1. Open the package file you downloaded and follow the prompts to install Go.

   The package installs the Go distribution to `/usr/local/go`. The package should put the `/usr/local/go/bin` directory in your PATH environment variable. You may need to restart any open Terminal sessions for the change to take effect.

2. Verify that you've installed Go by opening a command prompt and typing the following command:

```bash
$ go version
go version go1.15.8 darwin/amd64
```

Confirm that the command prints the installed version of Go.
