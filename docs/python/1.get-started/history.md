---
title: History
---

import Img from '../../../src/components/Img';

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/DhC3L9.png' alt='DhC3L9'/>

Python Offical Doc: https://www.python.org/doc/

## 起源

### 创始人

> Life is short, you need Python.

<Img w="280" float="right" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/103031276634.jpg' alt='103031276634'/>

Python 的创始人是一名来自荷兰的程序员 [Guido van Rossum](https://gvanrossum.github.io/)，也因为这个名字冗长又难记，调皮的中国程序员发挥拼音的特长给他起了个特短的名称"龟(Gui)叔"，此处表示敬意。

### ABC 语言

故事要从 [ABC 语言](https://baike.baidu.com/item/ABC%E8%AF%AD%E8%A8%80/334996) 开始说起，它是由荷兰国家数学和计算机科学研究中心的 CWI 部门负责研发的一种结构化高级语言。1982 年 Guido 从阿姆斯特丹大学毕业进入了该组织，参与 ABC 语言的研发，ABC 语言致力于提高程序语言的可读性和易用性，说白了就是降低编程语言的学习门槛，让更多的非计算机专业的人也能快速上手，其实听 ABC 的名字应该也能听出来了。

### Shell

20 世纪 80 年代最流行的编程语言就是 C，C 语言功能强大但是实现过程繁琐，学习门槛也不低，而且更接近底层机器，操作系统的内核用 C 来写比较合适，而与之形成鲜明对比的是 Shell。

Shell 字面意思就是“壳”，区别于“内核”，Shell 接受用户的命令然后送到系统内核去执行。简单理解如果把系统内核比作汽车发动机，Shell 就是你的方向盘离合刹车，Shell 允许你使用些简单的脚本把系统的功能连接在一起，不是专业程序员也能轻松上手，实现一些复杂功能比如日志定期备份，批量处理文件等。

<Img w="420" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/c7IZ3t.png' alt='c7IZ3t'/>

虽然 ABC 语言在当时已经解决了可读性以及易用性的问题，但并没有获得很大的成功，一方面由于运行 ABC 语言的编译器需要更高配置的电脑，另一方面 ABC 的设计也有很多遗憾之处，比如扩展性很差，导致实现新功能的成本很大，有没有一种语言即能像 C 一样无所不能，又能像 Shell 一样简洁优雅呢？

## 发展历程

<Img w="650" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/2AKhRO.png' alt='2AKhRO'/>

### 1989：诞生于圣诞

1989 年 Guido 为了打发无聊的圣诞节假期，开始动手编写这个他想象之中的新语言，并且命名为 Python。

:::note

Python 有“蟒蛇”的意思，但是这个 Python 并不是来源于此，据 Guido 本人说这是为了纪念最喜欢的喜剧团体“[Monty Python](https://movie.douban.com/subject/1485976/)”的名字，又因为与蛇有关系，后来就有了那个盘绕的巨蟒的 logo。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/tWHAX5.png' alt='tWHAX5'/>

:::

### 1991：第一个解释器

1991 年第一个 Python 解释器正式诞生。Python 借鉴了 ABC 的很多语法规范如**强制缩进**，并且具备了**类函数异常处理**以及**模块系统**等。关于强制缩进至今也有很多争议，这也被坚持自由代码风格的程序员调侃道，不过这个缩进要正正好好进多进少了都会报错，Python 编程需要常备游标卡尺。

Python 诞生后得到了 Guido 同事的欢迎，他们也都纷纷参与到 Python 的优化和改造工作中。由于 Python 最大程度的屏蔽机器底层的细节，让 Python 解释器去接管，程序员可以专注于业务逻辑，这一点让 Python 在小圈子开始流行起来。

### 1994：1.0 发布，初出茅庐

1994 年 Python1.0 正式发布，这个版本加入了 `lambda`, `map`, `filter` 和 `reduce` 等新功能，在 Python 诞生的第一个十年，属于 Python 韬光养晦的十年，这个阶段 Python 还没有真正走进大众的视野，属于小众语言，但在小圈子里 Python 已经小有名气

### 2000：2.0 发布，茁壮生长

2000 年 Python2. 0 发布，Python2.0 加入了内存回收机制，算是基本确定了现代 Python 语言框架的基础，但是眼光独到的社区开发者对 Python 的期待就远不止如此。

### 2004：Django

2004 年 Python 的 web 框架 [Django](https://www.djangoproject.com/) 诞生，这是一个 Web 解决方案的全家桶功能强大全面，Django 的面世极大的推动了 Python 在 Web 开发领域开疆拓土。

<Img w="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/GptWTW.jpg' alt='GptWTW'/>

### 2005：Guido 进入谷歌

2005 年 Guido 进入谷歌任职，江湖传言 Guido 面试谷歌时，简历上只有一行字 **I wrote Python**，当然这事大概率就是个绯闻。

<Img w="300" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/460xP2.png' alt='460xP2'/>

谷歌从成立初期就是 Python 的忠实粉丝，谷歌搜索引擎的第一个版本服务端代码是用 Python 完成的，包括后来的谷歌地图，谷歌爬虫，谷歌广告等等都大量使用了 Python，Guido 入职谷歌后，谷歌特许 Guido 把自己一半的时间都用来维护和改进 Python，从这个方面来看谷歌和 Python 算是互相成就。

### 2008：3.x 与 2.x 兼容之路

2008 年 Pyhton3.0 发布这个版本属于大破大立，因为 Python3 并不能完全兼容 Python2，这一定程度上给 Python 社区和使用者带来了麻烦，那为什么不能兼容呢？

因为 Python2 有一些让人诟病的历史遗留问题，比如文本字符和二进制数据的二义性问题，字符编码的问题等。Guido 本人也坚持不去兼容 Python2，毕竟长痛不如短痛，兼容会让 Python3 变得臃肿，而优雅简洁一直是 Python 立世之本。

从 2008 年 Python3.0 发布到 2019 年，除了偶尔的拖更，Python 以**每年一个小版本**的速度稳健发育，2013 年左右 Python3 的库开始丰富起来。根据 Python 软件基金会和 JetBrains 一起开展的 [Python 开发者调查 2019 年调查报告](https://www.jetbrains.com/lp/python-developers-survey-2019/)，Python3 的占用率已经达到了 90%，Python2 正在慢慢退出历史舞台，并且官方也在 2020/1/1 停止了维护。

<Img w="330" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/RHUAZa.png' alt='RHUAZa'/>

### 2017：人工智能封神之路

互联网时代风起云涌，从 2006 年开始随着神经网络深度学习等技术的出现，重新点燃了一个可能会影响人类命运的高新技术科学人工智能，此时 Python 的封神之路才刚刚开始，

2016 到 2017 年谷歌开发的围棋 AI 程序 `AlphaGo`，接连击败欧洲冠军樊麾，韩国九段棋手李世石，而后又赢了世界冠军柯洁，登顶地球之巅，此时距离深蓝（Deep Blue）在国际象棋中横扫人类选手刚好 20 年，[二者之间区别](https://www.zhihu.com/question/41188831)。

<Img w="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/AlphaGo.jpeg' legend="Figure: Photo from the Financial Times." origin="http://prod-upp-image-read.ft.com/4bb1cd86-0a48-11e7-ac5a-903b21361b43" alt='AlphaGo'/>

围棋这个被认为是人类智慧遮羞布的领域，就这么猝不及防地就被机器按在地上狠狠地摩擦，这个彻底引发了舆论的狂欢，人们纷纷奔走相告 Al 时代来临了，那么问题来了：

> **Q1**: Python 和人工智能是什么关系？

其实 AI 所有核心的算法，都是依赖 C/C++完成的，这些算法属于计算密集型的任务，需要榨干硬件的每一分性能，而 Python 本身的性能只能说是可惜。Python 扮演的更多是一个“工具人”的角色，虽然不快但易学易用也易推倒，拿 Python 做做可视化，调一下 AI 接口写写展示层的逻辑就完事了。

现在的人工智能还处于“人工智障”的阶段，快速搭建一个可以调试和迭代的原型比啥都重要，用 Python 能以最低的学习成本快速上手构建原型，也就自然而然被推上了人工智能的舞台。

> **Q2**: 简单的语言不只有 Python，为什么是 Python 独得人工智能的恩宠而不是其他语言？

1. 前期历史优势太大，尤其是和 AI 息息相关的数据分析领域，Python 更是深耕多年早早占据了先机，像一些广受欢迎的数据分析库：`NumPy`, `Pandas` 等都是出自 Python 的手笔。
2. Google 和 facebook 的钟爱，这两家公司都是人工智能的先锋，而谷歌发布的深度学习框架 TensorFlow(2015 年发布)，FaceBook 推出的机器学习库 PyTorch(2017 年发布)，都是将 Python 放在了舞台的核心位置。
3. 学术圈和科研圈的钟爱，也远非其他语言所能相提并论，简单易学相关库又多，大大降低了科研人员的语言学习成本。
4. 政府都出面背书和推广，奥巴马政府和特朗普政府都投入了大量的真金白银来推广计算机教育，在中国长期霸占的中小学计算机入门语言的 VB，也随着微软的退出而逐渐失宠。

### 2018：Flask

[Flask](https://flask.palletsprojects.com/en/1.1.x/) 从 2010 年 0.1 版开始经过 8 年的磨练，终于发布 1.0 版正式版，以其轻量简单，适合开发 MicroService 等的特性，不断受到 Python 社区的追捧，并在 2019 年调查报告中显示其受欢迎度超越 Django，成功登上榜首：

<Img w="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/ktg1GV.png' alt='ktg1GV'/>

### 2019：Guido 功成身退

10 月 30 日，Guido 宣布退休，离开了 Dropbox。

<Img w="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/EuSkkx.png' alt='EuSkkx'/>

## Python 的优势

### 简单优雅

简单意味好学，那什么是优雅，同样一个功能 C 语言可能几百行，Java 可能几十行而 Python 可能几行就搞定了，这就是优雅。试想你要是自己创业开公司，没钱没人没资源你会选什么语言呢？

### 开源免费

在编程语言界开源就是硬通货，企业都是逐利的，钱能多花就少花，能少花就不花，像数据分析领域如雷贯耳的 [MATLAB](https://ww2.mathworks.cn/products/matlab.html)，想获得正版授权价格着实不菲，而且版权问题也令人寒心，以后会不会被 Python 革命我们拭目以待。

### 胶水特性

Python 一度被人们认为是一种胶水语言，它不仅能和 C/C++混编还能和 Java, C# 搞到一起，标准版本的 Python 是使用 C 编译的称为 CPython：

- C + Python= [CPython](https://cython.org/)
- Java + Python = [JPython](https://www.jython.org/)
- C# + Python = [IronPython](https://ironpython.net/)

### 可移植性

Python 是跨平台的编程语言，它可以运行在 windows、Mac 和各种 Linux/Unix 系统上。也就是说，假设在 Windows 系统下编写的 Python 程序，在 Mac 或 Linux 系统下也是可以运行的。在现在主流的语言中，这点其实也算不上特别的优点了。

### 社区力量

群众的力量是巨大的，群众的眼光是雪亮的，Python 发展如此迅速离不开无数社区程序员的添砖加瓦，而海量的第三方功能库更是社区送给 Python 的一份大礼，

### 天公作美

ABC 语言没有成功很大一部分原因是当时的硬件跟不上，20 世纪末也就是 Python 刚出来那几年，PC 飞入寻常百姓家，电脑性能大幅提高。尤其是进入 21 世纪，人们不再专注于搜刮硬件性能，而是转而关注计算机的易用性，Python 带着简洁优雅的橄榄枝迎面而来。

VB 这门语言由于可视化的优势，多年来在编外入门以及教育领域风光无限，在编程新手中可谓出尽风头，但微软为了推广 `.net` 平台，不再维护它了，此时，Python 带着简洁优雅的橄榄枝 AI 的光环扑面而来。

## Python 的应用

### 应用的领域

Python 被广泛的应用于诸多领域(>100%):

<Img w="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/5tTiNb.png' alt='5tTiNb'/>

- 数据科学: 数据科学涉及领域很广，涉及到当前火热的人工智能领域。Python 的数据科学包括数据分析、数据 可视化、数据挖掘、自然语言处理、机器学习、深度学习等。典型的 Python 库有:Numpy，Scipy，Pandas， Matplotlib，Seaborn，Scikit-learn，tensorflow 等。
- 网络爬虫: 使用 Python 可以便捷的编写网络爬虫，从网页上爬取相关信息，常用的 Python 库包括: Requests， BeautifulSoup，Scrapy 等。
- WEB 开发: 众多优秀的 WEB 框架，比如: Django、flask、tornado
- 云计算: 典型应用：Python 开发的 OpenStack
- 系统运维: 运维人员必备，slatstack(系统自动化配置和管理工具)，Ansible(自动化运维工具)
- 图形界面开发: wxPython、PyQT、TKinter

### 应用的公司

越来越多的公司选在 Python 作为其主要开发语言，例如:

- Google: GoogleGroups、Gmail、GoogleMaps、AlphaGo 等，GoogleAppEngine 支持 python 作 为开发语言
- NASA: 美国宇航局，从 1994 年起把 python 作为主要开发语言
- Dropbox: 美国最大的在线云存储网站，全部用 Python 实现，每天网站处理 10 亿个文件的上传和下载
- 豆瓣网: 图书、唱片、电影等文化产品的资料数据库网站
- 知乎: 社交问答网站，国内最大的问答社区，通过 Python 开发
- BitTorrent: bt 下载软件客户端
- gedit: Linux 平台的文本编辑器
- GIMP: Linux 平台的图像处理软件(Linux 下的 PS)
- AutodeskMaya: 3D 建模软件，支持 python 作为脚本语言
- YouTube: 世界上最大的视频网站 YouTube 就是用 Python 开发的
- Facebook: 大量的基础库均通过 Python 实现的
- Instagram: 全球最大的图片社交平台，成功案例详见：[Instagram 在 PyCon 2017 的演讲摘要](https://www.zlovezl.cn/articles/instagram-pycon-2017/)
- Redhat: 世界上最流行的 Linux 发行版本中的 yum 包管理工具就是用 python 开发的

除上面之外，还有搜狐、金山、腾讯、盛大、网易、百度、阿里、淘宝、土豆、新浪、果壳等公司都在使用 Python 完成各种各样的任务。

更多案例: https://www.python.org/about/success/

## 小结

Python 以脚本语言起家，最初被设计用来编写自动化脚本，它从人的视角出发以人为本，使得其语法有几分自然语言的风格，这就注定了它的不平凡。在面世的前十年，并没有获得多大的关注，进入 21 世纪以来，尤其是近十年间，凭借自身优雅简洁易推倒的特质，以及机器学习人工智能大数据处理等高新技术的兴起和发展，脚本这个小寺庙早已容不下 Python 这尊大佛。Python 在越来越多的领域攻城略地捷报频传，当年的名不见经传的小伙子，现在已然成长为开疆拓土的柱国大将。

Python 语言从群众中来到群众中去，随着奇点临近，AI 到来，Python 必然还会再上一层楼，互联网的风口瞬息万变，唯一不变的就是变化本身，Python 已经于风口浪尖处稳稳站住了脚跟，未来的 Python 将会更加大放异彩，Life is short, you need Python.

## 参考资料

1. [互联网圈顶级流量,你不了解的 Python 的前世今生,负门槛科普, by 冬至饮雪](https://www.bilibili.com/video/BV1Z7411s7xc)
2. [Python Knowledge Handbook, by liyangbit](https://github.com/liyangbit/Python-Knowledge-Handbook)
3. [Python Developers Survey 2019 Results, by Jetbrains](https://www.jetbrains.com/lp/python-developers-survey-2019/)
