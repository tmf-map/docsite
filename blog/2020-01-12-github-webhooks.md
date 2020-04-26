---
title: 使用 Github Webhooks 进行网站自动化部署
author: Kimi Gao
author_title: Software Engineer
author_url: https://github.com/kimi-gao
author_image_url: https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/5tLtEV.jpg
tags: [webhooks, github, Kimi]
---

import Img from '../src/components/Img';

## 前言

对于一些 GitHub 上的仓库，我们希望当代码进入 master 或者其它特定分支时网站能够自动部署。此时，就需要用到 Github Webhooks 功能。本文以静态网站的自动化部署为例，介绍如何配置 GitHub webhook、如何写自动化脚本以及如何开启监听服务等，非静态网站原理也是类似。

## 整体流程

<Img width="800" legend="Happy Path" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/github-webhooks-sequence-chart.jpeg' alt='github-webhooks-sequence-chart'/>

<!--truncate-->

## Github Webhooks

按照以上的序列图，在启动监听服务之前，我们先配置一下 GitHub webhooks。在对应项目的 Github 仓库最右边有一个 Settings 标签（需要管理员权限），找到 Webhooks -> Add webhook，如下图：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/XVpKDx.png' alt='XVpKDx'/>

Secret 字段，是我们自己定义的，最好稍微复杂一点。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/wrKx51.png' alt='wrKx51'/>

最会发送一个带有`X-Hub-Signature` 的 `POST` 请求。通过它可以验证和我们服务器进行通信的合法性，为了方便我们直接用第三方的库 [github-webhook-handler](https://github.com/rvagg/github-webhook-handler) 来接收参数并做监听事件的处理等工作。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Jz7Nmw.png' alt='Jz7Nmw'/>

## Server

### 自动化 shell 脚本

自动化当然离不开一些脚本的支持，在服务器上选定一个合适的目录，创建 `auto_build.sh`，它主要是做 fetch 最新代码、build 等相关工作。

以下是一个简单的 Demo 实现：

```bash
#! /bin/bash

SITE_PATH='/home/docsite'

if [ ! -d ${SITE_PATH} ]; then
  cd /home
  git clone git@github.com:ThinkBucket/docsite.git
fi

cd ${SITE_PATH}

git fetch --all
git reset --hard origin/master

yarn install --prod
yarn build

rm -rf /home/www/*

cp -rf ${SITE_PATH}/build/* /home/www
```

这里也可以使用 `git pull`, 但不同的项目有可能 build 的时候会导致服务器端的仓库出现文件改动，保险起见建议使用 `fetch` + `reset` 的方式。

:::tip

不要直接把网站的静态目录和项目 dist 或者 build 目录当作同一个目录。

:::

否则在 build 的过程中，会删除之前打包好的文件，导致服务器短暂不能访问。当然以上脚本的内容只是一个示例，大家可以根据实际的需求灵活配置。

### 启动监听服务器

在之前的 GitHub webhook 部分，我们设置了服务器请求路径和 Secret，这些都是为了和 server 端配合使用的，此时我们需要创建一个 node server 监听服务器。

我们可以在 `auto_build.sh` 脚本的同级目录下面执行下面命令初始化一个 `package.json`:

```bash
npm init -f
```

然后执行下面命令安装上面提到的第三方库：

```bash
npm i github-webhook-handler
```

接下来创建服务的主入口文件 `index.js`：

```bash
vi index.js
```

紧接着参考 github-webhook-handler 的 demo 编辑我们的 `index.js`：

```js
var http = require('http');
var spawn = require('child_process').spawn;
var createHandler = require('github-webhook-handler');

var handler = createHandler({path: '/auto_build', secret: 'your secret...'});

http
  .createServer(function (req, res) {
    handler(req, res, function (err) {
      res.statusCode = 404;
      res.end('no such location');
    });
  })
  .listen(6666);

handler.on('error', function (err) {
  console.error('Error:', err.message);
});

handler.on('push', function (event) {
  console.log(
    'Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref
  );
  if (event.payload.ref === 'refs/heads/master') {
    runCommand('sh', ['./auto_build.sh'], function (msg) {
      console.log(msg);
    });
  }
});

function runCommand(cmd, args, callback) {
  var child = spawn(cmd, args);
  var response = '';
  child.stdout.on('data', function (buffer) {
    response += buffer.toString();
  });
  child.stdout.on('end', function () {
    callback(response);
  });
}
```

然后利用 pm2 将 node 服务跑起来：

```bash
pm2 start index.js --name=github-webhook-handler
```

到这一步服务已经跑起来了，但是对外网并不能直接访问到，所以还需要配置一下 Nginx 做一下反向代理：

```
server {
  listen 80;
  server_name www.example.com;

  ···
  location /auto_build {
    proxy_pass http://127.0.0.1:6666;
  }
  ···
}
```

到这里整个服务已经搭建完成，在服务器端会产生如下截图所示的目录结构：

<Img w="500" align="left" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/wV1n0Z.png' alt='wV1n0Z'/>

`docsite` 即 `Server Repo`, 另外`auto_build.sh` 在这里是放在 `github-webhook-server` 中，具体放在哪个位置可自行决定。后面我们测试一下即可，在此不再详述。

## Issues

:::caution

有时候 GitHub webhooks 调用并不会成功，需要 Redeliver 才行。

:::

<Img w="720" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/pmZ3qZ.png' alt='pmZ3qZ'/>

不是很稳定，具体原因有待分析。

## 参考资料

- [使用 Github 的 webhooks 进行网站自动化部署，by SkyCai](https://aotu.io/notes/2016/01/07/auto-deploy-website-by-webhooks-of-github/index.html)
- [使用 GitHub Webhook 实现静态网站自动化部署，by Jimmy Song](https://jimmysong.io/posts/github-webhook-website-auto-deploy/)
