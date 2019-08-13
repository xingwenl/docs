# 常用的三方库

## 启动页
解决启动白屏， 这个可以在启动时设定一张图片，，在数据加载完成时，隐藏此图片，

> [react-native-splash-screen](https://www.npmjs.com/package/react-native-splash-screen)

```bash

yarn  add react-native-splash-screen
# 或者
npm install react-native-splash-screen --save

# link
react-native link react-native-splash-screen

```

### ^3.2.0 版本
<!-- tabs:start -->

## ** iOS **

```m

#import "AppDelegate.h"
// other
#import "RNSplashScreen.h"

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // ...other code
 
    // rootView 主 View 
    [RCTSplashScreen show:rootView];
    return YES;
}

```


## ** Android **
在 app/src/main/res/layout 创建 launch_screen.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent">
    <ImageView android:layout_width="match_parent" android:layout_height="match_parent" android:src="@drawable/launch_screen" android:scaleType="centerCrop" />
</RelativeLayout>
```

适配 launch_screen.png

> 未写完 

## ** js **

```js
import SplashScreen from 'react-native-splash-screen'
export default class WelcomePage extends Component {
 
    componentDidMount() {
    	// do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        SplashScreen.hide();
    }
}
```
<!-- tabs:end -->


## 照相机和选择图片功能

> [react-native-image-picker](https://www.npmjs.com/package/react-native-image-picker)

### 安装

```bash
yarn add react-native-image-picker
react-native link react-native-image-picker
```

<!-- tabs:start -->

## ** iOS **

info.plist 文件中添加权限

```xml

<key>Privacy - Camera Usage Description string</key>
<string>我们需要访问您的相机，以便您正常使用拍摄、上传图片、上传头像等服务</string>
<key>Privacy - Photo Library Usage Description string</key>
<string>我们需要访问您的相册，以便您正常使用头像修改、图片上传、图片保存等服务</string>
<key>Privacy - Photo Library Additions Usage Description string</key>
<string>请允许馫美天保存您的图片到相册</string>

```

## ** Android **

在AndroidManifest.xml文件中添加权限：
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```

##### ** js **

```js
import ImagePicker from 'react-native-image-picker';
/**
 *
 *
 * @param {*} [options={}]
 * @returns {Promise}
 */
export const showImagePicker = (options = {}) => {
    return new Promise((res, rej) => {
        const tmpOptions = {
            title: '请选择照片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '相机',
            chooseFromLibraryButtonTitle: '相册',
            cameraType: 'back',
            mediaType: 'photo',
            allowsEditing: true,
            noData: true,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            ...options,
        };
        ImagePicker.showImagePicker(tmpOptions, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
              rej(response)
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
                // response.uri
                res(response)
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            }
        });
    })
}
```

<!-- tabs:end -->

## 图片放大缩小

> [react-native-image-zoom-viewer](https://www.npmjs.com/package/react-native-image-zoom-viewer)

## 图片懒加载

> [react-native-rn-cacheimage](https://www.npmjs.com/package/react-native-rn-cacheimage)

## 键盘

解决键盘弹出时 页面自适应，失去焦点 自动弹回

> [react-native-keyboard-mgr](https://www.npmjs.com/package/react-native-keyboard-mgr)

```js
import KeyBorardManager from 'react-native-keyboard-mgr'
import React, { PureComponent } from 'react'

class App extends PureComponent {
    componentDidMount() {

        // 开启
        KeyBorardManager.setEnabled(true)

        // 键盘上的工具栏
        KeyBorardManager.setEnableAutoToolbar(true)
    }
}
```

## 字体

> [react-native-vector-icons](https://www.npmjs.com/package/react-native-vector-icons)

## 微信支付 登陆 

> [react-native-wechat](https://www.npmjs.com/package/react-native-wechat)

```js
import * as WeChat from "react-native-wechat";

// data 一般服务器给
export const wxPay = (data, callback) => {
    WeChat.isWXAppInstalled()
    .then((isInstalled) => {
        if (isInstalled) {
            WeChat.pay({
                partnerId: data.partnerId,  // 商家向财付通申请的商家id
                prepayId: data.prepayId,   // 预支付订单
                nonceStr: data.nonceStr,   // 随机串，防重发
                timeStamp: data.timeStamp    ,  // 时间戳，防重发.
                package: data.package,    // 商家根据财付通文档填写的数据和签名
                sign: data.sign       // 商家根据微信开放平台文档对数据做的签名
            }).then((requestJson)=>{
                console.log(requestJson)
                //支付成功回调                                           
                if (requestJson.errCode==0){
                    //回调成功处理
                    callback && callback('success')
                }else {
                    callback && callback()
                }
            }).catch((err)=>{
                console.log(err)
                callback && callback()
                // Alert.alert('支付失败')
            })
        } else {
            // Alert.alert('请安装微信');
        }
    });
}
```

## 热更新

> [react-native-code-push](https://www.npmjs.com/package/react-native-code-push)

## 上传
rn-fetch-blob 解决上传问题
> 忘了是咋解决的了，


* 基础文档
    - [react-native 中文网](https://reactnative.cn/)
    - [react-native 官网](https://facebook.github.io/react-native/)

* 工具文档
    - [Ant Design Mobile](https://mobile.ant.design/)
    - [React Navigation](https://reactnavigation.org/docs/zh-Hans/getting-started.html)
    - [android启动页](http://www.jianshu.com/p/da658aceeb44)

