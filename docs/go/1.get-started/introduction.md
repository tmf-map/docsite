---
title: Introduction
---

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/go-gopher.png' alt='go-cover'/>

- Go Official Doc: https://golang.org/
- GoCN: https://gocn.vip/

## Google 开源

大多数现代编程语言（如 Java，Python 等）都来自 90 年代的单线程环境。虽然一些编程语言的框架在不断地提高多核资源使用效率，例如 Java 的 Netty 等，但仍然需要开发人员花费大量的时间和精力搞懂这些框架的运行原理后才能熟练掌握。

<Img w="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/o4kx1O.jpg' legend='图：Go 语言的诞生背景'/>

Go 于 2009 年正式开源，当时多核处理器已经上市。Go 语言在多核并发上拥有原生的设计优势，Go 语言从底层原生支持并发，无须第三方库、开发者的编程技巧和开发经验。

Go 是从 2007 年末由 Robert Griesemer, Rob Pike, Ken Thompson 主持开发，后来还加入了 Ian Lance Taylor, Russ Cox 等人，并最终于 2009 年 11 月开源，在 2012 年早些时候发布了 Go 1 稳定版本。现在 Go 的开发已经是完全开放的，并且拥有一个活跃的社区。

<Img w="620" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/jH8hA3.png' />

## 特点

### 高性能

与其他现代高级语言（如 Java/Python）相比，使用 C/C++的最大好处是它们的性能。因为 C/C++是编译型语言而不是解释的语言。 处理器只能理解二进制文件，Java 和 Python 这种高级语言在运行的时候需要先将人类可读的代码翻译成字节码，然后由专门的虚拟机或解释器再转变成处理器可以理解的二进制文件。

<Img legend="图：解释型语言与编译型语言区别" w="700" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/kUutJM.jpg' />

同 C/C++一样，Go 语言也是编译型的语言，它直接将人类可读的代码编译成了处理器可以直接运行的二进制文件，执行效率更高，性能更好。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/PWYyU1.jpg' />

数据来源：https://benchmarksgame-team.pages.debian.net/benchmarksgame/

可以看出，Go 语言在性能上更接近于 Java 语言，虽然在某些测试用例上不如经过多年优化的 Java 语言，但毕竟 Java 语言已经经历了多年的积累和优化。Go 语言在未来的版本中会通过不断的版本优化提高单核运行性能。另一方面 Go 的编译速度要明显快于 Java 的编译速度：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/mQ5YFo.png' legend='图：Fibonacci斐波那契数列算法'/>

### 高并发（语言层面）

Go 语言的并发具有天生的基因支持，充分的利用多核，如下代码便可轻松开启高并发：

```go
package main

import(
  "fmt"
  "time"
)

func goFunc(i int) {
  fmt.Println("goroutine ", i, "...")
}

func main() {
  for i := 0; i < 10000; i++ {
    go goFunc(i) //开启一个并发协程
  }
  time.Sleep(time.Second)
}
```

```bash
goroutine  8959 ...
goroutine  9140 ...
goroutine  4375 ...
goroutine  9026 ...
goroutine  9027 ...
goroutine  9028 ...
goroutine  2040 ...
goroutine  9029 ...
goroutine  8961 ...
goroutine  4306 ...
goroutine  9145 ...
goroutine  4378 ...
goroutine  9169 ...
...
```

### 部署简单

- 可直接编译成机器码: Go 代码是可以直接变成二进制 `1010...` 的
- 直接运行即可部署：操作系统是可以直接 `./` 去执行的
- 不依赖其他库：最终生成的可执行程序是一个静态的(可执行)文本文件

以 `helloWorld.go` 为例，写好后，我们对它进行编译：

```bash
$ go build helloWorld.go
$ ll
-rwxr-xr-x  1 kimi  staff   2.0M Mar 27 13:05 helloWorld
-rw-r--r--@ 1 kimi  staff    73B Feb 11 23:06 helloWorld.go
```

可以发现一个 `helloWorld` 就 `2.0M` 还是比较大的，我通过 `ldd`(macOS: `otool -L`)来查看，它是否依赖其他库呢?

```bash
 $ otool -L helloWorld
 helloWorld:
        /usr/lib/libSystem.B.dylib (compatibility version 0.0.0, current version 0.0.0)
        /System/Library/Frameworks/Security.framework/Versions/A/Security (compatibility version 0.0.0, current version 0.0.0)
        /System/Library/Frameworks/CoreFoundation.framework/Versions/A/CoreFoundation (compatibility version 0.0.0, current version 0.0.0)
```

可以发现它除了标准的系统库，它不依赖于任何库，然后我们 `./helloWorld` 执行，就能够执行成功了：

```bash
$ ./helloWorld
Hello, World
```

### 语法简洁

Go 语言简单易学，学习曲线平缓，不需要像 C/C++ 语言动辄需要两到三年的学习期。Go 语言被称为“互联网时代的 C 语言”。Go 语言的风格类似于 C 语言。其语法在 C 语言的基础上进行了大幅的简化，去掉了分号，循环也只有 `for` 一种表示方法，就可以实现数值、键值等各种遍历。语言只有 25 个关键字，没有 `class` 等一些复杂的概念，非常简单容易上手。

### 代码风格统一

Go 语言提供了一套格式化工具：`go fmt`。一些 Go 语言的开发环境或者编辑器在保存时，都会使用格式化工具进行修改代码的格式化，这样就保证了不同开发者提交的代码都是统一的格式。

### 高开发效率

Go 语言和 C 语言虽然都是编译型语言，但 GO 带有 GC 垃圾回收，但也可以手动去控制内存。

<Img w="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/l6cicw.jpg' alt='图：语言的开发和运行效率'/>

Go 语言实现了开发效率与执行效率的完美结合，让你像写 Python 代码（效率）一样编写 C 代码（性能）。

## 发展现状

### 公司和领域

目前 Go 语言已经⼴泛应用于人工智能、云计算开发、容器虚拟化、⼤数据开发、数据分析及科学计算、运维开发、爬虫开发、游戏开发等领域。

- 云计算基础设施领域
  - 代表项目:docker. kubernetes、etcd、 consul、 cloudflare CDN、七牛云存储等。
- 基础后端软件
  - 代表项目:tidb、influxdb、cockroachdb 等。
- 微服务
  - 代表项目:go-kit. micro、 monzo bank 的 typhon bilibili 等。
- 互联网基础设施
  - 代表项目:以太坊、hyperledger 等。

Go 语言简单易学，天生支持并发，完美契合当下高并发的互联网生态。Go 语言的岗位需求持续高涨，目前的 Go 程序员数量少，待遇好。国内 Go 语言的需求潜力巨大，目前无论是国内大公司还是新兴互联网公司基本上都会有 Go 语言的岗位需求。下图是一些应用 Go 语言的公司：

<Img w="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/DoZqPP.png' legend='图：应用 Go 语言的公司' />

<Img w="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/DDAkEG.png' legend='图：新兴公司和行业的选择' />

除了上面列出的大公司外，很多小公司或创业公司也开始使用 Go 语言，并且很多公司把 Go 语言作为其主要开发语言。在游戏行业，对并发要求比较高，Go 也是十分适合。目前真正的“企业级编程语言”只有 Java，同时 Go 也在大力发展，前景良好，目前是供不应求的状态。大公司用的 Java 和小企业用的其实并不是一个 Java，他们有财力和人力去做一些优化，而 Go 上手就可以获得相对不错的性能。

### Gopher

Gopher Conference 是 Go 开发者一年一度的技术盛会，包括 Go 语言的发展和 Go 项目的实践分享。

Gopher Global: https://www.gophercon.com/

<Img w="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/seW0sY.jpg' alt='gopher con'/>

Gopher China: https://github.com/gopherchina/conference

> 2021 年，是 Go 语言无比重要的一年，因为 Go 即将完全解决压在 Go 头顶的三座大山：error handling、go module 和泛型。前面两个在之前陆续版本之中已经解决，终于在今年初官方通过多个版本的讨论和迭代，正式确认了泛型的语法和方案。一旦泛型发布，我们坚信 Go 即将在更多领域内开花结果。而 Go 作为一门构建现代网络软件生态系统的重要的开源语言，在这十二年里，Go 从一门小众语言，逐渐统治云计算领域，跻身最多人使用的语言 Top10，成为腾讯、阿里内部的第二大语言，全世界至少有 300 万开发者在使用。这其中，中国 Gopher 们的贡献是无法忽略的，中国 Gopher 贡献的 Go 开源项目最多，参与的分享最多，线下的活动最多，正因为有大家的积极参与才成就了中国在 Go 领域远远领先于其他国家的现状。 —— _GoCN_

## 小结

<Img w="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/nxqqAk.png'/>

现在就开始你的 Go 语言学习之旅吧！Life is short, let’s Go.

## 其他常见问题

**Q1: go 和 golang 是什么关系?**

事实上 Go 语言的称呼就是 Go，golang 只是 Go 语言官网的域名。Go 语言发明人之一的 Rob Pike 在 Twitter 上特意说明是 Go：

> Neither. The language is called Go, not Golang. http://golang.org is just the the web site address, not the name of the language.

同时在其他地方也说过原因：

> The name of our language is Go.  
> Ruby is called Ruby, not Rubylang.  
> Python is called Python, not Pythonlang.  
> C is called C, not Clang.  
> No. Wait. That was a bad example.  
> Go is called Go, not Golang.  
> Yes, yes, I know all about the searching and meta tags.  
> Sure, whatever, but that doesn't change the fact that the name of the language is Go.  
> Thank you for your consideration.

其实 Go 语言经常被叫做 Golang 的原因主要是两个：

1. http://go.org 被注册了。所以 Go 只能用 http://golang.org
2. 想要搜点啥信息时，如果搜 go 太宽泛了，特别是 go 还没有这么多用户时，搜 golang 能更精确的找到答案。

**Q2: 为什么写 Go 的人叫自己 Gopher？**

Gopher 即“地鼠”的意思，而 Go 语言的 logo 就是一个 gopher:

<Img w="160" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/gopher.png' alt='gopher'/>

## 参考资料

1. [为什么你应该学习 Go 语言？, by 李文周](https://www.liwenzhou.com/posts/Go/about_golang/)
2. [Go 语言教程, by runoob](https://www.runoob.com/go/go-tutorial.html)
3. [2021，属于 Golang 和 Gopher 的全新纪元, by GoCN](https://jishuin.proginn.com/p/763bfbd4f35f)
4. [go 和 golang 是什么关系？ - 知乎用户的回答 - 知乎](https://www.zhihu.com/question/39508749/answer/947297975)
5. [为什么写 Go 的人叫自己 Gopher？ - 知乎用户的回答 - 知乎](https://www.zhihu.com/question/367293477/answer/981552624)
