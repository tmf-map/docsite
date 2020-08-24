---
title: IDE & Tools
---

## IDE

### VSCode

[VSCode](https://code.visualstudio.com/) 对 Python 的支持也非常好，需要先安装微软官方的 Python 插件：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/m73SCb.png' alt='m73SCb'/>

Python Plugin 具有以下特性：

- IntelliSense 智能感知补全代码
- Linting 代码检查
- 调试支持
- 代码片段
- 单元测试
- Conda 和虚拟环境的切换
- Jupyter Notebook

运行 Python 程序可以在编辑区右击，选择以下方式运行：

<Img w="280" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/zwSV4W.png' alt='zwSV4W'/>

例如选择 `Run Current File in Python Interactive Window` 将会出现可交互式 Window：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/pH9sHr.png' alt='pH9sHr'/>

:::tip

也可以使用 [Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner) 插件运行 Python 程序：

<Img w="500" align="left" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/MGRpXA.png' alt='MGRpXA'/>

:::

更多使用方法请参考：[Python Development in Visual Studio Code, by Jon Fincher](https://realpython.com/python-development-visual-studio-code/)

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

更多配置请参考：[ANACONDA DOCUMENTATION: Using PyCharm](https://docs.anaconda.com/anaconda/user-guide/tasks/pycharm/)

另外在 PyCharm 中运行单独 Python 文件非常简单，直接在编辑区右击点 `Run` 即可。

## Tools

### Jupyter NoteBook

[Jupyter Notebook](https://jupyter-notebook.readthedocs.io/en/stable/) 就像一个草稿本，能将文本注释、数学方程、代码和可视化内容全部组合到一个易于共享的文档中，以 Web 页面的方式展示。它是数据分析、机器学习的必备工具。

<Img legend="Figure: Jupyter User Interface" origin="https://jupyter.org/" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/7B6vuE.png' alt='7B6vuE'/>

### Jupyter Lab

[Jupyter Lab](https://jupyterlab.readthedocs.io/en/stable/) 是 Jupyter Notebook 的下一代产品，集成了更多功能。它的编辑界面和 Jupyter Notebook 几乎没有区别， Jupyter Notebook 支持的功能、快捷键在这里也都支持。

<Img legend="Figure: Jupyter Lab User Interface" origin="https://jupyterlab.readthedocs.io/en/stable/" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/CtybqA.png' alt='CtybqA'/>

Jupyter Lab 的优势在于它增加了许多组件和更便捷的操作，比如：

- 同一个文档打开至多个窗口
- 手动拖拽 Cell
- 输出结果单独窗口显示
- 清除输出结果
- 临时交互试验

详细说明请参考：[Jupyter Lab - 下一代 notebook](https://zhuanlan.zhihu.com/p/38612108) 以及[官方文档和视频](https://jupyterlab.readthedocs.io/en/stable/)。

### IPython

[IPython](https://www.ipython.org/) 是一个 for Humans 的 Python 交互式 shell，用了它之后你就不想再用自带的 Python shell 了，IPython 支持变量自动补全，自动缩进，支持 bash shell 命令，内置了许多实用功能和函数，同时它也是科学计算和交互可视化的最佳平台。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/ipython.png' alt='ipython'/>

### Skulpt

[Skulpt](http://skulpt.org/using.html) 是一个用 Javascript 实现的在线 Python 执行环境，它可以让你轻松在浏览器中运行 Python 代码。使用 Skulpt 结合 CodeMirror 编辑器即可实现一个基本的在线 Python 编辑和运行环境。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/2kg0qB.png' alt='2kg0qB'/>

### Python Tutor

[Python Tutor](http://www.pythontutor.com/) 是由 Philip Guo 开发的一个免费教育工具，可帮助学生攻克编程学习中的基础障碍，理解每一行源代码在程序执行时在计算机中的过程。通过这个工具，教师或学生可以直接在 Web 浏览器中编写 Python 代码，并逐步可视化地运行程序。如果你不知道代码在内存中是如何运行的，不妨把它拷贝到 Tutor 里可视化执行一遍，加深理解。它不仅支持 Python，还支持 Java、JavaScript、Ruby、C 语言。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/JsNZrE.gif' alt='JsNZrE'/>

## Reference

1. [5 个 Python 开发实用工具, by 刘志军](https://foofish.net/pycon-tools.html)
2. [ANACONDA DOCUMENTATION: Using PyCharm](https://docs.anaconda.com/anaconda/user-guide/tasks/pycharm/)
3. [Python Development in Visual Studio Code, by Jon Fincher](https://realpython.com/python-development-visual-studio-code/)
4. [Jupyter Lab - 下一代 notebook, by Dwzb](https://zhuanlan.zhihu.com/p/38612108)
