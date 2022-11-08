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

进入文件夹
`cd nginx-1.10.1`

使用默认配置
`./configure`

### 编译安装

`make`

`make install`

### 设置全局环境变量

```bash
vi /etc/profile
# 设置nginx全局环境变量
PATH=$PATH:/usr/local/nginx/sbin
export PATH

# 让配置文件重新生效一下即可
source /etc/profile
```

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

    # ssl on; nginx1.8 后 不需要了 
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
## 正向代理
一句话解释正向代理，正向代理的对象是客户端，服务器端看不到真正的客户端。

```bash
resolver 8.8.8.8 # 谷歌的域名解析地址
server { 
    location / {
        # 当客户端请求我的时候，我会把请求转发给它
        # $http_host 要访问的主机名 $request_uri 请求路径
        proxy_pass http://$http_host$request_uri; 
    }
}
```
## 反向代理
一句话解释反向代理，反向代理的对象是服务端，客户端看不到真正的服务端。

## 跨域
跨域是前端工程师都会面临的场景，跨域的解决方案有很多。不过要知道在生产中，要么使用 CORS 、要么使用 Nginx 反向代理来解决跨域。在 Nginx 的配置文件中进行如下配置即可：

```bash
server {
    listen 80
    server_name www.lixw.top; # 用户访问www.lixw.top, 反向代理到 http://baidu.com
    localtion / {
        proxy_pass http://baidu.com
    }
}
```

## gzip
Gzip 是互联网上非常普遍的一种数据压缩格式，对于纯文本来说可以压缩到原大小的 40%，可以节省大量的带宽。不过需要注意的是，启用 Gzip 所需的 HTTP 最低版本是 1.1。


```bash
# http全局
http {
  gzip on; # 启用压缩
  gzip_min_length 1k; # 超过1K的文件才压缩
  gzip_http_version 1.1; # 启用gzip压缩所需的HTTP最低版本
  gzip_comp_level 9; # 压缩级别，压缩比率越高，文件被压缩的体积越小
  gzip_types text/css application/javascript; # 进行压缩的文件类型 # text/plain application/x-javascript text/css application/xml;
  gzip_disable "MSIE [1-6]\.";       #配置禁用gzip条件，支持正则。此处表示ie6及以下不启用gzip（因为ie低版本不支持）
  gzip vary on;    #选择支持vary header；改选项可以让前端的缓存服务器缓存经过gzip压缩的页面; 这个可以不写，表示在传送数据时，给客户端说明我使用了gzip压缩
}
# 单个servers
location ~ .*\.(jpg|png|gif)$ {
    gzip off;
    root /home/www/images;
}
location ~ .*\.(html|js|css)$ {
    gzip on; # 启用压缩
    gzip_min_length 1k; # 超过1K的文件才压缩
    gzip_http_version 1.1; # 启用gzip压缩所需的HTTP最低版本
    gzip_comp_level 9; # 压缩级别，压缩比率越高，文件被压缩的体积越小
    gzip_types text/css application/javascript; # 进行压缩的文件类型
    root /home/www/html; 
}

```
## 请求限制

对于大流量恶意的访问，会造成带宽的浪费，给服务器增加压力。往往对于同一 IP 的连接数以及并发数进行限制。

关于请求限制主要有两种类型：
- limit_conn_module 连接频率限制
- limit_req_module 请求频率限制

```bash
# $binary_remote_addr 远程IP地址 zone 区域名称 10m内存区域大小
limit_conn_zone $binary_remote_addr zone=coon_zone:10m;
server {
    # conn_zone 设置对应的共享内存区域 1是限制的数量
 limit_conn conn_zone 1;
}
```
```bash
# $binary_remote_addr 远程IP地址 zone 区域名称 10m内存区域大小 rate 为请求频率 1s 一次
limit_req_zone $binary_remote_addr zone=req_zone:10m rate=1r/s;
server {
    location / {
        # 设置对应的共享内存区域 burst最大请求数阈值 nodelay不希望超过的请求被延迟
        limit_req zone=req_zone burst=5 nodelay;

        client_max_body_size 800M; // #缓冲区代理缓冲用户端请求的最大字节数
    }
}
```
## 访问控制

关于访问控制主要有两种类型：
- -http_access_module 基于 IP 的访问控制
- -http_auth_basic_module 基于用户的信任登陆
(基于用户的信任登陆不是很安全，本文不做配置介绍)

以下是基于 IP 的访问控制
```bash
server {
    location ~ ^/index.html {
        # 匹配 index.html 页面 除了 127.0.0.1 以外都可以访问
        deny 127.0.0.1;
        allow all;
    }
}
```

## 防盗链
防盗链的原理就是根据请求头中 referer 得到网页来源，从而实现访问控制。这样可以防止网站资源被非法盗用，从而保证信息安全，减少带宽损耗，减轻服务器压力。

```bash
location ~ .*\.(jpg|png|gif)$ { # 匹配防盗链资源的文件类型
    # 通过 valid_referers 定义合法的地址白名单 $invalid_referer 不合法的返回403
    valid_referers none blocked 127.0.0.1;
    if ($invalid_referer) {
        return 403;
    }
}
```

## 负载均衡 Load Balance
当我们的网站需要解决高并发、海量数据问题时，就需要使用负载均衡来调度服务器。将请求合理的分发到应用服务器集群中的一台台服务器上。

Nginx 可以为我们提供负载均衡的能力，具体配置如下：

```bash
# upstream 指定后端服务器地址
# weight 设置权重
# server 中会将 http://nodetest 的请求转发到 upstream 池中
upstream nodetest {
    server 127.0.0.1:66 weight=10;
    server 127.0.0.1:77 weight=1;
    server 127.0.0.1:88 weight=1;
}

server {
    location / {
        # 利用反向代理请求 upstream中的server
        proxy_pass http://nodetest
    }
}
```
### 后端服务器状态

后端服务器支持以下的状态配置：

- down：当前服务器不参与负载均衡
- backup：当其他节点都无法使用时的备用服务器
- max_fails：允许请求失败的次数，若到达就会休眠
- fail_timeout：经过max_fails次失败后，服务器的暂停时间，默认为10s
- max_conns：限制每个服务器的最大接收连接数

```bash
upstream nodetest {
    server 127.0.0.1:66 down;
    server 127.0.0.1:77 backup;
    server 127.0.0.1:88  max_fails=3 fail_timeout=10s;
    server 127.0.0.1:99 max_conns=1000;
}
```
### 分配方式
- 轮询(默认），每个请求按照时间顺序轮流分配到不同的后端服务器，如果某台后端服务器宕机，Nginx 轮询列表会自动将它去除掉。
- weight(加权轮询)，轮询的加强版，weight 和访问几率成正比，主要用于后端服务器性能不均的场景。
- ip_hash，每个请求按照访问 IP 的 hash 结果分配，这样每个访问可以固定访问一个后端服务器。
- url_hash，按照访问 URL 的 hash 结果来分配请求，使得每个URL定向到同一个后端服务器上，主要应用于后端服务器为缓存时的场景。
- 自定义hash，基于任意关键字作为 hash key 实现 hash 算法的负载均衡
- fair，按照后端服务器的响应时间来分配请求，响应时间短则优先分配。

## 设置缓存

```bash
server {

    # 设置html php 结尾的不使用缓存
    location ~ .*\.(css|js|swf|php|htm|html )$ {
        add_header Cache-Control no-store;
        add_header Pragma no-cache;
    }
    # 设置 js css 结尾的 有效期为12小时
    localtion ~ .*\.(js|css)?$
    {
        # 相当于 add_header Cache-Control max-age=43200;  ==12*60*60
        expires 12h;
    }
}
```

## 上传最大文件限制 

```
server {
    listen 80;
    server_name yueyou.api.l-xw.cn;
    location / {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_cache_bypass $http_upgrade;
        proxy_pass http://yueyou; #反向代理
        client_max_body_size 800M; // #缓冲区代理缓冲用户端请求的最大字节数
    }
}
```
### 相关资料
1. Cache-control策略

    Cache-Control与Expires的作用一致，都是指明当前资源的有效期，控制浏览器是否直接从浏览器缓存取数据还是重新发请求到服务器取数据。只不过Cache-Control的选择更多，设置更细致，如果同时设置的话，其优先级高于Expires。
    **http协议头Cache-Control ：**
    值可以是public、private、no-cache、no- store、no-transform、must-revalidate、proxy-revalidate、max-age

各个消息中的指令含义如下：

- Public指示响应可被任何缓存区缓存。
- Private指示对于单个用户的整个或部分响应消息，不能被共享缓存处理。这允许服务器仅仅描述当用户的部分响应消息，此响应消息对于其他用户的请求无效。
- no-cache指示请求或响应消息不能缓存
- no-store用于防止重要的信息被无意的发布。在请求消息中发送将使得请求和响应消息都不使用缓存。
- max-age指示客户机可以接收生存期不大于指定时间（以秒为单位）的响应。
- min-fresh指示客户机可以接收响应时间小于当前时间加上指定时间的响应。
- max-stale指示客户机可以接收超出超时期间的响应消息。如果指定max-stale消息的值，那么客户机可以接收超出超时期指定值之内的响应消息。

2. Last-Modified/If-Modified-Since

- Last-Modified/If-Modified-Since要配合Cache-Control使用。
- Last-Modified：标示这个响应资源的最后修改时间。web服务器在响应请求时，告诉浏览器资源的最后修改时间。
- If-Modified-Since：当资源过期时（使用Cache-Control标识的max-age），发现资源具有Last-Modified声明，则再次向web服务器请求时带上头 If-Modified-Since，表示请求时间。web服务器收到请求后发现有头If-Modified-Since 则与被请求资源的最后修改时间进行比对。若最后修改时间较新，说明资源又被改动过，则响应整片资源内容（写在响应消息包体内），HTTP 200；若最后修改时间较旧，说明资源无新修改，则响应HTTP 304 (无需包体，节省浏览)，告知浏览器继续使用所保存的cache。

## location

- `=` 表示精确匹配。只有请求的 url 路径与后面的字符串完全相等时，才会命中。
- `~` 表示该规则是使用正则定义的，区分大小写。
- `~*` 表示该规则是使用正则定义的，不区分大小写。
- `^~` 表示如果该符号后面的字符是最佳匹配，采用该规则，不再进行后续的查找。

## nginx 错误提示

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

- 启动Nginx时候报错：nginx: [error] open() “/usr/local/nginx/logs/nginx.pid” failed (2: No such file or directory)
情况一：nginx.conf的nginx.pid被注释了

进入nginx.conf目录编辑

`sudo vi /usr/local/nginx/conf/nginx.conf`

重新启动

`nginx -s reload `

情况二：没有指定配置目录

输入来使用指定nginx.conf文件的方式重启nginx（首先保证上面第一种情况的pid没有被注释，否则可能前两次能打开，但是以后还是会报错的）

`sudo /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf`