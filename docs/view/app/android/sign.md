# 生成安卓签名证书

## 安装环境
先安装java环境 /backend/java/环境.md

控制台执行，填好信息即可
```
keytool -genkeypair -v -keystore com.huangliao.yaozhongyi.keystore -alias com.huangliao.yaozhongyi -keyalg RSA -keysize 2048 -validity 10000
```