---
title: 节点增删改查
sidebar_label: 节点增删改查
---

import Hint from '../../../src/components/Hint';

## 查找节点

前面四个方法除了定义在 document 对象上，还定义在 Element 上，即在元素节点上也可以调用。

### querySelector()

`document.querySelector` 方法接受一个 CSS 选择器作为参数，返回匹配该选择器的元素节点。如果有多个节点满足匹配条件，则返回**第一个匹配**的节点。如果没有发现匹配的节点，则返回`null`。

```js
let el1 = document.querySelector('.myclass');
let el2 = document.querySelector('#myParent > [ng-click]');
```

Since HTML5 it’s been valid to start an HTML element ID with a number. For example `<div id="10">`. From an HTML perspective, that’s fine.

However that doesn’t mean that CSS is happy to have an ID selector starting with a number. For example, this will not work:

```css
#10 {
  color: red; /* does not work */
}
```

That’s because even though HTML5 is quite happy for an ID to start with a number, CSS is not. CSS simply **doesn’t allow selectors to begin with a number**. See more at [W3C Specification](https://www.w3.org/TR/CSS21/syndata.html#characters).

<Hint type="tip">Similarly, the `querySelector` doesn’t allow selectors to begin with a number.</Hint>

```js
document.querySelectorAll('#10');
// Uncaught DOMException: Failed to execute 'querySelectorAll' on 'Document': '#10' is not a valid selector.
```

However, you can easily work around this by using an attribute selector:

```js
document.querySelector('[id="10"]');
```

### querySelectorAll()

`document.querySelectorAll` 方法与 `querySelector` 用法类似，区别是返回一个 `NodeList` 对象，包含所有匹配给定选择器的节点。

```js
let elementList = document.querySelectorAll('.myclass');
```

这两个方法的参数，可以是逗号分隔的多个 CSS 选择器，返回匹配其中一个选择器的元素节点，这与 CSS 选择器的规则是一致的。

```js
let matches = document.querySelectorAll('div.note, div.alert');
```

上面代码返回 class 属性是 note 或 alert 的 div 元素。

这两个方法都支持复杂的 CSS 选择器。

```js
// 选中 data-foo-bar 属性等于 someval 的元素
document.querySelectorAll('[data-foo-bar="someval"]');

// 选中 myForm 表单中所有不通过验证的元素
document.querySelectorAll('#myForm :invalid');

// 选中div元素，那些 class 含 ignore 的除外
document.querySelectorAll('DIV:not(.ignore)');

// 同时选中 div，a，script 三类元素
document.querySelectorAll('DIV, A, SCRIPT');
```

如果 `querySelectorAll` 方法的参数是字符串 `*` ，则会返回文档中的所有元素节点。

<Hint type="warn">它们不支持 CSS 伪元素的选择器（比如 `:first-line` 和 `:first-letter` ）和伪类的选择器（比如 `:link` 和 `:visited` ），即无法选中伪元素和伪类。</Hint>

<Hint type="warn">`querySelectorAll` 的返回结果不是动态集合，不会实时反映元素节点的变化。</Hint>

### getElementsByTagName()

`document.getElementsByTagName` 方法搜索 HTML 标签名，返回符合条件的元素。如果没有任何匹配的元素，就返回一个空集。

<Hint type="tip">它的返回值是一个类似数组对象（ HTMLCollection 实例）</Hint>

<Hint type="warn">可以实时反映 HTML 文档的变化。</Hint>

```js
let paras = document.getElementsByTagName('p');
paras instanceof HTMLCollection; // true
```

上面代码返回当前文档的所有 p 元素节点。

<Hint type="tip">HTML 标签名是大小写不敏感的，因此 `getElementsByTagName` 方法也是大小写不敏感的。</Hint>

<Hint type="tip">返回结果中，各个成员的顺序就是它们在文档中出现的顺序。</Hint>

如果传入 `*`，就可以返回文档中所有 HTML 元素。

```js
let allElements = document.getElementsByTagName('*');
```

### getElementsByClassName()

`document.getElementsByClassName` 方法返回包括了所有 class 名字符合指定条件的元素，元素的变化实时反映在返回结果中。

<Hint type="tip">它的返回值是一个类似数组对象（ HTMLCollection 实例）</Hint>

<Hint type="warn">可以实时反映 HTML 文档的变化。</Hint>

```js
let elements = document.getElementsByClassName(names);
```

由于 class 是保留字，所以 JavaScript 一律使用 `className` 表示 CSS 的 class。

参数可以是多个 class，它们之间使用空格分隔。

```js
let elements = document.getElementsByClassName('foo bar');
```

上面代码返回同时具有 foo 和 bar 两个 class 的元素，foo 和 bar 的顺序不重要。

<Hint type="warn">正常模式下，CSS 的 class 是大小写敏感的。（quirks mode 下，大小写不敏感。）</Hint>

### document.getElementsByName()

`document.getElementsByName` 方法用于选择拥有 `name` 属性的 HTML 元素（比如 `<form>`、`<radio>`、`<img>`、`<frame>`、`<embed>`和 `<object>` 等），返回一个类似数组的的对象（NodeList 实例），因为 name 属性相同的元素可能不止一个。

```js
// 表单为 <form name="x"></form>
var forms = document.getElementsByName('x');
forms[0].tagName; // "FORM"
```

### document.getElementById()

`document.getElementById` 方法返回匹配指定 id 属性的元素节点。如果没有发现匹配的节点，则返回 `null` 。

```js
var elem = document.getElementById('para1');
```

<Hint type="warn">该方法的参数是大小写敏感的。</Hint> <Hint type="warn">`Element` 后面没有 `s` 。</Hint>

`document.getElementById` 方法与 `document.querySelector` 方法都能获取元素节点，不同之处是 `document.querySelector` 方法的参数使用 CSS 选择器语法，`document.getElementById` 方法的参数是元素的 id 属性值。

```js
document.getElementById('myElement');
document.querySelector('#myElement');
```

上面代码中，两个方法都能选中 id 为 myElement 的元素

<Hint type="tip">`document.getElementById()` 比 `document.querySelector()` 效率高得多。</Hint>

## 增加节点

### Node.appendChild()

`appendChild` 方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点。该方法的返回值就是插入文档的子节点。

```js
var p = document.createElement('p');
document.body.appendChild(p);
```

上面代码新建一个 `<p>` 节点，将其插入 `document.body` 的尾部。

如果参数节点是 DOM 已经存在的节点，`appendChild` 方法会将其从原来的位置，移动到新位置。

```js
var element = document
  .createElement('div')
  .appendChild(document.createElement('b'));
```

上面代码的返回值是 `<b></b>`，而不是 `<div></div>`。

如果 appendChild 方法的参数是 DocumentFragment 节点，那么插入的是 DocumentFragment 的所有子节点，而不是 DocumentFragment 节点本身。返回值是一个空的 DocumentFragment 节点。

### document.createElement()

`document.createElement` 方法用来生成元素节点，并返回该节点。

```js
var newDiv = document.createElement('div');
```

`createElement` 方法的参数为元素的标签名，即元素节点的 `tagName` 属性，对于 HTML 网页大小写不敏感，即参数为 div 或 DIV 返回的是同一种节点。如果参数里面包含尖括号（即<和>）会报错。

```js
document.createElement('<div>');
// DOMException: The tag name provided ('<div>') is not a valid name
```

<Hint type="tip">`document.createElement` 的参数可以是自定义的标签名。</Hint>

```js
document.createElement('foo');
```

### document.createTextNode()

`document.createTextNode` 方法用来生成文本节点（Text 实例），并返回该节点。它的参数是文本节点的内容。

```js
var newDiv = document.createElement('div');
var newContent = document.createTextNode('Hello');
newDiv.appendChild(newContent);
```

上面代码新建一个 div 节点和一个文本节点，然后将文本节点插入 div 节点。

这个方法可以确保返回的节点，被浏览器当作文本渲染，而不是当作 HTML 代码渲染。因此，可以用来展示用户的输入，避免 XSS 攻击。

```js
var div = document.createElement('div');
div.appendChild(document.createTextNode('<span>Foo & bar</span>'));
console.log(div.innerHTML);
// &lt;span&gt;Foo &amp; bar&lt;/span&gt;
```

上面代码中，`createTextNode` 方法对大于号和小于号进行转义，从而保证即使用户输入的内容包含恶意代码，也能正确显示。

需要注意的是，该方法不对单引号和双引号转义，所以不能用来对 HTML 属性赋值。

```js
function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

var userWebsite = '" onmouseover="alert(\'derp\')" "';
var profileLink = '<a href="' + escapeHtml(userWebsite) + '">Bob</a>';
var div = document.getElementById('target');
div.innerHTML = profileLink;
// <a href="" onmouseover="alert('derp')" "">Bob</a>
```

上面代码中，由于 `createTextNode` 方法不转义双引号，导致 `onmouseover` 方法被注入了代码。

### document.createAttribute()

`document.createAttribute` 方法生成一个新的属性节点（Attr 实例），并返回它。

```js
var attribute = document.createAttribute(name);
```

`document.createAttribute` 方法的参数 name，是属性的名称。

```js
var node = document.getElementById('div1');

var a = document.createAttribute('my_attrib');
a.value = 'newVal';

node.setAttributeNode(a);
// 或者
node.setAttribute('my_attrib', 'newVal');
```

上面代码为 `div1` 节点，插入一个值为 `newVal` 的 `my_attrib` 属性。

### document.createComment()

`document.createComment` 方法生成一个新的注释节点，并返回该节点。

```js
var CommentNode = document.createComment(data);
```

`document.createComment` 方法的参数是一个字符串，会成为注释节点的内容。

### document.createDocumentFragment()

`document.createDocumentFragment` 方法生成一个空的文档片段对象（DocumentFragment 实例）。

```js
var docFragment = document.createDocumentFragment();
```

DocumentFragment 是一个存在于内存的 DOM 片段，不属于当前文档，常常用来生成一段较复杂的 DOM 结构，然后再插入当前文档。这样做的好处在于，因为 DocumentFragment 不属于当前文档，对它的任何改动，都不会引发网页的重新渲染，比直接修改当前文档的 DOM 有更好的性能表现。

```js
var docfrag = document.createDocumentFragment();

[1, 2, 3, 4].forEach(function (e) {
  var li = document.createElement('li');
  li.textContent = e;
  docfrag.appendChild(li);
});

var element = document.getElementById('ul');
element.appendChild(docfrag);
```

上面代码中，文档片断 `docfrag` 包含四个 `<li>` 节点，这些子节点被一次性插入了当前文档。

## 删除节点

### Node.removeChild()

`removeChild` 方法接受一个子节点作为参数，用于从当前节点移除该子节点。返回值是移除的子节点。

```js
var divA = document.getElementById('A');
divA.parentNode.removeChild(divA);
```

上面代码移除了 divA 节点。注意，这个方法是在 divA 的父节点上调用的，不是在 divA 上调用的。

下面是如何移除当前节点的所有子节点。

```js
var element = document.getElementById('top');
while (element.firstChild) {
  element.removeChild(element.firstChild);
}
```

被移除的节点依然存在于内存之中，但不再是 DOM 的一部分。所以，一个节点移除以后，依然可以使用它，比如插入到另一个节点下面。

如果参数节点不是当前节点的子节点，`removeChild` 方法将报错。

### Node.replaceChild()

`replaceChild` 方法用于将一个新的节点，替换当前节点的某一个子节点。

```js
var replacedNode = parentNode.replaceChild(newChild, oldChild);
```

上面代码中，`replaceChild` 方法接受两个参数，第一个参数 `newChild` 是用来替换的新节点，第二个参数 `oldChild` 是将要替换走的子节点。返回值是替换走的那个节点 `oldChild` 。

```js
var divA = document.getElementById('divA');
var newSpan = document.createElement('span');
newSpan.textContent = 'Hello World!';
divA.parentNode.replaceChild(newSpan, divA);
```

上面代码是如何将指定节点 divA 替换走。

### Element.remove()

`Element.remove` 方法继承自 `ChildNode` 接口，用于将当前元素节点从它的父节点移除。

```js
var el = document.getElementById('mydiv');
el.remove();
```

上面代码将 el 节点从 DOM 树里面移除。

## 修改节点

### Element.getAttribute()

`Element.getAttribute` 方法返回当前元素节点的指定属性。如果指定属性不存在，则返回 `null` 。

```js
// HTML代码为
// <div id="div1" align="left">
var div = document.getElementById('div1');
div.getAttribute('align'); // "left"
```

### Element.setAttribute()

`Element.setAttribute` 方法用于为当前元素节点新增属性。如果同名属性已存在，则相当于编辑已存在的属性。

```js
var d = document.getElementById('d1');
d.setAttribute('align', 'center');
```

下面是对 img 元素的 src 属性赋值的例子。

```js
var myImage = document.querySelector('img');
myImage.setAttribute('src', 'path/to/example.png');
```

### Element.hasAttribute()

`Element.hasAttribute` 方法返回一个布尔值，表示当前元素节点是否包含指定属性。

```js
var d = document.getElementById('div1');

if (d.hasAttribute('align')) {
  d.setAttribute('align', 'center');
}
```

上面代码检查 div 节点是否含有 align 属性。如果有，则设置为居中对齐。

#### Element.removeAttribute()

`Element.removeAttribute` 方法移除指定属性。该方法没有返回值。

```js
// HTML 代码为
// <div id="div1" align="left" width="200px">
document.getElementById('div1').removeAttribute('align');
// 现在的HTML代码为
// <div id="div1" width="200px">
```

### Element.style

每个元素节点都有 style 用来读写该元素的行内样式信息。

### Element.className

className 属性用来读写当前元素节点的 class 属性。它的值是一个字符串，每个 class 之间用空格分割。

classList 属性返回一个类似数组的对象，当前元素节点的每个 class 就是这个对象的一个成员。

```js
// HTML 代码 <div class="one two three" id="myDiv"></div>
var div = document.getElementById('myDiv');

div.className;
// "one two three"
```

上面代码中，className 属性返回一个空格分隔的字符串。

### Element.classList

classList 属性指向一个类似数组的对象，该对象的 length 属性（只读）返回当前元素的 class 数量。

```js
div.classList;
// {
//   0: "one"
//   1: "two"
//   2: "three"
//   length: 3
// }
```

classList 对象有下列方法。

- `add()`：增加一个 class。
- `remove()`：移除一个 class。
- `contains()`：检查当前元素是否包含某个 class。
- `toggle()`：将某个 class 移入或移出当前元素。
- `item()`：返回指定索引位置的 class。
- `toString()`：将 class 的列表转为字符串。

```js
var div = document.getElementById('myDiv');

div.classList.add('myCssClass');
div.classList.add('foo', 'bar');
div.classList.remove('myCssClass');
div.classList.toggle('myCssClass'); // 如果 myCssClass 不存在就加入，否则移除
div.classList.contains('myCssClass'); // 返回 true 或者 false
div.classList.item(0); // 返回第一个 Class
div.classList.toString();
```

下面比较一下，className 和 classList 在添加和删除某个 class 时的写法。

```js
var foo = document.getElementById('foo');

// 添加class
foo.className += 'bold';
foo.classList.add('bold');

// 删除class
foo.classList.remove('bold');
foo.className = foo.className.replace(/^bold$/, '');
```

toggle 方法可以接受一个布尔值，作为第二个参数。如果为 true，则添加该属性；如果为 false，则去除该属性。

```js
el.classList.toggle('abc', boolValue);

// 等同于
if (boolValue) {
  el.classList.add('abc');
} else {
  el.classList.remove('abc');
}
```

### Element.innerHTML

Element.innerHTML 属性返回一个字符串，等同于该元素包含的所有 HTML 代码。该属性可读写，常用来设置某个节点的内容。它能改写所有元素节点的内容，包括 `<HTML>` 和 `<body>` 元素。

如果将 `innerHTML` 属性设为空，等于删除所有它包含的所有节点。

```js
el.innerHTML = '';
```

上面代码等于将 el 节点变成了一个空节点，el 原来包含的节点被全部删除。

注意，读取属性值的时候，如果文本节点包含 `&`、`<` 和 `>` ，innerHTML 属性会将它们转为实体形式 `&amp;`、`&lt;`、`&gt;`。如果想得到原文，建议使用 `element.textContent` 属性。

```js
// HTML代码如下 <p id="para"> 5 > 3 </p>
document.getElementById('para').innerHTML;
// 5 &gt; 3
```

写入的时候，如果插入的文本包含 HTML 标签，会被解析成为节点对象插入 DOM。注意，如果文本之中含有 `<script>` 标签，虽然可以生成 script 节点，但是插入的代码不会执行。

```js
var name = "<script>alert('haha')</script>";
el.innerHTML = name;
```

上面代码将脚本插入内容，脚本并不会执行。但是，innerHTML 还是有安全风险的。

```js
var name = '<img src=x onerror=alert(1)>';
el.innerHTML = name;
```

上面代码中，alert 方法是会执行的。因此为了安全考虑，如果插入的是文本，最好用 `textContent` 属性代替 `innerHTML` 。

### Element.outerHTML

`Element.outerHTML` 属性返回一个字符串，表示当前元素节点的所有 HTML 代码，包括该元素本身和所有子元素。

```js
// HTML 代码如下
// <div id="d"><p>Hello</p></div>
var d = document.getElementById('d');
d.outerHTML;
// '<div id="d"><p>Hello</p></div>'
```

<Hint type="tip">outerHTML 属性是可读写的，对它进行赋值，等于替换掉当前元素。</Hint>

```js
// HTML 代码如下
// <div id="container"><div id="d">Hello</div></div>
var container = document.getElementById('container');
var d = document.getElementById('d');
container.firstChild.nodeName; // "DIV"
d.nodeName; // "DIV"

d.outerHTML = '<p>Hello</p>';
container.firstChild.nodeName; // "P"
d.nodeName; // "DIV"
```

上面代码中，变量 d 代表子节点，它的 outerHTML 属性重新赋值以后，内层的 div 元素就不存在了，被 p 元素替换了。但是，变量 d 依然指向原来的 div 元素，这表示被替换的 DIV 元素还存在于内存中。

<Hint type="warn">如果一个节点没有父节点，设置 outerHTML 属性会报错。</Hint>

```js
var div = document.createElement('div');
div.outerHTML = '<p>test</p>';
// DOMException: This element has no parent node.
```

上面代码中，div 元素没有父节点，设置 `outerHTML` 属性会报错。

## References

1. [Selecting HTML5 id and class names that start with a number in CSS, By Ben Frain](https://benfrain.com/when-and-where-you-can-use-numbers-in-id-and-class-names/)
