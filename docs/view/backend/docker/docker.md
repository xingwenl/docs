# Docker

## Docker 安装
- Mac 下载：

  `brew install --cask --appdir=/Applications docker`
- Linux 下载

  安装命令: `curl -fsSL https://get.docker.com | bash -s docker --mirror aliyun`

  国内 daocloud 一键安装命令: `curl -sSL https://get.daocloud.io/docker | sh`

## Docker 使用

### 搭建简单nginx服务器
#### 先把基础创建好
```bash
# 创建项目目录
mkdir docker1
# 创建index.html
cd docker1
echo "<h1>你好 docker</h1>" >> index.html


# 创建Dockerfile
vim Dockerfile

# dockerfile
FROM nginx
COPY ./index.html /usr/share/nginx/html/index.html
EXPOSE 80
```
### 打包镜像
```bash
# 进入刚刚创建的文件夹里
cd docker1/
# 基于路径 ./ (当前路径） 打包一个镜像，镜像的名字是docker，版本号是1.0.0。该命令会自动寻找Dockerfile来打包出一个镜像
docker image build ./ -t nodetest:1.0.0 # 打包镜像
```
> Tips: 你可以使用 `docker images` 来查看本机已有的镜像

```bash
Sending build context to Docker daemon  3.072kB
Step 1/3 : FROM nginx
 ---> cde2312e3r434r
Step 2/3 : COPY ./index.html /usr/share/nginx/html/index.html
 ---> 1c433edd5891
Step 3/3 : EXPOSE 80
 ---> Running in cde2312e3r434r
Removing intermediate container cde2312e3r434r
 ---> cde2312e3r434r
Successfully built cde2312e3r434r
Successfully tagged docker1:1.0.0
```


### 执行docker
```bash
# nodetest:1.0.0 镜像名字加tag 如果没有tag可不加
docker run \
-p 2333:8080 \ # 本机2333端口 监听 docker 8080 端口
-d --name nodetest \  # -d 后台运行
nodetest:1.0.0
```

### 基本操作
```bash
# 拉取
docker pull mysql:latest

# 查看所有容器
docker ps -a
# 停止docker
docker pause nodetest
# 恢复docker
docker unpause nodetest
# 终止docker
docker stop nodetest
# 启动docker
docker start nodetest
# 重启docker
docker restart nodetest
# 删除已经停止的docker
docker rm nodetest
# 查看日志
docker logs nodetest

# 查看网络信息
docker network

# 查看详细网络信息
docker network inspect ..id

```

### 进入docker
```bash
# d461595fbf3b 容器id
sudo docker exec -it d461595fbf3b  /bin/bash
```

## 卸载
```bash
sudo yum remove docker \
                docker-client \
                docker-client-latest \
                docker-common \
                docker-latest \
                docker-latest-logrotate \
                docker-logrotate \
                docker-engine
```

## docker-compose 

### 下载
```bash
# 这个是官方地址，可能比较慢，推荐使用下面的国内镜像地址
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 国内镜像地址
curl -L https://get.daocloud.io/docker/compose/releases/download/1.29.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose

# 下载完之后可以看下 /usr/local/bin 这个目录有没有 docker-compose 这个文件
```

### 授权
```bash
# 给docker compose 目录授权
sudo chmod +x /usr/local/bin/docker-compose

# 查看一下version，显示有版本号那就说明安装成功了
docker-compose version
```


## 错误

Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?

```bash
# 查看信息
docker version
# 出现Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
# 启动看看
systemctl start docker

# 如果不行 
cd /etc/docker
# 编辑daemon.json文件：
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
# 重启
systemctl restart docker
```