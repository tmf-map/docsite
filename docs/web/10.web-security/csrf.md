---
title: CSRF
---

## 什么是 CSRF

CSRF（Cross-site request forgery）跨站请求伪造，也被称为“OneClick Attack”或者“Session Riding”，通常缩写为 CSRF 或者 XSRF，是一种对网站的恶意利用。

<Img w="730" legend="图：CSRF 基本原理" src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/F1sPZs.png" />

例如，用户 A 可能正在浏览用户 B 发布消息的聊天论坛。假设 B 制作了一个引用 A 银行网站的 HTML 图像元素，如下所示：

```html
<img src="http://www.bank.com/withdraw?user=A&amount=999999&for=XiaoMing" />
```

如果 A 的银行将其认证信息保存在 cookie 中，并且 cookie 尚未过期，(且没有其他验证身份的东西)，那么 A 的浏览器尝试加载该图片将使用他的 cookie 提交提款表单，从而在未经 A 批准的情况下授权交易。

:::tip

解决办法：增加其他信息的校验（手机验证码，或者其他盾牌）。

:::

cookie 和 token 都存放在 header 中，为什么不会劫持 token？ CSRF 攻击的原因是浏览器会自动带上 cookie，而浏览器不会自动带上 token。

## 参考资料

1. [CSRF 攻击和防御 - Web 安全常识 By 代码真香](https://www.youtube.com/watch?v=gEPii2y3ISQ)
