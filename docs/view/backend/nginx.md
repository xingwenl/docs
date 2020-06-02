## 安装  
### gcc安装
安装Nginx依赖gcc环境

`yum install gcc-c++`  

如没有c环境 则先安装c

`yum install gcc`

### PCRE pcre-devel安装

PCRE(Perl Compatible Regular Expressions) 是一个Perl库，包括 perl 兼容的正则表达式库。nginx 的 http 模块使用 pcre 来解析正则表达式，所以需要在 linux 上安装 pcre 库，pcre-devel 是使用 pcre 开发的一个二次开发库。nginx也需要此库。

`yum install -y pcre pcre-devel`

### zlib 安装

zlib 库提供了很多种压缩和解压缩的方式， nginx 使用 zlib 对 http 包的内容进行 gzip ，所以需要在 Centos 上安装 zlib 库

`yum install -y zlib zlib-devel`

### OpenSSL 安装

OpenSSL 是一个强大的安全套接字层密码库，囊括主要的密码算法、常用的密钥和证书封装管理功能及 SSL 协议，并提供丰富的应用程序供测试或其它目的使用。
nginx 不仅支持 http 协议，还支持 https（即在ssl协议上传输http），所以需要在 Centos 安装 OpenSSL 库。

`yum install -y openssl openssl-devel`

### 下载Nginx

[https://nginx.org/en/download.html](URL)

我的下载路径

`cd /usr/local/src`

`wget -c https://nginx.org/download/nginx-1.10.1.tar.gz`

### 解压

`tar -zxvf nginx-1.10.1.tar.gz`

使用默认配置

`./configure`

### 编译安装

`make`

`make install`

### 启动、停止nginx

``` bash
cd /usr/local/nginx/sbin/
./nginx
./nginx -s stop 
./nginx -s quit 
./nginx -s reload

查询nginx进程：
ps aux|grep nginx
```

### 开机自启动

```bash
即在rc.local增加启动代码就可以了。

vi /etc/rc.local
增加一行 /usr/local/nginx/sbin/nginx
设置执行权限：

chmod 755 rc.local
```




## CentOS7+Nginx设置Systemctl restart nginx.service服务

centos 7以上是用Systemd进行系统初始化的，Systemd 是 Linux 系统中最新的初始化系统（init），它主要的设计目标是克服 sysvinit 固有的缺点，提高系统的启动速度。关于Systemd的详情介绍在这里。

Systemd服务文件以.service结尾，比如现在要建立nginx为开机启动，如果用yum install命令安装的，yum命令会自动创建nginx.service文件，直接用命令

### 在系统服务目录里创建nginx.service文件

```bash
vi /lib/systemd/system/nginx.service

# 内容如下
[Unit]
Description=nginx
After=network.target
  
[Service]
Type=forking
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s quit
PrivateTmp=true
  
[Install]
WantedBy=multi-user.target

```

- [Unit]:服务的说明
- Description:描述服务
- After:描述服务类别
- [Service]服务运行参数的设置
- Type=forking是后台运行的形式
- ExecStart为服务的具体运行命令
- ExecReload为重启命令
- ExecStop为停止命令
- PrivateTmp=True表示给服务分配独立的临时空间
- 注意：[Service]的启动、重启、停止命令全部要求使用绝对路径
- [Install]运行级别下服务安装的相关设置，可设置为多用户，即系统运行级别为3
保存退出。

### 命令
``` bash 
# 设置开机启动
systemctl enable nginx.service

# 启动nginx服务
systemctl start nginx.service　

# 停止开机自启动
systemctl disable nginx.service

# 查看服务当前状态	
systemctl status nginx.service

# 重新启动服务
systemctl restart nginx.service

# 查看所有已启动的服务
systemctl list-units --type=service

```

## 动态站点

首先要在域名解析 加上*.dev

```bash
listen 80; # 监听端口
#listen [::]:80;
server_name *.dev.lixw.top ; # 监听所有doc.c-cf.cn结尾的二级域名请求

# 动态的子域名 需要设置访问的子域名变量
if ( $http_host ~* "^(.*?)\.dev\.lixw\.top" ) {
   set $domain $1;
}

index index.html index.php; # 默认访问文件
root /home/wwwroot/doc/$domain/;  # 接收到域名转发至相匹配目录
```
## ssl

### 从 Let’s Encrypt 获得网站域名的免费的证书


> 域名先配置好 ssl.lixw.top

```bash
# 下载+安装 acme.sh 只需要在你的根目录执行
cd ~
curl https://get.acme.sh | sh

# 创建别名
cd ~/.acme.sh/
alias acme.sh=~/.acme.sh/acme.sh

# 生成证书
# -d 后面的参数是你要生成证书的域名 --webroot 后面是你网站根目录
# 命令加上 –debug 能显示安装详情
acme.sh  --issue  -d ssl.lixw.top  --webroot  /home/wwwroot/ssl/

# 安装证书
# systemctl restart nginx.service 看你如何启动nginx 
# 证书导入到 /usr/local/nginx/conf/ssl/ 文件夹内，ssl/自己创建的
acme.sh --installcert -d ssl.lixw.top \
		--key-file /usr/local/nginx/conf/ssl/ssl.lixw.top.key \
		--fullchain-file /usr/local/nginx/conf/ssl/fullchain.cer \
		--reloadcmd "systemctl restart nginx.service"
```

### nginx配置

``` bash 
# 打开nginx配置   可以新建nginx配置文件，然后引入
# vim /usr/local/nginx/conf/nginx.conf

server {
	 # https 一般为443的端口， http2模块
    listen 443 ssl http2;
    server_name ssl.lixw.top;
    index index.html;
    root /home/wwwroot/ssl; # 确保网站根目录正确且存在

    ssl on;
    ssl_certificate /usr/local/nginx/conf/ssl/fullchain.cer; # 需要替换成你生成的路径
    ssl_certificate_key /usr/local/nginx/conf/ssl/ssl.lixw.top.key; # 需要替换成你生成的路径
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    ssl_ciphers "EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5";
    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
    {
        expires      30d;
    }
    location ~ .*\.(js|css)?$
    {
        expires      12h;
    }
    location ~ /.well-known {
        allow all;
    }
    location ~ /\.
    {
        deny all;
    }
    access_log off;
}
# 监听80端口，转到https
server {
    listen       80;
    server_name  ssl.lixw.top;

    return 301 https://$host$request_uri;
}

```

## vue-react history模式

```bash
location / {
   try_files $uri /index.html;
}
```


### nginx 错误提示

- `nginx: [emerg] the "ssl" parameter requires ngx_http_ssl_module` 表示未安装ssl

```bash
# 切换到源码包
cd /usr/local/src/nginx-1.11.3

# 查看nginx原有的模块
/usr/local/nginx/sbin/nginx -V

# 在configure arguments:后面显示的原有的configure参数如下：
# --prefix=/usr/local/nginx --with-http_stub_status_module
# 新配置信息就应该这样写
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --with-http_v2_module

# 上面的命令即可，等配置完
# 配置完成后，运行命令
make

# 备份原有已安装好的nginx
cp /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx.bak

# 刚刚编译好的nginx覆盖掉原有的nginx（这个时候nginx要停止状态）
cp ./objs/nginx /usr/local/nginx/sbin/

# 启动nginx，仍可以通过命令查看是否已经加入成功

/usr/local/nginx/sbin/nginx -V　
```

- `nginx: [error] open() "/usr/local/nginx/logs/nginx.pid" failed`

```bash
使用nginx -c的参数指定nginx.conf文件的位置 
/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
```

### 参考文档
> [https://www.jianshu.com/p/717f2b88d057](URL)
> [http://www.linuxidc.com/Linux/2016-09/134907.htm](URL)

