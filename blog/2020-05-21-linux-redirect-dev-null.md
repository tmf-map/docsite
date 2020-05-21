---
title: Linux 中的 2> /dev/null
author: Goroyal Dai
author_title: Software Engineer
author_url: https://github.com/goroyal
author_image_url: https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/10303133.jpeg
tags: [Linux, Goroyal]
---

在 Linux 的 shell 命令或者脚本中，我们经常看到这样的命令：

``` shell
2> /dev/null
```

这是何意？

<!--truncate-->

## Linux 进程
以 bash 为例，shell 中执行一个命令时，其实是由 bash shell fork 出一个子进程，然后在这个子进程中运行相应的命令，直至退出。Linux 里的进程的数据结构如下：

``` C
struct task_struct {
	// 进程状态
	long state;
	// 虚拟内存结构体
	struct mm_struct *mm;
	// 进程号
	pid_t pid;
	// 指向父进程的指针
	struct task_struct __rcu *parent;
	// 子进程列表
	struct list_head children;
	// 存放文件系统信息的指针
	struct fs_struct *fs;
	// 一个数组，包含该进程打开的文件指针
	struct files_struct *files;
};
```

`task_struct` 就是 Linux 对于一个进程的描述，也可以称之为进程描述符。其中的 `files` 指针指向一个数组，表示当前进程打开的所有文件。

**每个进程被创建时，`files` 指向的数组前三位被填入默认值，分别指向标准输入流、标准输出流、标准错误流。我们常说的「文件描述符」就是指这个文件指针数组的索引，所以程序的文件描述符默认情况下 0 是输入，1 是输出，2 是错误。**

:::tip

Linux 中的所有设备都是抽象成文件的，设备可以当作文件一样读和写。

:::

## 重定向
Linux shell 里通过 `>`、`<`进行输出、输入的重定向。

* `>`：将 shell 命令的输出指向某个地方，可以是文件，也可以是内存里的某个变量。比如 `ls -l > file.txt` 就是把当前路径下的文件信息保存到 file.txt 文本中，如果没有这个重定向，它会将结果输出到显示器屏幕上。
* `<`：从某个地方读取内容作为 shell 命令的输入，可以是文件，也可以是内存里的某个变量。比如 `{command} < file.txt`，如果没有这个重定向，它会从键盘读取输入。

此外，shell 还可以通过 `|` 将前一个命令的输出作为下一个命令的输入，比如：

``` shell
# 在命令历史中找到包含 ssh 字符串的命令
history | grep ssh
```

## 2> /dev/null
通过上面的章节可以知道，`2` 表示标准错误，`>` 表示将标准错误重定向到某个地方。

`/dev/null` 是一个特殊文件，在Unix系统中称为 null 设备。 通俗地说，它也称为比特桶（bit bucket，也译作比特垃圾桶）或黑洞（blackhole），因为它会立即丢弃写入其中的任何内容，并且在读取时仅返回文件结束EOF。

所以这个命令合起来就是将忽略执行命令产生的错误。比如：

``` shell
# 删除当前路径下的folder目录，如果不存在则忽略错误
rm -r folder 2> /dev/null
```

:::caution

`2`和`>`不能有空格

:::

## 参考
* [What is a Process?](https://bash.cyberciti.biz/guide/What_is_a_Process%3F)
* [Linux的进程、线程、文件描述符是什么](https://github.com/labuladong/fucking-algorithm/blob/master/技术/linux进程.md)
* [维基百科：/dev/null](https://zh.wikipedia.org/wiki//dev/null)