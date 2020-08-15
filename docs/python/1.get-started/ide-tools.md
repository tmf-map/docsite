---
title: IDE & Tools
---

import Img from '../../../src/components/Img';

## IDE

### VSCode

[VSCode](https://code.visualstudio.com/) 可以当成文本编辑器使用，需要安装微软官方的 Python 插件：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/m73SCb.png' alt='m73SCb'/>

Hello World

### PyCharm

[PyCharm](https://www.jetbrains.com/pycharm/) 是一个强大的 IDE，非常适合大型项目，在代码重构，查找，提示等方面比较强大，不需要安装一些额外的插件。PyCharm 也分为 Professional 和 Community 版：

<Img w="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/eBUPln.png' alt='eBUPln'/>

Professional 版（收费）适用于基于 Python 的 Web 项目，对 HTML, JS, 和 SQL 的支持比较好，Debug node server 的时候也比较方便，而 Community 版（免费）则专注于 Python 程序。

通过 PyCharm 配置 Python 环境比较简单：

<Img w="550" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/zaFnq7.png' alt='zaFnq7'/>

`Project Interpreter` 将会列出 Python 解释器和其对应的 Packages：

<Img w="650" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/gHgDWp.png' alt='gHgDWp'/>

点击解释器下拉框右边的设置按钮将可以添加新的 Python 环境，参考如下设置：

<Img w="650" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/C7BncM.png' alt='C7BncM'/>

Hello World

## Tools

Python Tutor 是由 Philip Guo 开发的一个免费教育工具，可帮助学生攻克编程学习中的基础障碍，理解每一行源代码在程序执行时在计算机中的过程。通过这个工具，教师或学生可以直接在 Web 浏览器中编写 Python 代码，并逐步可视化地运行程序。如果你不知道代码在内存中是如何运行的，不妨把它拷贝到 Tutor 里可视化执行一遍，加深理解。

地址：http://www.pythontutor.com/

### Jupyter NoteBook

[Jupyter Notebook](https://jupyter.org/) 就像一个草稿本，能将文本注释、数学方程、代码和可视化内容全部组合到一个易于共享的文档中，以 Web 页面的方式展示。它是数据分析、机器学习的必备工具。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/7B6vuE.png' alt='7B6vuE'/>

The Jupyter Notebook is an open-source web application that allows you to create and share documents that contain live code, equations, visualizations and narrative text. Uses include: data cleaning and transformation, numerical simulation, statistical modeling, data visualization, machine learning, and much more.

在网页上进行编程，简单调试代码的时候比较常用。

### Jupyter Lab

Jupyter’s Next-Generation Notebook Interface

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/8xn3CY.png' alt='8xn3CY'/>

JupyterLab is a web-based interactive development environment for Jupyter notebooks, code, and data. JupyterLab is flexible: configure and arrange the user interface to support a wide range of workflows in data science, scientific computing, and machine learning. JupyterLab is extensible and modular: write plugins that add new components and integrate with existing ones.

### IPython

[IPython](https://www.ipython.org/) 是一个 for Humans 的 Python 交互式 shell，用了它之后你就不想再用自带的 Python shell 了，IPython 支持变量自动补全，自动缩进，支持 bash shell 命令，内置了许多实用功能和函数，同时它也是科学计算和交互可视化的最佳平台。

交互式的命令行解释器，可以直接看到效果，以及代码提示功能

### Skulpt

Skulpt 是一个用 Javascript 实现的在线 Python 执行环境，它可以让你轻松在浏览器中运行 Python 代码。使用 skulpt 结合 CodeMirror 编辑器即可实现一个基本的在线 Python 编辑和运行环境。

地址：http://www.skulpt.org/

## Reference

1. [5 个 Python 开发实用工具, by 刘志军](https://foofish.net/pycon-tools.html)
