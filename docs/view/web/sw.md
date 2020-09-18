# Service Worker

## 什么是 Service Worker5

Service Worker 是一种 Web Worker。它本质上是一个与主浏览器线程分开运行的 JavaScript 文件，可以拦截网络请求、缓存资源或从缓存中检索资源、传递推送消息


由于 Workers 与主线程分开运行，因此 Service Worker 独立于与其关联的应用程序。这将导致以下结果:

- 由于 Service Worker 没有阻塞（它被设计为完全异步），同步 XHR 和localStorage 不能在 Service Worker 中使用。
- 当应用程序处于没有活动状态时，Service Worker 可以从服务器接收推送消息。这可以让您的应用程序向用户显示推送通知，即使它未在浏览器中打开。**注意** 浏览器在没有运行的情况下是否能收到通知取决于浏览器如何与操作系统集成。例如，在桌面操作系统上，Chrome 浏览器和 Firefox 只会在浏览器运行时收到通知。然而，Android 是在接收到推送消息时唤醒任何浏览器，并且无论浏览器状态如何都将始终接收推送消息
- Service Worker 不能直接访问 DOM。为了与页面通信，需使用 postMessage() 方法发送数据，并使用 message 事件侦听器来接收数据。

- 无法操作DOM
- 只能使用HTTPS以及localhost
- 可以拦截全站请求从而控制你的应用
- 与主线程独立不会被阻塞（不要再应用加载时注册sw）
- 完全异步，无法使用XHR和localStorage
- 一旦被 install，就永远存在，除非被 uninstall或者dev模式手动删除
- 独立上下文
- 响应推送
- 后台同步


## Service Worker生命周期

![sw](../../../assets/sw/1.png)

- register 这个是在client端发起，注册一个serviceWorker， 需要一个专门处理sw逻辑的文件
- Parsed 注册完成，解析成功，尚未安装
- installing 注册中，此时 sw 中会触发 install 事件， 需知 sw 中都是事件触发的方式进行的逻辑调用，如果事件里有 event.waitUntil() 则会等待传入的 Promise 完成才会成功
- installed(waiting) 注册完成，但是页面被旧的 Service Worker 脚本控制, 所以当前的脚本尚未激活处于等待中，可以通过 self.skipWaiting() 跳过等待。
installed(waiting) 注册完成，但是页面被旧的 Service Worker 脚本控制, 所以当前的脚本尚未激活处于等待中，可以通过 self.skipWaiting() 跳过等待。

- activating 安装后要等待激活，也就是 activated 事件，只要 register 成功后就会触发 install ，但不会立即触发 activated，如果事件里有 event.waitUntil() 则会等待这个 Promise 完成才会成功，这时可以调用 Clients.claim() 接管所有页面。

- activated 在 activated 之后就可以开始对 client 的请求进行拦截处理，sw 发起请求用的是 fetch api，XHR无法使用

- fetch 激活以后开始对网页中发起的请求进行拦截处理

- terminate 这一步是浏览器自身的判断处理，当 sw 长时间不用之后，处于闲置状态，浏览器会把该 sw 暂停，直到再次使用

- update 浏览器会自动检测 sw 文件的更新，当有更新时会下载并 install，但页面中还是老的 sw 在控制，只有当用户新开窗口后新的 sw 才能激活控制页面

- redundant 安装失败, 或者激活失败, 或者被新的 Service Worker 替代掉

- Service Worker 脚本最常用的功能是截获请求和缓存资源文件, 这些行为可以绑定在下面这些事件上:

- install 事件中, 抓取资源进行缓存

- activate 事件中, 遍历缓存, 清除过期的资源

- fetch 事件中, 拦截请求, 查询缓存或者网络, 返回请求的资源


## PWA

PWA就是渐进式web应用(Progressive Web App)。早在16年初，Google便提出PWA，希望提供更强大的web体验，引导开发者回归开放互联网。它弥补了web对比Native App急缺的几个能力，比如离线使用、后台加载、添加到主屏和消息推送等，同时它还具备了小程序标榜的“无需安装、用完即走”的特性。

虽然PWA技术已经被W3C列为标准，但是其落地情况一直以来是很让人失望的，始终受到苹果的阻碍，最重要的原因在于PWA绕过Apple Store审核，直接推给用户。如果普及，这将威胁到苹果的平台权威，也就意味着苹果与开发者的三七分成生意将会落空。

所以一直以来safrai不支持mainfest以及service worker这两项关键技术，即使在18年开始支持了，但是对PWA的支持力度也远远低于安卓，具体体现在service worker缓存无法永久保存，以及service worker的API支持不够完善，一个最明显的不同在于安卓版本的PWA会保留你的登录状态，并且会系统级推送消息。而在苹果上，这两点都做不到。也就是说，iPhone上的微博PWA，每次打开都要重新登录，而且不会收到任何推送信息。

另外由于某些不可描述的原因，在国内无法使用Service Worker的推送功能，虽然国内已经有两家公司做了service worker的浏览器推送，但是成熟度还有待调研。

由于目前各版本手机浏览器对service worker的支持度都不太相同，同一个接口也存在差异化还有待统一，之于我们来说，也只能用Service Worker做一做PC浏览器的缓存了。

## 代码实践

### index.html
```html
<script src="./swctl.js"></script>
<script>
    window.addEventListener("load", () => {
        registerSW();
    })
</script>
```

### swctl.js

```js
(function (w) {
  function registerSW(path = '/sw.js') {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register(path).then((registration) => {
            console.log("Registered events at scope: ", registration.scope);
        });
    }
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            createReloadBtn()
            console.log(' %c 网站需要更新html', 'color: green;');
        });
    }
  }
  w.registerSW = registerSW;
  function createReloadBtn() {
    const style =  `position: fixed;
    box-shadow: 0 0 10px rgb(11 135 218);
    min-width: 220px;
    bottom: 100px;
    text-align: center;
    right: 10px;
    border-radius: 5px;
    cursor: pointer;
    background-color: #fff;
    line-height: 50px;`
    const button = `
        <div class="sw-pop" style="${style}">
            <a style="color: #0b87da" href="javascript:location.reload();">有新内容啦，点我刷新</a>
        </div>
    `
    const dom = document.createElement('div');
    dom.innerHTML = button;
    document.body.appendChild(dom)
    }
})(window);
```

### sw.js
```js
// 缓存名称
const RUNTIME_VERSION = '1.0.3';
// 需要缓存的url
const HOSTNAME_WHITELIST = [
    self.location.hostname,
    'fonts.gstatic.com',
    'fonts.googleapis.com',
    'unpkg.com',
    'script.hotjar.com'
]

// 注册成功以后抛出的install事件 
// 通常来说，当我们监听到这个事件的时候要做的事情就是缓存所有静态文件
// console.log('install -> 当前版本', RUNTIME_VERSION)
self.addEventListener('install', event => {
    console.log('install -> 当前版本', RUNTIME_VERSION)
    _install(event);
})

// 安装成功后就会等待进入activate阶段
self.addEventListener('activate', event => {
    console.log('activate -> 当前版本', RUNTIME_VERSION)
    _activate(event);
})

// 所有网络请求都在这里被拦截。
self.addEventListener('fetch', event => {
    _fetch(event);
})


function _install() {
	self.skipWaiting();
}

// 执行了一个event.waitUntil函数，该函数是service worker标准提供的函数，接收一个promise参数，并且监听函数内所有的promise,只要有一个promise的结果是reject，那么这次安装就会失败。
function _activate(event) {
    event.waitUntil(
        deleteCache().then(() => {
            // 立即接管所有页面
            self.clients.claim()
        })
    )
}
function _fetch(event) {
    if (HOSTNAME_WHITELIST.includes(new URL(event.request.url).hostname)) {
        console.log(`[${event.request.method}]`, event.request.url);
        
        // 缓存的请求
        const cached = caches.match(event.request);

        // 需要缓存的url
        const fixedUrl = getFixedUrl(event.request);

        // 如果存在缓存,那么fetch将发送一个条件查询request和一个正常的request, 拿到响应后,它会更新http缓存
        const fetched = fetch(fixedUrl, { cache: 'no-cache' });
        
        // 克隆请求。因为请求是一个“stream”，只能用一次。但我们需要用两次，一次用来缓存，一次给浏览器抓取内容，所以需要克隆
        const fetchedCopy = fetched.then(resp => resp.clone())

        // 哪个快就用哪个
        event.respondWith(
            Promise.race([fetched.catch(_ => cached), cached])
                .then(resp => resp || fetched)
                .catch(_ => { /* eat any errors */ })
        )

        
        // 缓存请求
        event.waitUntil(
            Promise.all([fetchedCopy, caches.open(RUNTIME_VERSION)])
                .then(([res, cache]) => res.ok && cache.put(event.request, response))
                .catch(_ => { /* eat any errors */ })
        )
    }
}

// function 

// 清楚不是本版本的缓存
function deleteCache() {
    console.log('[deleteCache] 开始删除');
    return caches.keys().then(cacheNames => {
        console.log('[deleteCache] caches.keys');
        return cacheNames.filter(cacheName => RUNTIME_VERSION !== cacheName);
    })
    .then(cachesToDelete => {
        console.log('[deleteCache] cachesToDelete');
        return Promise.all(cachesToDelete.map(cacheToDelete => {
            return caches.delete(cacheToDelete);
        }));
    })
    .catch(err => {
        console.log('deleteCache', err);
        return err;
    })
}
function getFixedUrl(req) {
    var url = new URL(req.url)
    // 保持协议一致 ，http或https
    url.protocol = self.location.protocol
    // 缓存24h
    var now = Math.floor(Date.now() / 1000 / 60 / 60 / 24)
    if (url.hostname === self.location.hostname) {
        url.search += (url.search ? '&' : '?') + 'cache-bust=' + now
    }
    return url.href
}
```



> [参考](http://vanessa.b3log.org/sw-in-pwa-experience)

> 查看谷歌worker chrome://serviceworker-internals/

> 睡觉了  :100: