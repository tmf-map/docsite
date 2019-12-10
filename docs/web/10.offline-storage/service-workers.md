---
id: service-workers
title: Service Workers
sidebar_label: Service Workers
---
W3C 组织早在2014年5月就提出过 Service Worker 这样的一个 HTML5 API，主要用来做持久的离线缓存。

当然这个 API 不是凭空而来，至于其中的由来我们可以简单的捋一捋：

浏览器中的 JavaScript 都是运行在一个单一主线程上的，在同一时间内只能做一件事情。随着 Web 业务不断复杂，我们逐渐在 Js 中加了很多耗资源、耗时间的复杂运算过程，这些过程导致的性能问题在 Web App 的复杂化过程中更加凸显出来。

W3C 组织早早的洞察到了这些问题可能会造成的影响，这个时候有个叫 Web Worker 的 API 被造出来了，这个 API 的唯一目的就是解放主线程，Web Worker 是脱离在主线程之外的，将一些复杂的耗时的活交给它干，完成后告诉主线程。

一切问题好像是解决了，但 Web Worker 是临时的，每次做的事情的结果还不能被持久存下来，如果下次有同样的复杂操作，还得费时间的重新来一遍。

Service Worker 就这样诞生了，它在 Web Worker 的基础上加上了持久离线缓存能力。它被安装后便一直存在，随时准备接受主线程的命令。需要的时候可以直接唤醒，不用的时候自动睡眠。

因此，Service Worker 可以让缓存做到优雅和极致，使站点在离线情况下可以秒开，极大的提升了用户体验，使 Web App 相对于 Native App 的缺点更加弱化。

# Service Worker 功能：
1. 可编程拦截代理请求和返回，缓存文件，缓存的文件可以被网页进程取到（包括网络离线状态）
2. 离线内容开发者可控
3. 能向客户端推送消息

# Service Worker 使用需注意：
1. 必须在 HTTPS 环境下才能工作（允许调试时为`localhost`）
2. 同源限制：分配给worker线程运行的脚本文件，必须与主线程的脚本文件同源
3. Dom限制：worker线程所在全局对象，与主线程不一样，无法读取主线程所在网页的dom对象，也无法使用document、window、parent这些对象。但是，可以使用navigator和location对象
4. 通信联系：worker线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。worker 线程通过 postMessage 方法告诉主线程，而主线程通过 onMessage 方法得到结果反馈。
5. 异步实现：内部大都是通过 Promise 实现 

# Service Worker 生命周期
Service Worker 的生命周期完全独立于网页。

1. 注册：在主线程中注册位于`/sw.js`的 Service Worker。浏览器会在后台下载所需文件，解析并执行 Service Worker。如果这期间出现任何错误，Service Worker 就不会被安装，下一次会进行重试。
```javascript
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js', {scope: './'}).then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
```
如果注册成功，Service Worker 就在`ServiceWorkerGlobalScope`环境中运行，这是一个特殊类型的worker上下文环境。自此，Service Worker 可以处理事件了。

2. 安装：注册成功后，Service Worker 首先会收到安装事件。我们可以打开缓存，缓存文件，确认所需资源是否已经缓存。
```javascript
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    '/styles/main.css',
    '/script/main.js'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});
```
3. 激活：安装成功后，Service Worker 会收到激活事件。一般在此对旧缓存进行清理。
```javascript
self.addEventListener('activate', function(event) {
    // New caches
    var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];
    //Delete old caches 
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
```

4. 重新加载`redundant`：Service Worker 现在可以对其作用域内所有页面进行控制，但仅注册成功后的打开的页面。也就是说，页面起始于有没有 Service Worker，且在页面的接下来生命周期内维持这个状态。所以，页面不得不重新加载以让 Service Worker 获得完全的控制。

# Service Worker 浏览器支持：
[Can I use service worker?](https://caniuse.com/#search=service%20worker)

# Notification API
Notifications API 是用来向用户展示通知消息的接口，需要获取用户同意，即使Web App并没有在浏览器打开。

## Service Worker 给用户推送通知
```javascript
window.addEventListener('load', () => {
    if (!('PushManager' in window)) {
        // Push isn't supported on this browser, disable or hide UI.
        return;
    }

    let promiseChain = new Promise((resolve, reject) => {
        // Requests permission from the user to display notifications.
        const permissionPromise = Notification.requestPermission(result => {
            resolve(result);
        });

        if (permissionPromise) {
            permissionPromise.then(resolve);
        }
    })
    .then(result => {
        if (result === 'granted') {
            execute();
        }
        else {
            console.log('no permission');
        }
    });
});
```
注册位于`/sw.js`的 Service Worker
```javascript
function registerServiceWorker() {
    return navigator.serviceWorker.register('/sw.js')
    .then(registration => {
        console.log('Service worker successfully registered.');
        return registration;
    })
    .catch(err => {
        console.error('Unable to register service worker.', err);
    });
}

```
使用 `showNotification` 方法弹出通知。
```javascript
function execute() {
    registerServiceWorker().then(registration => {
        registration.showNotification('Hello World!');
    });
}
```

## Notifications 浏览器支持：
[Can I use notifications?](https://caniuse.com/#search=notifications)

1. [LAVAS PWA文档](https://lavas.baidu.com/pwa)
2. [下一代 Web 应用模型 — Progressive Web App](https://zhuanlan.zhihu.com/p/25167289)
3. [Service Workers: an Introduction](https://developers.google.com/web/fundamentals/primers/service-workers?hl=zh-CN)
4. [使用 Service Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers)
5. [Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)
5. [Displaying a Notification](https://developers.google.com/web/fundamentals/push-notifications/display-a-notification)
