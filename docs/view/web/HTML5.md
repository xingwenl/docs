# HTML

## 不常用

### apple-touch-icon
现今移动设备越来越多，苹果为iOS设备配备了apple-touch-icon私有属性，添加该属性，在iPhone,iPad,iTouch的safari浏览器上可以使用添加到主屏按钮将网站添加到主屏幕上，方便用户以后访问。实现方法是在HTML文档的<head>标签加入下面代码即可

```html
<link rel="apple-touch-icon" href="/custom_icon.png"/> 
```
apple-touch-icon 标签支持sizes属性，可以用来放置对应不同的设备。

57×57（默认值）的图标对应320×640的iphone老设备，72×72对应ipad，114×114对应retina屏的iPhone及iTouch。ipad3对应144×144的高分辨率。

完善写法
```html
<link rel="apple-touch-icon" sizes="57x57" href="touch-icon-iphone.png" />
<link rel="apple-touch-icon" sizes="72x72" href="touch-icon-ipad.png" />
<link rel="apple-touch-icon" sizes="114x114" href="touch-icon-iphone4.png" />  
<link rel="apple-touch-icon" sizes="144x144" href="apple-touch-icon-ipad3-144.png" /
```

apple-touch-icon-precomposed 可不做高光处理

### apple-mobile-web-app-capable
是设置web应用是否是全屏模式运行
```html
<meta name="apple-mobile-web-app-capable" content="yes">
```

### 启用或禁用自动识别电话
```html
<meta name="format-detection" content="telephone=no">

<meta content="telephone=no,email=no" name="format-detection">
```

### 顶部状态栏背景色
```html
<meta name="apple-mobile-web-app-status-bar-style"content="black"/>
```

### 设置缓存
手机页面通常在第一次加载后会进行缓存，然后每次刷新会使用缓存而不是去重新向服务器发送请求。如果不希望使用缓存可以设置no-cache。
```html
<meta http-equiv="Cache-Control"content="no-cache"/>
```

### 禁止复制、选中文本
```css
-webkit-user-select：none；
-moz-user-select：none；
-khtml-user-select：none;
user-select:none;
```
### 旋转屏幕时，字体大小自适应问题
```css
-webkit-text-size-adjust:100%;
```

### 禁止缩放
```html
<meta name="viewport"content="user-scalable=0"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0" />
```

### input type=file

```html
<img src="" id="img">
<input type="file" name="" id="file" onchange="onchangeC(this)">

<script>
	const $img = document.getElementById('img')
	function onchangeC(e) {
		const fileRead = new FileReader()
		fileRead.readAsDataURL(e.files[0])
		fileRead.onloadend = (e) => {
			$img.src = e.target.result
		}
	}

    // ajax 上传
    let formData = new FormData()
    formData.append('img', document.getElementById("file").files[0])
</script>
```

## 参考文献

> [移动端常见的一些兼容性问题](https://zhuanlan.zhihu.com/p/24890540)

### position: fixed 失效

> 上层元素有的使用了transform: translate(0, 0);导致position: fixed功能失效了。
