---
title: HTTP首部字段
sidebar_label: HTTP首部字段
---

import Img from '../../../src/components/Img';

import Hint from '../../../src/components/Hint';

## 首部字段

HTTP 首部字段允许客户端和服务器通过请求报文和响应报文传递附加信息。一个首部字段由不区分大小写的名称、一个冒号“：”和对应的值组成组成。如下图所示：

<Img w="600" legend="图：HTTP首部字段格式" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/WX20191223-161249@2x.png" />

<Hint type="tip">
字段名里不允许出现空格，可以使用连字符“-”，但不能使用下划线“_”；
冒号前无空格，冒号后如果有多个空格只会保留一个空格；
每个字段的value后都会有一个换行符；
字段的顺序是没有意义的，可以任意排列不影响语义；
</Hint>

## 首部字段分类

HTTP 协议规定了非常多的头部字段，实现各种各样的功能，但基本上可以分为四大类：

- 通用首部字段：在请求头和响应头里都可以出现；
- 请求首部字段：仅能出现在请求头里，进一步说明请求信息或者额外的附加条件；
- 响应首部字段：仅能出现在响应头里，补充说明响应报文的信息；
- 实体首部字段：它实际上属于通用字段，但专门描述`body`的额外信息。

### 详细字段

<Img legend="图：HTTP首部字段分类" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/7knXuW.png" />

点击下载或编辑[思维导图](https://robbie-blog.oss-cn-shanghai.aliyuncs.com/Mind-Mapping/%E9%A6%96%E9%83%A8%E5%AD%97%E6%AE%B5.xmind)。
