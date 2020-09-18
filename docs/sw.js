const RUNTIME_VERSION = '1.0.4';
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