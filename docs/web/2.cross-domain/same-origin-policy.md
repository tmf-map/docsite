---
title: Same-Origin Policy
---

<Img src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/VKSsM4.png" width="345" height="125" legend="图1：同源示意图"/>

同源策略：协议、域名、端口全部相同，三者缺一不可。

:::tip

有些人会说 `baidu.com` `zhihu.com` `qq.com` 是一级域名，虽然是错误的，但可以理解(说的人多了也就是对的了……)，这是站在使用者/购买者角度看的，对于购买域名者来说 `xxx.com` `xxx.com.cn` 就相当一级域名，但是从真正的域名分级看，它们俩分别是二级域名、三级域名。

:::

同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。

设想这样一种情况：A 网站是一家银行，用户登录以后，又去浏览其他网站。如果其他网站可以读取 A 网站的 Cookie，会发生什么？

很显然，如果 Cookie 包含隐私（比如存款总额），这些信息就会泄漏。更可怕的是，Cookie 往往用来保存用户的登录状态，如果用户没有退出登录，其他网站就可以冒充用户，为所欲为。因为浏览器同时还规定，提交表单不受同源政策的限制。

由此可见，"同源策略"是必需的，否则 Cookie 可以共享，互联网就毫无安全可言了。

目前，如果非同源，共有三种行为受到限制。

- Cookie、LocalStorage 和 SessionStorage IndexDB 无法读取。
- DOM 无法获得。
- AJAX 请求不能发送。
