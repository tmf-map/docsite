---
title: Unicode & String
---

## 字符编码标准

字符串比较特殊的就是编码问题，应用最为广泛的是 ASCII 和 Unicode。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/95nimj.png' alt='95nimj'/>

### ASCII

由于计算机是美国人发明的，因此，最早只有 127 个字符被编码到计算机里，也就是大小写英文字母、数字和一些符号，这个编码表被称为 `ASCII` 编码，比如大写字母 `A` 的编码是 `65`，对应的二进制是 `01000001`，小写字母 `z` 的编码是 `122`。

<Img w="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/xn3uNZ.png' alt='xn3uNZ'/>

但是要处理中文显然一个字节是不够的，至少需要两个字节，而且还不能和 ASCII 编码冲突，所以，中国制定了 `GB2312` 编码，用来把中文编进去。

你可以想得到的是，全世界有上百种语言，日本把日文编到 `Shift_JIS` 里，韩国把韩文编到 `Euc-kr` 里，各国有各国的标准，就会不可避免地出现冲突，结果就是，在**多语言混合**的文本中，显示出来会有乱码。

### Unicode

因此，[Unicode](https://home.unicode.org/) (万国码) 字符集应运而生。**Unicode 把所有语言都统一到一套编码里，这样就不会再有乱码问题了**，里面甚至包含了 emoji 表情。

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/5wildy.png' alt='5wildy'/>

Unicode 标准里面包含了一套编码方式（UTF-8， UTF-16， UTF-32），任何使用了 UTF-8/UTF-16/UTF-32 编码方式的系统都是支持 Unicode 标准的。现代操作系统和大多数编程语言都直接支持 Unicode。

:::tip

ASCII 编码和 Unicode 编码的区别：ASCII 编码是 1 个字节，而 Unicode 编码（以 Win10 为例采用的是 UTF-16）通常是 2 个字节（一些特别情况下需要 4 个字节）。

| 字符 | ASCII    | Unicode                      |
| ---- | -------- | ---------------------------- |
| A    | 01000001 | 00000000 01000001 (前面补 0) |
| 中   | x        | 01001110 00101101            |

:::

#### UTF-8

> 新的问题又出现了：如果统一成 Unicode 编码，乱码问题从此消失了。但是，如果你写的文本基本上全部是英文的话，用 Unicode 编码比 ASCII 编码需要多一倍的存储空间，在存储和传输上就十分不划算。

所以，本着节约的精神，又出现了把 Unicode 编码转化为“可变长编码”的 `UTF-8`(Universal Transformation Format) 编码。**UTF-8 编码把一个 Unicode 字符根据不同的数字大小编码成 1-6 个字节**:

- 常用的英文字母被编码成 1 个字节
- 汉字通常是 3 个字节，只有很生僻的字符才会被编码成 4-6 个字节。

如果你要传输的文本包含大量英文字符，用 UTF-8 编码就能节省空间：

| 字符 | ASCII    | Unicode           | UTF-8                      |
| ---- | -------- | ----------------- | -------------------------- |
| A    | 01000001 | 00000000 01000001 | 01000001                   |
| 中   | x        | 01001110 00101101 | 11100100 10111000 10101101 |

从上面的表格还可以发现，UTF-8 编码有一个额外的好处，就是 ASCII 编码实际上可以被看成是 UTF-8 编码的一部分，所以，**大量只支持 ASCII 编码的历史遗留软件可以在 UTF-8 编码下继续工作。**

## 操作系统字符编码

搞清楚了 ASCII、Unicode 和 UTF-8 的关系，我们就可以总结一下现在计算机系统通用的字符编码工作方式：

- 在计算机**内存**中，使用 Unicode 编码（具体使用哪一种编码方式还要看具体的操作系统，比如 Windows10 采用的是 UTF-16）
- 当需要保存到**硬盘**或者需要**传输**的时候，就转换为 UTF-8 编码。

<Img w="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/d6U3ij.png' alt='d6U3ij'/>

用 IDE 编辑代码的时候，从文件读取的 UTF-8 字符被转换为 Unicode 字符到内存里，编辑完成后，保存的时候再把 Unicode 转换为 UTF-8 保存到文件。

浏览网页的时候，服务器会把动态生成的 Unicode 内容转换为 UTF-8 再传输到浏览器，所以你看到很多网页的源码上会有类似 `<meta charset="UTF-8" />` 的信息，表示该网页正是用的 UTF-8 编码。

## Python 字符串编码

搞清楚了令人头疼的字符编码问题后，我们再来研究 Python 的字符串编码。

在最新的 Python 3 版本中，字符串是以 Unicode 编码的，也就是说，Python 的字符串支持多语言，例如：

```py
>>> print('包含中文的str')
包含中文的str
```

### `ord(str)`

对于单个字符的编码，Python 提供了 `ord()` 函数获取字符对应的十进制编码：

```py
>>> ord('A')
65
>>> ord('中')
20013
```

### `chr(int)`

`chr()` 函数把十进制编码转换为对应的字符：

```py
>>> chr(66)
'B'
>>> chr(25991)
'文'
```

如果知道字符的 Unicode 编码，还可以用十六进制这么写 str：

```py
>>> '\u4e2d\u6587'
'中文'
```

### `str.encode()`

由于 Python 的字符串类型是 str，在内存中以 Unicode 表示，一个字符对应若干个字节。如果要在**网络上传输，或者保存到磁盘**上，就需要把 str 变为以字节为单位的 bytes。

```py
str.encode(encoding='utf-8', errors='strict')
```

以 Unicode 表示的 str 通过 `encoding` 可以指定字符串的编码格式，如果出错默认报一个 ValueError 的异常，除非 `errors` 指定的是 `'ignore'` 或者 `'replace'`

```py
>>> 'ABC'.encode('ascii')
b'ABC'
>>> '中文'.encode('utf-8')
b'\xe4\xb8\xad\xe6\x96\x87'
>>> '中文'.encode('ascii')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
UnicodeEncodeError: 'ascii' codec can't encode characters in position 0-1: ordinal not in range(128)
```

纯英文的 str 可以用 ASCII 编码为 bytes，内容是一样的，含有中文的 str 可以用 UTF-8 编码为 bytes。含有中文的 str 无法用 ASCII 编码，因为中文编码的范围超过了 ASCII 编码的范围，Python 会报错。

在 bytes 中，无法显示为 ASCII 字符的字节，用 `\x##` 显示。

### `bytes.decode()`

```py
bytes.decode(encoding="utf-8", errors="strict")
```

反过来，如果我们从网络或磁盘上读取了字节流，那么读到的数据就是 bytes。要把 bytes 变为 str，就需要用 decode 方法。

Python3 中 str 没有 decode 方法，但我们可以使用 bytes 对象的 `decode()` 方法来解码给定的 bytes 对象，这个 bytes 对象也可以由 `str.encode()` 来编码返回：

```py
>>> b'ABC'.decode('ascii')
'ABC'
>>> b'\xe4\xb8\xad\xe6\x96\x87'.decode('utf-8')
'中文'
```

如果 bytes 中包含无法解码的字节，decode()方法会报错：

```py
>>> b'\xe4\xb8\xad\xff'.decode('utf-8')
Traceback (most recent call last):
  ...
UnicodeDecodeError: 'utf-8' codec can't decode byte 0xff in position 3: invalid start byte
```

如果 bytes 中只有一小部分无效的字节，可以传入 `errors='ignore'` 忽略错误的字节：

```py
>>> b'\xe4\xb8\xad\xff'.decode('utf-8', errors='ignore')
'中'
```

### `len(str)`

要计算 str 包含多少个字符，可以用 `len()` 函数：

```py
>>> len('ABC')
3
>>> len('中文')
2
```

`len()` 函数计算的是 str 的**字符数**，如果换成 bytes，`len()` 函数就计算**字节数**：

```py
>>> len(b'ABC')
3
>>> len(b'\xe4\xb8\xad\xe6\x96\x87')
6
>>> len('中文'.encode('utf-8'))
6
```

可见，1 个中文字符经过 UTF-8 编码后通常会占用 3 个字节，而 1 个英文字符只占用 1 个字节。

:::tip

在操作字符串时，我们经常遇到 str 和 bytes 的互相转换。为了避免乱码问题，应当始终坚持使用 UTF-8 编码对 str 和 bytes 进行转换。

:::

## Python 文件编码

### `# coding=utf-8`

由于 Python 源代码也是一个文本文件，所以，当你的源代码中包含中文的时候，未指定编码，在 Python2 的环境中执行会报错：

```py
#!/usr/bin/python

print ("你好，世界")
```

```py
  File "test.py", line 2
SyntaxError: Non-ASCII character '\xe4' in file test.py on line 2, but no encoding declared; see http://www.python.org/peps/pep-0263.html for details
```

`#!/usr/bin/python` 是 Python 解释器的 `path`，告诉 Linux/OS X 系统，这是一个 Python 可执行程序，按照 `path` 对应的 Python 来执行这个文件。Windows 系统会忽略这个注释。如果不写的话，需要以 `python ./test.py` 命令来运行，写上的话，`./test.py` 即可运行。

:::caution

Python2 中默认的编码格式是 ASCII 格式，在没修改编码格式时无法正确打印汉字，所以在读取中文时会报错。

:::

解决方法为只要在文件开头加入 `# -*- coding: UTF-8 -*-` 或者 `# coding=utf-8` 就行了。

:::tip

`# coding=utf-8` 的 `=`号两边不要空格。

:::

```py
#!/usr/bin/python
# -*- coding: UTF-8 -*-

print( "你好，世界" )
```

输出结果为：

```py
你好，世界
```

:::tip

Python3 源码文件默认使用 UTF-8 编码，所以可以正常解析中文，无需指定 UTF-8 编码。

:::

### IDE

如果你使用 IDE，确保 py 文件存储的格式为 UTF-8（一般 IDE 默认是 UTF-8），否则会出现类似以下错误信息：

```py
SyntaxError: (unicode error) ‘utf-8’ codec can’t decode byte 0xc4 in position 0:
invalid continuation byte
```

VSCode 设置：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/GUtTh6.png' alt='GUtTh6'/>

PyCharm 设置：

<Img src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/prrKRj.png' alt='prrKRj'/>

## Python 字符串格式化

如何输出格式化的字符串。我们经常会输出类似 `'亲爱的 xxx 你好！你 xx 月的话费是 xx，余额是 xx'` 之类的字符串，而 xxx 的内容都是根据变量变化的，所以，需要一种简便的格式化字符串的方式。

### 方式一：`%`

在 Python 中，采用的格式化方式和 C 语言是一致的，用 `%` 实现，举例如下：

```py
>>> 'Hello, %s' % 'world'
'Hello, world'

>>> 'Hi, %s, you have $%d.' % ('Michael', 1000000)
'Hi, Michael, you have $1000000.'
```

`%` 运算符就是用来格式化字符串的。在字符串内部，`%s` 表示用字符串替换，`%d` 表示用整数替换，有几个 `%?` 占位符，后面就跟几个变量或者值，顺序要对应好。如果只有一个 `%?`，括号可以省略。

| 占位符 | 替换内容     |
| ------ | ------------ |
| %d     | 整数         |
| %f     | 浮点数       |
| %s     | 字符串       |
| %x     | 十六进制整数 |

其中，格式化整数和浮点数还可以指定是否补 0 和整数与小数的位数：

```py
>>> print('%2d-%02d' % (3, 1))
 3-01

>>> print('%.2f' % 3.1415926)
3.14
```

如果你不太确定应该用什么，`%s` 永远起作用，它会把任何数据类型转换为字符串：

```py
>>> 'Age: %s. Gender: %s' % (25, True)
'Age: 25. Gender: True'
```

有些时候，字符串里面的 `%` 是一个普通字符怎么办？这个时候就需要转义，用 `%%` 来表示一个 `%`：

```py
>>> 'growth rate: %d %%' % 7
'growth rate: 7 %'
```

### 方式二：`str.format()`

另一种格式化字符串的方法是使用字符串的 `format()` 方法，它会用传入的参数依次替换字符串内的占位符 `{0}, {1}……`，不过这种方式写起来比 `%` 要麻烦得多：

```py
>>> 'Hello, {0}, 成绩提升了 {1:.1f}%'.format('小明', 17.125)
'Hello, 小明, 成绩提升了 17.1%'
```

### 方式三：f-string

最后一种格式化字符串的方法是使用以 f 开头的字符串，称之为 f-string，它和普通字符串不同之处在于，字符串如果包含 `{xxx}`，就会以对应的变量替换：

```py
r = 2.5
s = 3.14 * r ** 2
print(f'The area of a circle with radius {r} is {s:.2f}')
# The area of a circle with radius 2.5 is 19.62
```

上述代码中，`{r}` 被变量 `r` 的值替换，`{s:.2f}` 被变量 `s` 的值替换，并且 `:` 后面的 `.2f` 指定了格式化参数（即保留两位小数），因此，`{s:.2f}` 的替换结果是 `19.62`。

这种语法类似 ES6 模版字符串的写法：

```js
let r = 2.5;
let s = 3.14 * r ** 2;
console.log(`The area of a circle with radius ${r} is ${s.toFixed(2)}`);
// The area of a circle with radius 2.5 is 19.63
```

## 参考资料

1. [廖雪峰 Python 教程：字符串和编码](https://www.liaoxuefeng.com/wiki/1016959663602400/1017075323632896)
2. [知乎：计算机中为何不直接使用 UTF-8 编码进行存储而要使用 Unicode 再转换成 UTF-8 ？](https://www.zhihu.com/question/52346583)
3. [python #!/usr/bin/python 作用, by xyqzki](https://blog.csdn.net/xyqzki/article/details/42110477)
