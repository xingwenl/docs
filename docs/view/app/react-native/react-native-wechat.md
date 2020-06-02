# 微信支付 登陆

### 安装

> [react-native-wechat](https://www.npmjs.com/package/react-native-wechat)
```bash
yarn add react-native-wechat
react-native link react-native-wechat
```
### 准备
微信开发平台去注册账号并且创建一个移动应用。([地址：https://open.weixin.qq.com](https://open.weixin.qq.com))
> [安卓签名apk](https://res.wx.qq.com/open/zh_CN/htmledition/res/dev/download/sdk/Gen_Signature_Android2.apk) 输入包名即可获得应用签名，需要安卓手机

<!-- tabs:start -->
## **iOS**

### 配置
ARGETS 下项目名 -> info.plist
```
添加 URL type
URL Schema 填写 申请的微信appid
ldentifier 填写 weixin

Custom iOS Target Properties iOS白名单
LSApplicationQueriesSchemes Array
item0 weixin
item1 wechat
```

### AppDelegate.m添加以下代码
```m
// 注意检查 这个 别被别的库拦截了，
#import <React/RCTLinkingManager.h>
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                            sourceApplication:sourceApplication annotation:annotation];
}
```

## **Android**

### 
在MainActivity.java 同级 创建名为 “wxapi” 的文件夹
wxapi里 创建 WXEntryActivity.java 用于获得微信的授权和分享权限
```js
// WXEntryActivity.java
package your.package.wxapi; // 你自己的包名
import android.app.Activity;
import android.os.Bundle;
import com.theweflex.react.WeChatModule;

public class WXEntryActivity extends Activity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    WeChatModule.handleIntent(getIntent());
    finish();
  }
}
```
wxapi里 创建WXPayEntryActivity.java，用于获得微信的授权和支付权限
```js
// WXPayEntryActivity.java
package your.package.wxapi;

import android.app.Activity;
import android.os.Bundle;
import com.theweflex.react.WeChatModule;

public class WXPayEntryActivity extends Activity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    WeChatModule.handleIntent(getIntent());
    finish();
  }
}
```

### 在AndroidManifest.xml添加声明
```xml
<manifest>
  <application>
    <activity
      android:name=".wxapi.WXEntryActivity"
      android:label="@string/app_name"
      android:exported="true"
    />
    <activity
      android:name=".wxapi.WXPayEntryActivity"
      android:label="@string/app_name"
      android:exported="true"
    />
  </application>
</manifest>
```

### 在proguard-rules.pro中添加(代码为混淆设置)：
```js
-keep class com.tencent.mm.sdk.** {
   *;
}
```

### link完成，出错可以检查
在android/settings.gradle文件下添加以下代码：
```java
include ':RCTWeChat'
project(':RCTWeChat').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-wechat/android')
```
在android/app/build.gradle的dependencies部分添加以下代码：
```
dependencies {
  compile project(':RCTWeChat')   
}
```
MainApplication.java 
```java
import com.theweflex.react.WeChatPackage;

@Override
protected List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
   ...
    new WeChatPackage()       
  );
}
```

<!-- tabs:end -->

### js
```js
import * as WeChat from "react-native-wechat";

// 在首页先注册
const WECHART_APPID = "123123123"
WeChat.registerApp(WECHART_APPID);


// 支付 data 一般服务器给
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

// 登录
// 安卓需要配置回调
// iOS 如果收不到回调，可能被其他库给拿去了，比如我就是引入了友盟分享，后面改成 这种了，一直收不到回调 
export const wxLogin = () => {

    WeChat.isWXAppInstalled()
        .then((isInstalled) => {
            if (isInstalled) {
                // 应用授权作用域，如获取用户个人信息则填写snsapi_userinfo
                let scope = 'snsapi_userinfo';
                // 用于保持请求和回调的状态，授权请求后原样带回给第三方。该参数可用于防止csrf攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加session进行校验
                let state = 'lxw';

                // 这个请求只能获取code ，你自己去请求微信的接口，获取 access_token 和 openid
                // 返回参数 ，
                /*
                    {
                        appid: "wxf5201cdb7a4b7096"
                        code: "061xI7x41m5lZS1tYBw41CW1x41xI7xm"
                        errCode: 0
                        state: "lxw"
                        type: "SendAuth.Resp"
                    }
                */
                WeChat.sendAuthRequest(scope, state)
                .then(res => {
                    if (res.errCode === 0) {
                        // 获取 openid
                        this.getOpenid(res.code)
                    }
                })
                .catch(err => {
                })
            }

        })

    getOpenid() {
        // 这个请求是获取access——token
        // https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
        // 返回参数
        /*
        {
            "access_token": "ACCESS_TOKEN",
            "expires_in": 7200,
            "refresh_token": "REFRESH_TOKEN",
            "openid": "OPENID",
            "scope": "SCOPE",
            "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
        }
        */
    }
}
```

> [微信登录文档](https://developers.weixin.qq.com/doc/oplatform/Mobile_App/WeChat_Login/Development_Guide.html)