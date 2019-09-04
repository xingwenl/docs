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