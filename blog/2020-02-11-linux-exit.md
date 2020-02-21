---
title: Linux 中的 exit 命令
author: Goroyal Dai
author_title: Software Engineer
author_url: https://github.com/goroyal
author_image_url: https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/10303133.jpeg
tags: [Linux, Goroyal]
---

我们在 Linux 的命令行里面会用到`exit`，比方说退出某个 shell。在 shell 脚本中这个命令可以终止脚本的执行。`exit`后面是可以接一个数字表示退出时候的状态。

<!--truncate-->

`exit(0)`一般表示成功结束，其他的是不成功的，如`exit(1)`。对于一些系统程序而言，这些错误编号是有含义的：

| exit 错误编号 | 含义                           |
| ------------- | ------------------------------ |
| 1             | 一般性未知错误                 |
| 2             | 不适合的 shell 命令            |
| 126           | 命令不可执行                   |
| 127           | 没找到命令                     |
| 128           | 无效的退出参数                 |
| 128 + x       | 与 Linux 信号`x`相关的严重错误 |
| 130           | 通过`Ctrl + C`终止的命令       |
| 255           | 正常范围之外的退出状态码       |

不带数字直接`exit`，脚本的退出状态码就由脚本里面最后执行的命令来决定（即`exit`之前的命令）。

至于`exit $?`，它和`exit`是一样的作用。

## 参考资料

- [Linux 命令大全](http://man.linuxde.net/exit)
- [退出和退出状态码](https://www.ixdba.net/docs/shell/exit-status.html)
