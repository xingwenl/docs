# js 常用方法

## 时间格式化
```js
/**
 * @description 时间格式化
 * @param @{Number} time
 * @param @{String} fmt = [yyyyMMddhhmmss] 可选值
 */
function formatDate(time, fmt){
    var now = new Date()
    var date = new Date(time);
    if(date == "Invalid Date"){
        date = now;
    }
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
```

## 判断设备

```js
/**
 * [设备检测]
 * @return {Object} [设备检测对象]
 * {Object} [Object.trident   IE内核]
 * {Object} [Object.presto    opera内核]
 * {Object} [Object.isWebKit  苹果、谷歌内核]
 * {Object} [Object.isMobile  是否为移动终端]
 * {Object} [Object.isIOS     ios终端]
 * {Object} [Object.isAndroid android终端或者uc浏览器]
 * {Object} [Object.iPhone    是否为iPhone或者QQHD浏览器]
 * {Object} [Object.iPad      是否iPad]
 * {Object} [Object.webApp    是否web应该程序，没有头部与底部]
 * {Object} [Object.isWeChat  是否为微信]
 */
function deviceDetect(){
    var u = navigator.userAgent;
    return {
        trident: u.indexOf("Trident") > -1,
        presto: u.indexOf("Presto") > -1,
        isWebKit: u.indexOf("AppleWebKit") > -1,
        gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1,
        isMobile: !!u.match(/AppleWebKit.*Mobile.*/),
        isIOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        isAndroid: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,
        iPhone: u.indexOf("iPhone") > -1 ,
        iPad: u.indexOf("iPad") > -1,
        webApp: u.indexOf("Safari") == -1,
        isWeChat: u.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'
    };
},
```

## 函数防抖和节流

函数防抖(debounce), 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。

```js
/**
* 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 idle，action 才会执行
* @param idle   {number}    空闲时间，单位毫秒
* @param action {function}  请求关联函数，实际应用需要调用的函数
* @return {function}    返回客户调用函数
*/
function debounce(fn, wait) {
    var timer = null;
    return function () {
        var context = this
        var args = arguments
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(function () {
            fn && fn.apply(context, args)
        }, wait)
    }
}
```

函数节流，如果将水龙头拧紧直到水是以水滴的形式流出，那你会发现每隔一段时间，就会有一滴水流出。也就是会说预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新周期

```js

/**
* 频率控制 返回函数连续调用时，action 执行频率限定为 次 / delay
* @param method {function}  请求关联函数，实际应用需要调用的函数
* @param wait  {number}    延迟时间，单位毫秒
* @return {function}    返回客户调用函数
*/
function throttle(method, wait, {leading = true, trailing = true} = {}) {
    let timeout, result
    let methodPrevious = 0
    // 记录上次回调触发时间（每次都更新）
    let throttledPrevious = 0
    let throttled =  function(...args) {
        let context = this
        return new Promise(resolve => {
            let now = new Date().getTime()
            // 两次触发的间隔
            let interval = now - throttledPrevious
            // 更新本次触发时间供下次使用
            throttledPrevious = now
            // 更改条件，两次间隔时间大于wait且leading为false时也重置methodPrevious，实现禁止立即执行
            if (leading === false && (!methodPrevious || interval > wait)) {
                methodPrevious = now
            }
            let remaining = wait - (now - methodPrevious)
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout)
                    timeout = null
                }
                methodPrevious = now
                result = method.apply(context, args)
                resolve(result)
                // 解除引用，防止内存泄漏
                if (!timeout) context = args = null
            } else if (!timeout && trailing !== false) {
                timeout = setTimeout(() => {
                methodPrevious = leading === false ? 0 : new Date().getTime()
                timeout = null
                result = method.apply(context, args)
                resolve(result)
                // 解除引用，防止内存泄漏
                if (!timeout) context = args = null
                }, remaining)
            }
        })
    }

    throttled.cancel = function() {
        clearTimeout(timeout)
        methodPrevious = 0
        timeout = null
    }

    return throttled
}
```
## 排序
```js
var a = [{name: 'a'},{name: 'd'},{name: 'c'},{name: 'b'}]

a.sort((a, b) => {
	return a.name.localeCompare(b.name)
})
```
## 随机数组
```js
Array.prototype.shuffle = function() {
  let m = this.length, i;
  while (m) {
    i = (Math.random() * m--) >>> 0;
    [this[m], this[i]] = [this[i], this[m]]
  }
  return this;
}
```

## 将元素滚动到指定位置
```js
export function scrollTo(element, to, duration) {
    const requestAnimationFrame = window.requestAnimationFrame || function (func) {
        return setTimeout(() => {
            func && func();
        }, 10);
    };

    if (duration <= 0) {
        element.scrollTop = to;
        return;
    }

    const difference = to - element.scrollTop;
    const perTick = (difference / duration) * 10;
    requestAnimationFrame(() => {
        element.scrollTop += perTick;
        if (element.scrollTop === to) {
            return;
        }
        scrollTo(element, to, duration - 10);
    });
}
```