---
id: node
title: 节点
sidebar_label: 节点
---
节点的类型有七种：

1. Document：整个文档树的顶层节点
2. DocumentType：doctype标签`（比如<!DOCTYPE html>）`
3. Element：网页的各种HTML标签`（比如<body>、<a>等）`
4. Attribute：网页元素的属性（比如class="right"）
5. Text：标签之间或标签包含的文本
6. Comment：注释
7. DocumentFragment：文档的片段

浏览器提供一个原生的节点对象Node，上面这七种节点都继承了Node，因此具有一些共同的属性和方法。浏览器原生提供document节点，代表整个文档。文档的第一层只有一个节点，就是 HTML 网页的第一个标签`<html>`，它构成了树结构的根节点（root node），其他 HTML 标签节点都是它的下级节点。

除了根节点，其他节点都有三种层级关系。

- 父节点关系（parentNode）：直接的那个上级节点
- 子节点关系（childNodes）：直接的下级节点
- 同级节点关系（sibling）：拥有同一个父节点的节点

DOM 提供操作接口，用来获取这三种关系的节点。
- 子节点接口包括firstChild（第一个子节点）和lastChild（最后一个子节点）等属性
- 同级节点接口包括nextSibling（紧邻在后的那个同级节点）和previousSibling（紧邻在前的那个同级节点）属性。
详细的Node对象的方法请参考这篇文章：[DOM 模型概述，作者：阮一峰](http://javascript.ruanyifeng.com/dom/node.htm)
