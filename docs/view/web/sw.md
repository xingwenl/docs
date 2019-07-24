# Service Worker

## 什么是 Service Worker

Service Worker 是一种 Web Worker。它本质上是一个与主浏览器线程分开运行的 JavaScript 文件，可以拦截网络请求、缓存资源或从缓存中检索资源、传递推送消息

由于 Workers 与主线程分开运行，因此 Service Worker 独立于与其关联的应用程序。这将导致一下结果:

- 由于 Service Worker 没有阻塞（它被设计为完全异步），同步 XHR 和localStorage 不能在 Service Worker 中使用。
- 当应用程序处于没有活动状态时，Service Worker 可以从服务器接收推送消息。这可以让您的应用程序向用户显示推送通知，即使它未在浏览器中打开。**注意** 浏览器在没有运行的情况下是否能收到通知取决于浏览器如何与操作系统集成。例如，在桌面操作系统上，Chrome 浏览器和 Firefox 只会在浏览器运行时收到通知。然而，Android 是在接收到推送消息时唤醒任何浏览器，并且无论浏览器状态如何都将始终接收推送消息
- Service Worker 不能直接访问 DOM。为了与页面通信，需使用 postMessage() 方法发送数据，并使用 message 事件侦听器来接收数据。

> [参考](http://vanessa.b3log.org/sw-in-pwa-experience)

> 睡觉了  :100: