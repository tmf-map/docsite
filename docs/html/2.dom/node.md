---
title: 节点基础概念
sidebar_label: 节点基础概念
---

> DOM 是 JavaScript 操作网页的接口，全称为“文档对象模型”（Document Object Model）。它的作用是将网页转为一个 JavaScript 对象，从而可以用脚本进行各种操作（比如增删内容）。

浏览器会根据 DOM 模型，将结构化文档（比如 HTML 和 XML）解析成一系列的节点，再由这些节点组成一个树状结构（DOM Tree）。所有的节点和最终的树状结构，都有规范的对外接口。

DOM 只是一个接口规范，可以用各种语言实现。所以严格地说，DOM 不是 JavaScript 语法的一部分，但是 DOM 操作是 JavaScript 最常见的任务，离开了 DOM，JavaScript 就无法控制网页。另一方面，JavaScript 也是最常用于 DOM 操作的语言。后面介绍的就是 JavaScript 对 DOM 标准的实现和用法。

## 什么是 Node?

DOM 的最小组成单位叫做节点（node）。文档的树形结构（DOM 树），就是由各种不同类型的节点组成。每个节点可以看作是文档树的一片叶子。

### Node.nodeName

nodeName 属性返回节点的名称。

```js
// HTML 代码如下
// <div id="d1">hello world</div>
var div = document.getElementById('d1');
div.nodeName; // "DIV"
```

上面代码中，元素节点 `<div>` 的 `nodeName` 属性就是**大写**的标签名 `DIV`。

不同节点的 `nodeName` 属性值如下。

- 文档节点（document）：#document
- 元素节点（element）：大写的标签名
- 属性节点（attr）：属性的名称
- 文本节点（text）：#text
- 文档片断节点（DocumentFragment）：#document-fragment
- 文档类型节点（DocumentType）：文档的类型
- 注释节点（Comment）：#comment

### Node.nodeValue

nodeValue 属性返回一个字符串，表示当前节点本身的文本值，该属性可读写。

只有文本节点（text）和注释节点（comment）有文本值，因此这两类节点的 nodeValue 可以返回结果，其他类型的节点一律返回 null。同样的，也只有这两类节点可以设置 nodeValue 属性的值，其他类型的节点设置无效。

```js
// HTML 代码如下
// <div id="d1">hello world</div>
var div = document.getElementById('d1');
div.nodeValue; // null
div.firstChild.nodeValue; // "hello world"
```

上面代码中，div 是元素节点，nodeValue 属性返回 null。div.firstChild 是文本节点，所以可以返回文本值。

### Node.textContent

textContent 属性返回当前节点和它的所有后代节点的文本内容。

```js
// HTML 代码为
// <div id="divA">This is <span>some</span> text</div>

document.getElementById('divA').textContent;
// This is some text
```

textContent 属性自动忽略当前节点内部的 HTML 标签，返回所有文本内容。

该属性是可读写的，设置该属性的值，会用一个新的文本节点，替换所有原来的子节点。它还有一个好处，就是自动对 HTML 标签转义。这很适合用于用户提供的内容。

```js
document.getElementById('foo').textContent = '<p>GoodBye!</p>';
```

上面代码在插入文本时，会将 `<p>` 标签解释为文本，而不会当作标签处理。

对于文本节点（text）和注释节点（comment），textContent 属性的值与 nodeValue 属性相同。对于其他类型的节点，该属性会将每个子节点的内容连接在一起返回，但是不包括注释节点。如果一个节点没有子节点，则返回空字符串。

文档节点（document）和文档类型节点（doctype）的 textContent 属性为 null。如果要读取整个文档的内容，可以使用 document.documentElement.textContent。

## Node 类型

节点的类型有七种：

1. Document：整个文档树的顶层节点
2. DocumentType：doctype 标签（比如 `<!DOCTYPE html>`）
3. Element：网页的各种 HTML 标签（比如 `<body>`、`<a>` 等）
4. Attribute：网页元素的属性（比如 `class="right"`）
5. Text：标签之间或标签包含的文本
6. Comment：注释
7. DocumentFragment：文档的片段

浏览器提供一个原生的节点对象 `Node`，上面这七种节点都继承了 `Node`，因此具有一些共同的属性和方法。

### Node.nodeType

nodeType 属性返回一个整数值，表示节点的类型。

```js
document.nodeType; // 9
```

Node 对象定义了几个常量，对应这些类型值。

```js
document.nodeType === Node.DOCUMENT_NODE; // true
```

不同节点的 `nodeType` 属性值和对应的常量如下。

- 文档节点（document）：9，对应常量 `Node.DOCUMENT_NODE`
- 元素节点（element）：1，对应常量 `Node.ELEMENT_NODE`
- 属性节点（attr）：2，对应常量 `Node.ATTRIBUTE_NODE`
- 文本节点（text）：3，对应常量 `Node.TEXT_NODE`
- 文档片断节点（DocumentFragment）：11，对应常量 `Node.DOCUMENT_FRAGMENT_NODE`
- 文档类型节点（DocumentType）：10，对应常量 `Node.DOCUMENT_TYPE_NODE`
- 注释节点（Comment）：8，对应常量 `Node.COMMENT_NODE`

```js
var node = document.documentElement.firstChild;
if (node.nodeType === Node.ELEMENT_NODE) {
  console.log('该节点是元素节点');
}
```

## Node 关系

:::tip

浏览器原生提供 document 对象，代表整个文档。

:::

文档的第一层只有一个节点，就是 HTML 网页的第一个标签`<html>`，它构成了树结构的根节点（root node），其他 HTML 标签节点都是它的下级节点。

:::tip

`html` 是 DOM 树的根节点

:::

除了根节点，其他节点都有三种层级关系。

- 父节点关系（parentNode）：直接的那个上级节点
- 子节点关系（childNodes）：直接的下级节点
- 同级节点关系（sibling）：拥有同一个父节点的节点

DOM 提供操作接口，用来获取这三种关系的节点。

### parentNode 和 parentElement

对于一个节点来说，它的父节点只可能是三种类型：元素节点（element）、文档节点（document）和文档片段节点（documentfragment）。而 `parentElement` 属性相当于把后两种父节点都排除了。

### childNodes, firstChild 和 lastChild

`childNodes`（类似数组的对象，`NodeList` 集合）, `firstChild` 和 `lastChild` 等属性，这个属性是作用在父元素上的，而不是像 CSS 伪类那样作用于子元素上。

### nextSibling 和 previousSibling

`nextSibling`（紧邻在后的那个同级节点）和 `previousSibling`（紧邻在前的那个同级节点）属性。

```js
let children = document.querySelector('ul').childNodes;

// <p id="p1"><span>First span</span></p>
let p1 = document.getElementById('p1');
p1.firstChild.nodeName; // "SPAN"
```

## NodeList

## 参考资料

1. [DOM 模型概述，作者：阮一峰](http://javascript.ruanyifeng.com/dom/node.html)
