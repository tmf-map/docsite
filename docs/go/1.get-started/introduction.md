---
title: Introduction
---

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/go-gopher.png' alt='go-cover'/>

Go Official Doc: https://golang.org/

## Google 开源

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/FCIo2t.png'/>

其中包含了 Unix 的作者、Chrome V8 的作者等业界大佬，

<Img w="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/o4kx1O.jpg' legend='图：Go 语言的诞生背景'/>

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

#### 可直接编译成机器码

#### 不依赖其他库

#### 直接运行即可部署

### 语法简洁

Go 语言简单易学，学习曲线平缓，不需要像 C/C++ 语言动辄需要两到三年的学习期。Go 语言被称为“互联网时代的 C 语言”。Go 语言的风格类似于 C 语言。其语法在 C 语言的基础上进行了大幅的简化，去掉了不需要的表达式括号，循环也只有 `for` 一种表示方法，就可以实现数值、键值等各种遍历。语言只有 25 个关键字，没有 `class` 等一些复杂的概念，非常简单容易上手。

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

Go 语言简单易学，天生支持并发，完美契合当下高并发的互联网生态。Go 语言的岗位需求持续高涨，目前的 Go 程序员数量少，待遇好。国内 Go 语言的需求潜力巨大，目前无论是国内大厂还是新兴互联网公司基本上都会有 Go 语言的岗位需求。下图是应用 Go 语言的公司举例：

<Img w="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/DoZqPP.png' legend='图：应用 Go 语言的公司' />

<Img w="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/DDAkEG.png' legend='图：新兴公司和行业的选择' />

除了上面列出的大厂外，很多小型公司或创业公司也开始使用 Go 语言，并且很多公司把 Go 语言作为其主要开发语言。

做游戏，对并发要求比较高，现在“真正的企业级编程语言”只有 Java，现在 Go 也在大力发展，前景良好。大厂用的 Java 和你用的不是一个 Java。有财力和人力去做一些优化。Go 语言在北京招聘的比较多，但 Go 工程师目前比较少。

### Gopher

https://www.gophercon.com/

<Img w="650" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/seW0sY.jpg' alt='gopher con'/>

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

<Img w="200" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/gopher.png' alt='gopher'/>

## 参考资料

1. [为什么你应该学习 Go 语言？, by 李文周](https://www.liwenzhou.com/posts/Go/about_golang/)
2. [go 和 golang 是什么关系？ - 知乎用户的回答 - 知乎](https://www.zhihu.com/question/39508749/answer/947297975)
3. [为什么写 Go 的人叫自己 Gopher？ - 知乎用户的回答 - 知乎](https://www.zhihu.com/question/367293477/answer/981552624)
