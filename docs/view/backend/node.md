
# node 简单命令

## npm

```bash
npm init #会引导你创建一个package.json文件，包括名称、版本、作者这些信息等
npm install moduleNames # 安装Node模块
#eg:  npm install express
npm install <name> -g  # 全局安装Node模块
npm install <name> --save # 将信息写入package.json中项目路径中如果有package.json文件
npm view moduleNames # 查看node模块的package.json文件夹
npm list # 查看当前目录下已安装的node包
# 1.查看所有高级的npm moudles

npm list --depth=0

# 2.查看所有全局安装的模块

npm list --depth=0 -global
npm update moduleName # 更新node模块

npm uninstall moudleName # 卸载node模块

npm -v # 查看npm安装的版本

# 3.更新管理
npm install -g npm-check-updates
# 更新node模块
npm-check-updates moudleName -a 
# 更新全部
ncu -a

# 4.config
# 设置淘宝源
npm config get registry

npm config set registry https://registry.npm.taobao.org
npm config set disturl https://npm.taobao.org/dist
npm config set electron_mirror https://npm.taobao.org/mirrors/electron/
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
npm config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/


yarn config set registry https://registry.npm.taobao.org -g
yarn config set disturl https://npm.taobao.org/dist -g
yarn config set electron_mirror https://npm.taobao.org/mirrors/electron/ -g
yarn config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/ -g
yarn config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/ -g
yarn config set chromedriver_cdnurl https://cdn.npm.taobao.org/dist/chromedriver -g
yarn config set operadriver_cdnurl https://cdn.npm.taobao.org/dist/operadriver -g
yarn config set fse_binary_host_mirror https://npm.taobao.org/mirrors/fsevents -g

# 临时修改（只生效一次）
yarn save 包的名字 --registry https://registry.npm.taobao.org/

```
### yrm 
yrm是一个 yarn源管理器，允许你快速地在yarn源间切换
`npm install -g yrm`

#### 列出可选的源
```
yrm ls

npm ---- https://registry.npmjs.org/
cnpm --- http://r.cnpmjs.org/
* taobao - https://registry.npm.taobao.org/
nj ----- https://registry.nodejitsu.com/
rednpm - http://registry.mirror.cqupt.edu.cn/
npmMirror  https://skimdb.npmjs.com/registry/
edunpm - http://registry.enpmjs.org/
yarn --- https://registry.yarnpkg.com
```
带 * 的是当前使用的源


#### 测试所有源的响应时间
```
yrm test
npm ---- 784ms
cnpm --- 290ms
* taobao - 297ms
nj ----- Fetch Error
rednpm - Fetch Error
npmMirror  1353ms
edunpm - Fetch Error
yarn --- Fetch Error
```
#### 切换
切换到taobao镜像源
```
yrm use taobao

YARN Registry has been set to: https://registry.npm.taobao.org/
```

> [http://www.cnblogs.com/linjiqin/p/3765772.html](URL)

- **n**

  控制node版本

  ```bash
  n stable # 安装最新稳定版
  n lts # 安装最新TLS版
  n 6.9.0 # 安装指定版本
  n # 选择版本
  #直接切换使用node版本
  n use 7.6.0 index.js
  
  ```

  > [node版本](https://nodejs.org/zh-cn/download/releases/)

- **forever**  

  管理node进程

  ```bash
  npm install forever -g   # 安装
  
  forever start app.js          # 启动
  
  forever stop app.js           # 关闭
  
  forever start -l forever.log -o out.log -e err.log app.js   # 输出日志和错误
  
  forever.stopAll # 停止所有
  
  forever.list # 查看打开进程
  ```

  > [forever](https://github.com/foreverjs/forever)


## Nginx配置node.js

```bash
vim /usr/local/nginx/conf/nginx.conf

在Nginx中添加一个server类

server {
	listen       80;
	#域名
	server_name  huruji3.com www.huruji3.com;

	location / {
	    #node.js应用的端口
	    proxy_pass http://127.0.0.1:3000;
	    root blog;
	}
	#静态文件交给Nginx直接处理
	location ~ *^.+\.(css | js | txt | swf | mp4)$ {
	    root E:\huruji\blog\wechat_v1.1\public;
	    access_log off;
	    expires 24h;
	}
}
```


## 问题

```bash
info There appears to be trouble with your network connection. Retrying...
```
可能是代理出现了问题

```bash
npm config rm proxy 
npm config rm https-proxy
yarn config delete proxy

# 设置代理
yarn config set sass-binary-site http://npm.taobao.org/mirrors/node-sass
或者
npm config set sass-binary-site http://npm.taobao.org/mirrors/node-sass
```

如果更新中途或者更新完执行node -v报错如下：
```bash
dyld: initializer function 0x0 not in mapped image for /usr/local/bin/node
```
解决办法：删除/usr/local/n/versions/node目录下的所有版本，然后使用n命令重新安装新的node版本就行了。


