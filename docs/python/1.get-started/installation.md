---
title: Installation
---

import Img from '../../../src/components/Img';

Python 的版本分为官方版和发行版：

- 官方版：解释器（Interpreter）+ 标准库
- 发行版：解释器（Interpreter）+ 标准库 + 常用软件包

安装 Python 的方法有很多种，在 macOS 上也自带了一个默认的 Python，但对于新手或者不想折腾的，可以直接上手 Anaconda 去管理 Python 和一些 package。它也是 Python 最流行的发型版本，里面包含很多常用的科学计算库，下面将重点介绍 Anaconda 的使用。

## Anaconda

### Anaconda/Minconda/Conda

<Img w="550" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/kNs0Ix.png' alt='kNs0Ix' legend="图：Anaconda/Minconda/Conda 之间关系"/>

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

- Anaconda path: `~/opt/anaconda3`
- Conda path: `~/opt/anaconda3/bin/conda`
- Python path: `~/opt/anaconda3/bin/python`

:::

安装后即可以打开 “Anaconda-Navigator”

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/iR4tZl.png' alt='iR4tZl'/>

## CLI

```bash
(base) ➜ python
Python 3.7.6 (default, Jan  8 2020, 13:42:34)
[Clang 4.0.1 (tags/RELEASE_401/final)] :: Anaconda, Inc. on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> print('Hello World')
Hello World
>>> exit()
```

`exit()` 用于退出可交互式执行环境。

:::tip

- 比较方便的一点是安装了 Anaconda 之后 `python` 会自动指向 `python3`。
- 命令行开头的 `(base)` 指默认的环境，利用 conda 切换环境后，会显示为对应的环境名。

:::

## Conda

Conda 是**包管理器**+**环境管理器**，类似于 npm + nvm。Conda 虽然因 Python 项目而创造，但可适用多种语言：Python, R, Ruby, Lua, Scala, Java, JavaScript, C/C++, FORTRAN 等。

```bash
# 验证 conda 已被安装
conda --version
# or
conda -V
```

### Environment

```bash
# 创建一个名为 python36 的环境，指定 Python 版本是 3.6，多个包以空格隔开
conda create --name python36 python=3.6 # --name alias -n
conda create --name <new_env_name> --clone <copied_env_name>

# 激活/退出某个环境
source activate python36 # for Linux & Mac
source deactivate python36 # for Linux & Mac

# 删除一个已有的环境
conda remove --name python36 --all

# 查看已安装的环境
conda info --envs
conda info -e
conda env list
```

:::tip

新创建的环境将会被保存在 `~/.conda/envs` 目录下。

:::

可以在对应环境下使用 export 命令导出 `environment.yml` 文件，类似 `package.json`：

```bash
conda env export > environment.yml
```

如果在项目的根目录下已经有 `environment.yml` 文件，如下所示：

```yaml
name: myenv
channels:
  - conda-forge
dependencies:
  - python=3.6
  - bokeh=0.9.2
  - numpy=1.9.*
  - nodejs=0.10.*
  - flask
  - pip:
      - Flask-Testing
```

那么在根目录下运行如下命令，将会自动创建一个 `myenv` 的环境并从定义的 channel 中安装相应的依赖。

```bash
conda env create -f environment.yml
```

如果后面 `environment.yml` 文件有更新的话可以运行以下命令更新依赖项：

```bash
conda env update --prefix ./env --file environment.yml  --prune
```

:::tip

`--prune` 选项将会删除环境中不再需要的所有依赖项。

:::

### Package

```bash
# 包的增删改查
conda install xxxx
conda search xxxx
conda update xxxx
conda remove xxxx

# 查看当前环境下已安装的包
conda list

# 查看某个指定环境的已安装包
conda list -n python36 # n 表示指定某个环境
```

:::tip

- `-n` 指定环境名称，如果不加则被安装在当前活跃环境
- `-c` 指定通过某个 channel 安装

:::

conda 也可以升级 conda 自身，anaconda 以及 python：

```bash
conda update conda # 更新 conda，类似 `npm i -g npm`
conda update anaconda # 更新 anaconda
conda update python # 更新 python
```

`update` 命令其实并不一定将 package 升级到最新版，而是升级到可兼容当前环境的其他包的最新版，比如现有 py 是 3.7，执行 `conda update python` 并不会将 python 升级到 3.8，而是只会升级到最新的 3.7 版本的 Python，其他的包可能也会进行相应的兼容升级：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Screen Shot 2020-08-15 at 11.56.29 PM.png' alt='ScreenShot2020-08-15at11.56.29PM'/>

想要升级 Python 到 3.8 版的话可以运行 `conda install python=3.8`，这将会更新一大波需要升级才能兼容 3.8 的包，其中也包括一部分 anaconda 相关的包：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Screen Shot 2020-08-15 at 11.54.14 PM.png' alt='ScreenShot2020-08-15at11.54.14PM'/>

:::tip

另外也可以直接升级 anaconda，它也会升级相应的 python 和 conda。

:::

### Config

```bash
# 添加Anaconda的TUNA镜像
# TUNA的help中镜像地址加有引号，需要去掉
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/

# 设置搜索时显示通道地址
conda config --set show_channel_urls yes
```

## Pip

pip 是用于安装和管理软件包的**包管理器**，类似于 npm。

- pip 编写的语言：Python
- Python 中默认安装的版本：
  - Python 2.7.9 及后续版本：默认安装，命令为 `pip`
  - Python 3.4 及后续版本：默认安装，命令为 `pip3`
- pip 名称的由来：pip 采用的是递归缩写进行命名的。其名字被普遍认为来源于 2 处：
  - **P**ip **i**nstalls **P**ackages
  - **P**ip **i**nstalls **P**ython

:::tip

- pip 只是包管理器，无法对环境进行管理。因此如果想在指定环境中使用 pip 进行安装包，则需要先切换到指定环境中，再使用 pip 命令安装包。
- pip 无法更新 python，因为 pip 并不将 python 视为包。
- pip 可以安装一些 conda 无法安装的包；conda 也可以安装一些 pip 无法安装的包。因此当使用一种命令无法安装包时，可以尝试用另一种命令。

:::

## Other environment manager

### Virtualenv

[Virtualenv](https://virtualenv.pypa.io/en/latest/) 为应用提供了隔离的 Python 运行环境，解决了不同应用间多版本的冲突问题。。当一个程序需要使用 Python 2.7 版本，而另一个程序需要使用 Python 3.6 版本，如何同时使用这两个程序？如果将所有程序都安装在系统下的默认路径，如：`/usr/lib/python2.7/site-packages`，当升级了某个程序时，将会对其他的程序造成影响。

### Pipenv

Pipenv is a dependency manager for Python projects. If you’re familiar with Node.js’ npm or Ruby’s bundler, it is similar in spirit to those tools. While pip can install Python packages, Pipenv is recommended as it’s a higher-level tool that simplifies dependency management for common use cases.

See more: https://docs.python-guide.org/dev/virtualenvs/

## Reference

1. [Conda official docs: Downloading conda](https://docs.conda.io/projects/conda/en/latest/user-guide/install/download.html#anaconda-or-miniconda)
2. [Conda official docs: Managing environments](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html)
3. [Conda official docs: conda update](https://docs.conda.io/projects/conda/en/latest/commands/update.html)
