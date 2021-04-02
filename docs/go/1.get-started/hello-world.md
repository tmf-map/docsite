---
title: Hello World
---

## First Go Snippet

```go title="hello.go"
// 所有的 Go 文件都必须以 package <something> 开头
// 对于独立运行的执行文件必须是 package main
package main

import "fmt" // 实现格式化的 I/O

func main() {
  fmt.Println("Hello, World") // public 的方法要大写开头
}
```

- `package main` 必须首先出现，紧跟着是 `import`，然后是其他所有内容。
- 当 Go 程序在执行的时候，首先调用的函数 是 `main.main()`，这也是从 C 语言中继承而来。

## go build

`go build` 表示将源代码编译成可执行文件。

```bash
$ go build hello.go
$ ll
-rwxr-xr-x  1 kimi  staff   2.0M Apr  2 21:50 hello
-rw-r--r--@ 1 kimi  staff    73B Apr  2 21:50 hello.go
```

可以发现已经生成了 `hello` 文件，直接运行即可：

```bash
$ ./hello
Hello, World
```

## go install

go install 表示安装的意思，它先编译源代码得到可执行文件，然后将可执行文件移动到 GOPATH 的 bin 目录下。因为我们的环境变量中配置了 GOPATH 下的 bin 目录，所以我们就可以在任意地方直接执行可执行文件了。
