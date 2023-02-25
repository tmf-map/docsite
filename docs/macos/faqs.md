---
title: FAQs
sidebar_label: FAQs
---

## 相簿中多次收到垃圾信息

<Img w="400" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/xiaPgG.jpg' alt='xiaPgG'/>

当你使用共享相薄的时候会偶尔收到此类邮件，目前没发现特别好的解决方法，可以尝试：

1. 关闭共享相册
2. 更换 AppleID 邮箱，个人邮箱是非常私密的信息，不要随意发布在网上，建议不同用途用不同邮箱，避免一箱多用

[More](https://discussionschinese.apple.com/thread/251911981)

## 系统英文，将地图显示内容改为中文

```bash
defaults write com.apple.maps AppleLanguages '(zh-CN)'
```

想变回英文只需改成 `'en-US'` 即可。

## 显示器突然局部花屏

```bash
sudo pmset -a GPUSwitch 0
```

- 0 表示集成显卡
- 1 是独立显卡
- 2 将自动切换图形

查看当前是否使用 GPU

```bash
```

## No Xcode or CLT version detected
