---
title: HTTP头字段
sidebar_label: HTTP头字段
---

import Img from '../../../src/components/Img';

import Hint from '../../../src/components/Hint';

## 头字段

HTTP 头字段允许客户端和服务器通过请求报文和响应报文传递附加信息。头字段由字段的名称、一个冒号“：”和对应的值组成组成。如下图所示：

<Img w="600" legend="图：HTTP头字段格式" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/WX20191223-161249@2x.png" />

> 注意事项：
>
> - 字段名里不允许出现空格，可以使用连字符“-”，但不能使用下划线“\_”；
> - 冒号前无空格，冒号后如果有多个空格只会保留一个空格；
> - 每个字段的 value 后都会有一个换行符；
> - 字段的顺序是没有意义的，可以任意排列不影响语义；

<Hint type="must">文档 [RFC7504](https://tools.ietf.org/html/rfc7540#section-8.1.2) 明确指出头字段的定义：在 HTTP/1.x 中头字段名不区分大小写，但是在 HTTP/2 中头字段必须是小写。在 Node.js 中，如果使用的是 HTTP/1.x 协议，字段名对大小写字母不敏感，会原样输出。如果如果使用的是 HTTP/2 协议，非小写字母的字段名都会转为小写</Hint>

## 头字段分类

HTTP 协议规定了非常多的头部字段，实现各种各样的功能，但基本上可以分为四大类：

- 通用头字段：在请求头和响应头里都可以出现；
- 请求头字段：仅能出现在请求头里，进一步说明请求信息或者额外的附加条件；
- 响应头字段：仅能出现在响应头里，补充说明响应报文的信息；
- 实体头字段：它实际上属于通用字段，但专门描述`body`的额外信息。

### 详细字段

<Img legend="图：HTTP头字段分类" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/JZTTTl.png" />

## 小结

本章 HTTP 头字段的讲解是按照请求报文和响应报文来划分的，在[HTTP headers -- MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)这个文档中，是按照 HTTP 字段的功能来划分的，将两者结合来看效果会更好。
