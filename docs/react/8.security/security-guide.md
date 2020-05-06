---
title: 安全规约
---

## JSX 防注入攻击

你可以放心地在 JSX 当中使用用户输入：

```jsx
const title = response.potentiallyMaliciousInput;
// 直接使用是安全的：
const element = <h1>{title}</h1>;
```

React DOM 在渲染之前默认会 [过滤](http://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html) 所有传入的值。它可以确保你的应用不会被注入攻击。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 [XSS\(跨站脚本\)](https://en.wikipedia.org/wiki/Cross-site_scripting) 攻击。

这里 React 已经帮我们做了[很多](https://facebook.github.io/react/docs/introducing-jsx.html#jsx-prevents-injection-attacks)，它会在运行时动态创建 DOM 节点然后填入文本内容（你也可以强制设置 HTML 内容，不过这样比较危险）

## dangerouslySetInnerHTML

有时候需要将一段 html 的字符串插入页面中以 html 的形式展现，然而直接插入的话页面显示的就是这段字符串，而不会进行转义。可以用以下方法插入，便可以以 html 的形式展现：

```jsx
<div dangerouslySetInnerHTML={{__html: '<p>Hello, World</p>'}} />
```
