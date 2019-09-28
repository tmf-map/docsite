---
id: http-connection
title: TCP 三次握手和四次挥手
sidebar_label: TCP三次握手和四次挥手
---

## 三次握手

![](https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/0hGlBp.png)

[Youtube: Wireshark 抓包分析实战](https://www.youtube.com/watch?v=QcapJPYUY58)

[作为前端的你了解多少tcp的内容，作者：Guokai](https://juejin.im/post/5c078058f265da611c26c235)

三次最合理：

男（客户端-SYN）：喂喂喂，我是你男票，你听的到吗？

女（服务端-SYN, ACK）：在在在，我能听到，我是你女票，你能听到我吗? 

男（客户端-ACK）：听到了。

男：我们明天一起出去玩吧。

### 为什么是三次握手，而不是两次握手？
1、假设是两次握手，客户端将自己的初始序列号发送给服务端，服务端保存了客户端的初始序列号。如果服务端发送自身的初始序列号和同步信号（SYN）给客户端的数据包丢失，此时客户端和服务端无法就双方序列号达成一致。

2、当客户端发送给服务端的请求因为某些原因停滞，请求超时重传后，数据传输完毕，此时停滞的请求到达服务端，如果是两次握手，而不是三次握手，此时服务端认为是新的请求，又能与客户端建立链接。

## 四次挥手

<div align="center">
    <img src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/ziozDM.png" width="200" height="300" align='left'/>
</div>

男（客户端-FIN）：我要挂了哦

女（服务端-ACK）：等哈，我还要敷面膜

女（服务端-FIN）：我敷完了，现在可以挂了

男（客户端-ACK）：我舍不得挂，你挂吧

女：好吧，我挂了

男：等了2MSL听见嘟嘟嘟的声音后挂断


<br/>
<br/>

### 为什么要等2MSL?

主动方发出确认信号2 MSL(报文最大生存时间)后关闭的主要原因是确保确认信号被被动方接受，如果报文丢包就超时重传，这样避免主动方关闭后，被动方无法正常关闭。

## 总结一下
<div align="center">
    <img src="https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/LqMuFk.png" width="360" height="400" />
</div>
