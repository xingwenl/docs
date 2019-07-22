
## node 简单命令

- **npm**

```bash
npm init #会引导你创建一个package.json文件，包括名称、版本、作者这些信息等
npm install moduleNames # 安装Node模块
eg:  npm install express
npm install <name> -g  # 全局安装Node模块
npm install <name> --save # 将信息写入package.json中项目路径中如果有package.json文件
npm view moduleNames # 查看node模块的package.json文件夹
npm list # 查看当前目录下已安装的node包
1.查看所有高级的npm moudles

npm list --depth=0

2.查看所有全局安装的模块

npm list --depth=0 -global
npm update moduleName # 更新node模块

npm uninstall moudleName # 卸载node模块

npm -v # 查看npm安装的版本

3.更新管理
npm install -g npm-check-updates
# 更新node模块
npm-check-updates moudleName -a 
# 更新全部
ncu -a

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