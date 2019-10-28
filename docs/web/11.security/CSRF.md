---
id: CSRF
title: CSRF
sidebar_label: CSRF
---

CSRF（Cross-site request forgery）跨站请求伪造，也被称为“OneClick Attack”或者“Session Riding”，通常缩写为CSRF或者XSRF，是一种对网站的恶意利用。


<div align="center">
    <img width="640" height="365" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/xwd1jG.png" />
</div>

cookie 和 token 都存放在 header 中，为什么不会劫持 token？
CSRF攻击的原因是浏览器会自动带上cookie，而浏览器不会自动带上token

教程推荐：https://www.youtube.com/watch?v=gEPii2y3ISQ