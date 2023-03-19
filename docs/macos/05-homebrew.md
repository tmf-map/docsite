---
title: Homebrew
sidebar_label: 4. Homebrew
---

### Introduction

[Homebrew](https://brew.sh/) is a package manger, and it supports `macOS`and`Linux`as for now. It mainly includes four part: `brew`, `homebrew-core` , `homebrew-cask`, `homebrew-bottles`.

|名称|说明|
|-|-|
|brew|Homebrew 源代码仓库|
|homebrew-core|Homebrew 核心源|
|homebrew-cask|提供 macOS 应用和大型二进制文件的安装|
|homebrew-bottles|预编译二进制软件包|


相关用到的脚本 [homebrew-install][github] 都托管在`GitHub`上。

:::tip

Sometimes there maybe a delay and no found for some package when using mirror. In this case, homebrew wil fall back to default domain.

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/1hmAO6.jpg' alt='1hmAO6'/>

:::

Homebrew 可以安装 Apple 没有预装但非常需要的东西。它会将软件包安装到独立目录，并将其文件软链接至 `/usr/local`。

:::tip

- macOS Intel: `/usr/local`
- macOS ARM: `/opt/homebrew`
- Linux: `/home/linuxbrew/.linuxbrew`

:::

## Install

Paste below in a macOS Terminal or Linux shell prompt.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Command Usage

https://docs.brew.sh/Manpage

### 安装包

```bash
brew install <package@version>
```

brew 要及时更新，否则 `brew install` 有些包新的版本可能找不到。

### 卸载包

```bash
brew rm <package>          # 删除某个包
brew uninstall <package>   # 删除某个包
brew uninstall --force <package> # 删除所有版本
```

### 搜索包

```bash
brew search <package>
```

### 列出已安装的包

```bash
brew list
```

You can also use `grep` to filter package:

```bash
$ brew list | grep python
python@3.10
python@3.8
python@3.9
```

### 更新 Homebrew 自己

更新包，把所有的 Formula 目录更新，并且会对本机已经安装并有更新的软件用 `*` 标明。

```bash
brew update
```

### 更新包

```bash
brew upgrade              # 更新所有的包
brew upgrade <package>    # 更新指定的包
```

### 查看哪些安装包需要更新

```bash
brew outdated
```

### 查看安装包的相关信息

```bash
brew info <package>          # 显示某个包的信息
brew info                    # 显示安装了包数量，文件数量，和总占用空间
brew deps --installed --tree # 查看已安装的包的依赖，树形显示
```

### 显示包依赖

```bash
brew deps
brew deps --installed --tree # 显示包的依赖树
```

### 清理旧版本

```bash
brew cleanup              # 清理所有包的旧版本
brew cleanup <package>    # 清理指定包的旧版本
brew cleanup -n           # 查看可清理的旧版本包，不执行实际操作
```

### 启动 web 服务器

可以通过浏览器访问 http://localhost:4567/ 来同网页来管理包:

```bash
brew server
```

### 锁定不想更新的包

```bash
brew pin <package>      # 锁定某个包
brew unpin <package>    # 取消锁定
```

## Mirror

mirror 网速（好坏）顺序：[https://mirrors.ustc.edu.cn](https://mirrors.ustc.edu.cn/) > [https://mirrors.tuna.tsinghua.edu.cn/git/homebrew](https://mirrors.tuna.tsinghua.edu.cn/git/homebrew) > [https://github.com/Homebrew/](https://github.com/Homebrew/)

```bash
# ustc 只有以下4个
git -C "$(brew --repo)" remote set-url origin https://mirrors.ustc.edu.cn/brew.git
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
git -C "$(brew --repo homebrew/cask)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-cask.git
git -C "$(brew --repo homebrew/cask-versions)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-cask-versions.git
# 其他用 tsinghua 作为第二选择，还有一些 tsinghua 也没有的就默认 github 官方的
# 如果运行后显示没有repo就略过
git -C "$(brew --repo homebrew/cask-fonts)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask-fonts.git
git -C "$(brew --repo homebrew/cask-drivers)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask-drivers.git
git -C "$(brew --repo homebrew/command-not-found)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-command-not-found.git
```

更换上游后需重新设置 git 仓库 HEAD：

```bash
brew update-reset
```

:::note

更换镜像本质上就是修改本地 brew git repo 的 remote url.

:::

如果要想换回官方的就把以上 [https://mirrors.ustc.edu.cn](https://mirrors.ustc.edu.cn/) 和[https://mirrors.tuna.tsinghua.edu.cn/git/homebrew](https://mirrors.tuna.tsinghua.edu.cn/git/homebrew) 换成 [https://github.com/Homebrew](https://github.com/Homebrew) 后重新执行一遍：

```bash
git -C "$(brew --repo)" remote set-url origin https://github.com/Homebrew//brew.git
git -C "$(brew --repo homebrew/core)" remote set-url origin https://github.com/Homebrew/homebrew-core.git
git -C "$(brew --repo homebrew/cask)" remote set-url origin https://github.com/Homebrew/homebrew-cask.git
git -C "$(brew --repo homebrew/cask-versions)" remote set-url origin https://github.com/Homebrew/homebrew-cask-versions.git
git -C "$(brew --repo homebrew/cask-fonts)" remote set-url origin https://github.com/Homebrew/homebrew-cask-fonts.git
git -C "$(brew --repo homebrew/cask-drivers)" remote set-url origin https://github.com/Homebrew/homebrew-cask-drivers.git
git -C "$(brew --repo homebrew/command-not-found)" remote set-url origin https://github.com/Homebrew/homebrew-command-not-found.git
```

:::note

In fact, homebrew repo is git repo. You can go to the following path to see what consist of homebrew:

```bash
$ ll /usr/local/Homebrew/Library/Taps/homebrew
total 0
drwxr-xr-x  17 xx  admin   544B Oct  8  2021 homebrew-cask
drwxr-xr-x  11 xx  admin   352B Feb 24 10:10 homebrew-cask-drivers
drwxr-xr-x  13 xx  admin   416B Feb 24 10:09 homebrew-cask-fonts
drwxr-xr-x  12 xx  admin   384B Feb 24 10:06 homebrew-cask-versions
drwxr-xr-x  14 xx  admin   448B Feb 24 10:10 homebrew-command-not-found
drwxr-xr-x  16 xx  admin   512B Oct  8  2021 homebrew-core
drwxr-xr-x  13 xx  admin   416B Jan 17 13:46 homebrew-services
```

:::

To check homebrew git remote url, run:

```bash
$ git -C "$(brew --repo homebrew/core)" remote get-url origin
https://mirrors.ustc.edu.cn/homebrew-core.git
```

:::tip

If encounter no such file or directory when change mirror url as following: 

```bash
$ git -C "$(brew --repo)" remote set-url origin https://github.com/Homebrew//brew.git
$ git -C "$(brew --repo homebrew/core)" remote set-url origin https://github.com/Homebrew/homebrew-core.git
$ git -C "$(brew --repo homebrew/cask)" remote set-url origin https://github.com/Homebrew/homebrew-cask.git
$ git -C "$(brew --repo homebrew/cask-versions)" remote set-url origin https://github.com/Homebrew/homebrew-cask-versions.git
fatal: cannot change to '/usr/local/Homebrew/Library/Taps/homebrew/homebrew-cask-versions': No such file or directory
```

Go to `/usr/local/Homebrew/Library/Taps/homebrew`, and then run:

```bash
$ gcl https://mirrors.ustc.edu.cn/homebrew-cask-versions.git
Cloning into 'homebrew-cask-versions'...
remote: Enumerating objects: 254739, done.
remote: Total 254739 (delta 0), reused 0 (delta 0), pack-reused 254739
Receiving objects: 100% (254739/254739), 66.53 MiB | 15.62 MiB/s, done.
Resolving deltas: 100% (176688/176688), done.
```

:::

## Issues

<details>

<summary>1. There is no permission when run `brew install`</summary>

For Example:

```bash
$ brew install podman-compose
==> Downloading https://ghcr.io/v2/homebrew/portable-ruby/portable-ruby/blobs/sha256:1f50bf80583bd436c9542d4fa5ad47df0ef0f0bea22ae710c4f04c42d7560bca
####################################################################################################################################################################################################################################################### 100.0%
==> Pouring portable-ruby-2.6.8_1.el_capitan.bottle.tar.gz
==> Downloading https://formulae.brew.sh/api/formula.jws.json
######################################################################## 100.0%
==> Downloading https://formulae.brew.sh/api/cask.jws.json
######################################################################## 100.0%
Error: The following directories are not writable by your user:
/usr/local/bin

You should change the ownership of these directories to your user.
  sudo chown -R $(whoami) /usr/local/bin

And make sure that your user has write permission.
  chmod u+w /usr/local/bin
```

Ensure you have the sudo permission and run as tips:

```bash
$ sudo chown -R $(whoami) /usr/local/bin
$ chmod u+w /usr/local/bin
```

</details>

<details>

<summary>2. homebrew-core is a shallow clone.</summary>

Remove homebrew-core and run `brew update` again.

<Img w="620" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/I8q3Fk.jpg' alt='I8q3Fk'/>

<Img w="620" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/dm9g6s.jpg' alt='dm9g6s'/>

If it's hard to download after removing `homebrew-core`, you can change to other mirror as follows: 

```bash
cd /usr/local/Homebrew/Library/Taps/homebrew
git clone https://mirrors.ustc.edu.cn/homebrew-core.git
```

</details>

## References

1. [清华大学开源软件镜像站: Homebrew / Linuxbrew 镜像使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/)
1. [USTC Mirror Help 文档: Homebrew Bottles 源使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/)