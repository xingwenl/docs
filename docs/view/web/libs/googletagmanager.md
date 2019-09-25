# googletagmanager

谷歌统计，用于埋点，统计界面访问次数和其他操作自定义事件
## 用法
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-12121211-1"></script>
<script>
    const gId = 'UA-12121211-1' //id是谷歌统计给的id
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', gId);
</script>
```

## 自定义事件
```js
gtag('event', 'action', {
    event_category: '类别',
    event_label: '标签',
    event_callback: () => {
        console.log('统计成功')
    }
})
```

## vue 页面访问统计
其他框架类似，就是在路由切换的时候，记录下
```js
router.afterEach((to, from) => {
  gtag('config', gId, { 'page_path': to.fullPath });
})
```


> [具体API](https://developers.google.cn/gtagjs/reference/api?hl=zh-cn)