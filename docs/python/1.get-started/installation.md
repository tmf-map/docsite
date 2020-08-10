---
title: Installation
---

import Img from '../../../src/components/Img';

## Anaconda

Python 的版本分为官方版和发行版：

- 官方版：解释器 + 标准库
- 发行版：解释器 + 标准库 + 常用软件包

安装 Python 的方法有很多种，在 macOS 上也自带了一个默认的 Python，但对于新手或者不想折腾的，可以直接上手 Anaconda 去管理 Python 和一些 package。它也是 Python 最流行的发型版本，里面包含很多常用的科学计算库，下面将重点介绍 Anaconda 的使用。

### Anaconda/Minconda/Conda

<Img w="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/kNs0Ix.png' alt='kNs0Ix' legend="图：Anaconda/Minconda/Conda 之间关系"/>

:::tip

可以简单理解：Anaconda > Miniconda > Conda

:::

如果有以下全部需求，可以选 **Anaconda**，反之则可以选 **Miniconda**。

- 不想折腾 Python 环境
- 不想使用的时候手动安装一些常用的科学计算包
- 硬盘剩余空间不紧张

### Installation

Go to https://www.anaconda.com/products/individual and [download](https://www.anaconda.com/products/individual).

<Img w="620" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/OhK5Re.png' alt='OhK5Re'/>

:::caution

- Anaconda 安装位置：`~/opt/anaconda3`
- Python 环境目录 `~/opt/anaconda3/bin/python`

:::

安装后即可以打开 “Anaconda-Navigator”

<Img w="750" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/iR4tZl.png' alt='iR4tZl'/>

### Commands

- Pip：https://pip.pypa.io/en/stable/installing/ 包依赖的管理器

```bash
# 创建一个名为python34的环境，指定Python版本是3.4
conda create --name python34 python=3.4

# 激活/退出某个环境
source activate python34     # for Linux & Mac
source deactivate python34    # for Linux & Mac

# 删除一个已有的环境
conda remove --name python34 --all

# 查看已安装的环境
conda info -e
```

```bash
# 安装
conda install xxxx

# 查看当前环境下已安装的包
conda list

# 查看某个指定环境的已安装包
conda list -n python34 # n 表示指定某个环境

# 查找package信息
conda search numpy
conda update numpy
conda remove numpy

# 更新conda，保持conda最新
conda update conda

# 更新anaconda
conda update anaconda

# 更新python
conda update python
```

:::tip

如果不用 `-n` 指定环境名称，则被安装在当前活跃环境 也可以通过 `-c` 指定通过某个 channel 安装。

:::

```bash
# 添加Anaconda的TUNA镜像
# TUNA的help中镜像地址加有引号，需要去掉
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/

# 设置搜索时显示通道地址
conda config --set show_channel_urls yes
```

## CLI

```bash
$ python
Python 3.7.6 (default, Jan  8 2020, 13:42:34)
[Clang 4.0.1 (tags/RELEASE_401/final)] :: Anaconda, Inc. on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> exit()
```

`exit()` 用于退出可交互式执行环境。安装了 Anaconda 之后 `python` 会自动指向 `python3`，这一点还是比较方便的。

Hello World

## Reference

1. [Conda official docs: Downloading conda](https://docs.conda.io/projects/conda/en/latest/user-guide/install/download.html#anaconda-or-miniconda)
