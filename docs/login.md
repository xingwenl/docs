# 统一登录
分为小程序模块hxx-mp-login、 h5模块hxx-h5-login两个项目

## h5-mp-login 目录结构

```
├── public
├── src
    └── pages                           // 演示用的页面
        └── entry                       // 展示信息的页面
            └── entry.vue
        └── index                       // 初始化配置的页面，做演示用的
            └── index.vue
        ── privacy                     // 隐私政策 页面
            └── privacy.vue
    └── uni_modules/hxx-login           // 组件库，小程序引入的
        └── common
            └── api.js                  //  api相关
            └── autoSwitchAcction.js    // 自动切换身份的逻辑
            └── config.js               // 配置相关，环境
            └── http.js                 // 请求库
            └── md5.js                  
            └── mixins-theme.js         // 主题处理
            └── service.js              // URL的处理方法，如getPage
            └── style.css               // 公共样式
            └── theme-config.js         // 主题配置
            └── useMessage.js           
            └── useUserInfo.js          // 用户基本信息
            └── wxlogin.js              // 微信登录相关的接口
            
        └── components
            └── custom-picker
            └── custom-webview          // 处理webview的组件
            └── login                   // 登录相关的页面
                └── login.vue           // 登录页面 判断用哪种登录方式
                └── password-login.vue  // 账号密码登录
                └── phone-login.vue     // 手机号登录
                └── shortcut-login.vue  // 微信一键登录
                └── loginService.js     // 登录用到的接口
                └── mixins-select-plat.js // 选平台逻辑
        └── pages
            └── entry.vue               // 处理是login 还是其他h5 ，唯一的入口
        └── hxx-login.js                // 暴露hxx-全局方法，

```


## hxx-mp-login 功能
代码在 `hxx-login/hxx-login.js`

| 功能 | API | 说明 |
| --- | --- | --- |
| 登录 | hxxLogin | SSO登录，包含忘记密码、账号密码、手机验证码、微信一键登录 |
| 切换账号 | hxxSwitchAccount | 切换该平台下同一个puid不同身份之间的可用账号 |
| 账号管理 | hxxAccountManage | 进入账号管理页面，功能包括修改密码、手机号绑定、账号注销、账号切换、退出登录 |
| 孩子列表 | hxxChildrenManage | 切换该平台下同一个puid不同身份之间的可用账号 |
| 登录信息 | getState | 展现当前登录家长身份下的孩子列表，可进行新增绑定和解除绑定操作 |

### 跳转页面逻辑
代码 `h5-mp-login/src/uni_modules/hxx-login/page/entry.vue` `h5-mp-login/src/uni_modules/hxx-login/hxx-login.js`

<img src="http://test.web.l-xw.cn/tiaozhuan.jpg" width="100%" />

### hxxLogin流程
代码 `uni_modules/hxx-login/page/entry.vue` `hxx-login/hxx-login.js`
<img src="http://test.web.l-xw.cn/12-30-login.jpg" width="100%" />

### hxxSwitchAccount
切换账号功能，当只有一个家长身份且没有绑定孩子时，可以点击前往绑定孩子
对应h5-login `switchAccount`页面 页面`hxx-h5-login/src/pages/switchAccount`

<img src="http://test.web.l-xw.cn/switchaccount.jpg" />

### hxxAccountManage
对应h5-login accountManagement页面 页面`hxx-h5-login/src/pages/accountManagement`
<img src="http://test.web.l-xw.cn/account.jpg" />

### hxxChildrenManage
进入孩子管理页面，展现当前登录家长的孩子列表
家长可新增绑定孩子或者对已有孩子进行解绑
对应h5-login childrenList, 页面`hxx-h5-login/src/pages/childrenList`
<img src="http://test.web.l-xw.cn/childrenlist.jpg" />


### 使用方法

具体使用方法自行阅读：[hxx-mp-login](https://git.zuoyebang.cc/huixuexi/hxx-mp-login)

```html
// App.vue
<script>
// import 
import { initLoginConfig } from "@/uni_modules/hxx-login/hxx-login";
export default {
  onLaunch: function () {
    console.log("App Launch");
    initLoginConfig({
      appId: this.appId, // 在开放平台注册的appid
      wxAppId: "wx4852d566f42155e2", // 小程序appid
      agreements: [{ title: "《用户隐私协议》", url: "/pages/index/index" }], // 用户隐私协议
      serviceHotline: "9998888", // 服务热线（无则没有账户注销功能）
    });
  }
};
</script>
```
### 演示页面
<img src="http://test.web.l-xw.cn/preview.jpg" />

代码：`src/pages/index/index.vue`



## hxx-h5-login

目录结构

```
├── node_modules/@hxx/h5-login.js
├── public
├── src
    └── api                                 //存放api的地方
    └── assets                              // 图片、字体、style
    └── common                              // 
        └── eventBus.ts                     // 全局eventBus
        └── messager.ts                     // h5与（webview、iframe）之间的通信方法，格式固定uni.postMessage(data:Object）
        └── resetVant.ts                    // 部分vant组件修改默认值
        └── useParseUrl.ts                  // 解析地址参数
    └── pages
        └── accountCancellation               // 注销账号页面
            └──main.ts
            └──index.vue
        └── accountManagement               // 账户管理页面
            └──main.ts
            └──index.vue
        └── addChild                        // 添加孩子
        └── bindPhone                       // 绑定手机号
        └── bwlogin                         // 登录
        └── changePassword                  // 修改密码
        └── changePhone                     // 修改手机号
        └── childrenList                    // 孩子列表
        └── findPwd                         // 找回密码
        └── iframeTest                      // iframe测试
        └── login                           // 登录页
        └── resetPwd                        // 新密码
        └── switchAccount                   // 选择账号
        └── verifyIdentidy                  // 验证身份
    └── style                               // 样式
    └── types                               // 类型
    └── utils                               // 工具
    ...
- package.json
```

## 页面内容
<img src="http://test.web.l-xw.cn/page.jpeg" width="100%" />

