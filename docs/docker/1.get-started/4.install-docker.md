---
title: Install Docker
---

## 安装

### Homebrew 安装

[Homebrew](https://brew.sh/) 的 [Cask](https://github.com/Homebrew/homebrew-cask) 已经支持 Docker Desktop for Mac，因此可以很方便的使用 Homebrew Cask 来进行安装：

```bash
$ brew install --cask docker
```

### 手动下载安装

如果需要手动下载，请点击以下 [链接](https://desktop.docker.com/mac/main/amd64/Docker.dmg) 下载 Docker Desktop for Mac。

> 如果你的电脑搭载的是 M1 芯片（`arm64` 架构），请点击以下 [链接](https://desktop.docker.com/mac/main/arm64/Docker.dmg) 下载 Docker Desktop for Mac。你可以在 [官方文档](https://docs.docker.com/docker-for-mac/apple-silicon/) 查阅已知的问题。

如同 macOS 其它软件一样，安装也非常简单，双击下载的 `.dmg` 文件，然后将那只叫 [Moby](https://www.docker.com/blog/call-me-moby-dock/) 的鲸鱼图标拖拽到 `Application` 文件夹即可（其间需要输入用户密码）。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/OdQDdH.jpg' alt='OdQDdH'/>

## 运行

从应用中找到 Docker 图标并点击运行。

<Img w="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/OculIB.jpg' alt='OculIB'/>

运行之后，会在右上角菜单栏看到多了一个鲸鱼图标，这个图标表明了 Docker 的运行状态。

<Img w="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/fAj0qW.jpg' alt='fAj0qW'/>

每次点击鲸鱼图标会弹出操作菜单。

<Img w="400" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/dJjMzm.jpg' alt='dJjMzm'/>

之后，你可以在终端通过命令检查安装后的 Docker 版本。

```bash
$ docker --version
Docker version 20.10.0, build 7287ab3
```

如果 `docker version`、`docker info` 都正常的话，可以尝试运行一个 [Nginx 服务器](https://hub.docker.com/_/nginx/)：

```bash
$ docker run -d -p 80:80 --name webserver nginx
```

服务运行后，可以访问 <http://localhost>，如果看到了 "Welcome to nginx!"，就说明 Docker Desktop for Mac 安装成功了。

<Img w="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/VNQF1b.jpg' alt='VNQF1b'/>

要停止 Nginx 服务器并删除执行下面的命令：

```bash
$ docker stop webserver
$ docker rm webserver
```

## 镜像加速

如果在使用过程中发现拉取 Docker 镜像十分缓慢，可以配置 Docker 国内镜像加速。

## 费用

2021 年 8 月 31，Docker 宣布 Docker Desktop 将转变为 Docker Personal，它将只免费提供给小型企业、个人、教育和非商业开源项目使用。对于其他用例，需要付费订阅。也就是说，对于小型企业（少于 250 名员工且年收入少于 1000 万美元）、个人使用、教育和非商业开源项目，它仍然免费。其他情况则每人每月至少 5 美元的费用。

## Podman

Podman 是一个开源的容器运行时项目，可以作为 Docker 的免费替代品。

- 安装 dmg：https://podman-desktop.io/
- 兼容 Docker 命令
  ```bash
  echo "alias docker=podman" >> ~/.zshrc
  ```

## 参考资料

1. [Docker 官方文档](https://docs.docker.com/docker-for-mac/install/)
2. [Docker — 从入门到实践：安装 Docker on macOS](https://yeasy.gitbook.io/docker_practice/install/mac)
