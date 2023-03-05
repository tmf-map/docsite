---
title: Homebrew
sidebar_label: 4. Homebrew
---

[Homebrew](https://brew.sh/) 可以安装 Apple 没有预装但非常需要的东西。它会将软件包安装到独立目录，并将其文件软链接至 `/usr/local`。

:::note

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

## Issues
