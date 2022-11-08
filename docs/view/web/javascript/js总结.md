# js 总结

## 1 js运行环境

js作为脚本语言运行在浏览器中，浏览器就是js的运行环境。对于众多浏览器厂商来说，他们的内核又是一样的。浏览器内核分为两种： 渲染引擎和js引擎。
渲染引擎：负责网页内容呈现
js引擎：解释js脚步，实现js交互效果。

### 1.1 常见内核
主流浏览器|内核
:--|--:
IE -> EDGE | trident -> edgeHTML


### 屏蔽右键

```Html
<body 
      oncontextmenu="self.event.returnValue = false"
      onselectstart="return false">
```

### setTimeout

设置的timer超过2的31次方，那么setTimeout就无效了，而立刻执行

```js
timer = timer > 2147483647 ? 2147483647 : timer;
```



### XMLHttpRequest

浏览器对简单跨域请求和复杂跨域请求的处理区别

> XMLHttpRequest会遵守同源策略(same-origin policy). 也即脚本只能访问相同协议/相同主机名/相同端口的资源, 如果要突破这个限制, 那就是所谓的跨域, 此时需要遵守CORS(Cross-Origin Resource Sharing)机制
>
> 允许跨域 服务端设置Access-Control-Allow-Origin: *
>
> 还一种叫请求叫preflighted request
>
> preflighted request在发送真正的请求前, 会先发送一个方法为OPTIONS的预请求(preflight request), 用于试探服务端是否能接受真正的请求，如果options获得的回应是拒绝性质的，比如404\403\500等http状态，就会停止post、put等请求的发出

什么情况下请求会变成preflighted request：

- 请求方法不是GET/HEAD/POST
- POST请求的Content-Type并非application/x-www-form-urlencoded, multipart/form-data, 或text/plain
- 请求设置了自定义的header字段