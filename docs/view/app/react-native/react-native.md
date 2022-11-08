# React-Native

## 项目搭建

### 安装

```bash
npm install -g yarn react-native-cli

yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
```

### 工具配置

<!-- tabs:start -->

#### ** Xcode **

启动 Xcode，并在Xcode | Preferences | Locations菜单中检查一下是否装有某个版本的Command Line Tools

![Xcode](../../../assets/rn/GettingStartedXcodeCommandLineTools.png)

#### ** Android Studio **

##### 安装Android Studio

[首先下载和安装 Android Studio](https://developer.android.google.cn/) 安装界面中选择"Custom"选项，确保选中了以下几项

- Android SDK
- Android SDK Platform
- Performance (Intel ® HAXM) [AMD 处理器看这里](https://android-developers.googleblog.com/2018/07/android-emulator-amd-processor-hyper-v.html)
- Android Virtual Device

> 等待安装 

##### 安装 Android SDK
Android Studio 默认会安装最新版本的 Android SDK

找到 SDK Manager
> 具体路径是Appearance & Behavior → System Settings → Android SDK。

在 SDK Manager 中选择"SDK Platforms"选项卡，然后在右下角勾选"Show Package Details"。展开Android 9 (Pie)选项，确保勾选了下面这些组件

- Android SDK Platform 28
- Intel x86 Atom_64 System Image

然后点击"SDK Tools"选项卡，同样勾中右下角的"Show Package Details"。展开"Android SDK Build-Tools"选项，确保选中了 React Native 所必须的28.0.3版本

##### 配置 ANDROID_HOME 环境变量

```bash
vi ~/.bash_profile
# 如果你不是通过Android Studio安装的sdk，则其路径可能不同，请自行确定清楚。
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/emulator
```
<!-- tabs:end -->


### 创建新项目并运行

```bash
react-native init ReactNativeProject

cd ReactNativeProject
# ios
react-native run-ios
# 安卓
react-native run-android
```



## 遇到的问题

### 版本号别错

### 安卓版本问题
```bash
# ${your ReactNativeProject}/android/build.gradle 文件

buildscript {
    dependencies {
        # 这个需要写上与 Android Studio 对应的版本 
        classpath 'com.android.tools.build:gradle:3.3.2'
    }
}

# ${your ReactNativeProject}/android/app/build.gradle 文件
dependencies {
    # compile 换成 api
    # 旧的 compile project(':@remobile_react-native-splashscreen')
    api project(':@remobile_react-native-splashscreen')
}
```

### 安卓不能微信分享

AndroidManifest里的 package 包名 和 app/build.gradle 里的 applicationId 需要一致， 并且签名需要正式签名，打debug版本时需要正式签名 

```xml
<!-- AndroidManifest.xml -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.baoming">
</manifest>
```
```js
android {
    defaultConfig {
        applicationId "com.baoming"
    }
}
```

### iOS webview 不能播放视频 

```js
// 设为wkwebview
useWebKit={true}
```


### 空格占位
```
&#32; == 普通的英文半角空格
&#160; == &nbsp; == &#xA0; == no-break space （普通的英文半角空格但不换行）
&#12288; == 中文全角空格 （一个中文宽度）
&#8194; == &ensp; == en空格 （半个中文宽度）
&#8195; == &emsp; == em空格 （一个中文宽度）
&#8197; == 四分之一em空格 （四分之一中文宽度）
————————————————
版权声明：本文为CSDN博主「非動ご」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/r122555/java/article/details/96335357
```

### 使用@装饰器
```bash
# 安装
npm i -D babel-preset-stage-2
npm i -D babel-preset-react-native-stage-0

# 在.babelrc 文件添加如下配置
{
    "presets": [
        "react-native-stage-0/decorator-support"
    ]
}

# 以上不行 则 安装babel7插件
npm i -D @babel/plugin-proposal-decorators

# 在.babelrc 文件添加如下配置
"plugins": [
    ["@babel/plugin-proposal-decorators", {"legacy": true}]
]
```