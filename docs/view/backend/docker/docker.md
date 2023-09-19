# Docker

## Docker 安装
- Mac 下载：

  `brew install --cask --appdir=/Applications docker`
- Linux 下载

  安装命令: `curl -fsSL https://get.docker.com | bash -s docker --mirror aliyun`

  国内 daocloud 一键安装命令: `curl -sSL https://get.daocloud.io/docker | sh`
  ```bash
  # 卸载
  sudo apt-get remove docker docker-engine docker.io containerd runc
  # 安装
  curl -fsSL https://get.docker.com -o get-docker.sh
  # 启动
  sudo sh get-docker.sh
  ```

  ```bash
   # 在终端中运行以下命令来检查Docker守护程序的状态
    sudo systemctl status docker
   # 如果Docker守护程序没有运行，您可以启动它：
   sudo systemctl start docker
   # 使用以下命令检查您的用户是否属于docker组：
    groups your_username
   # 如果您的用户不在docker组中，可以将其添加到docker组中：
   sudo usermod -aG docker your_username
    # 检查/var/run/docker.sock的权限：
    ls -l /var/run/docker.sock
    # 确保该文件的权限允许您的用户或docker组访问它。通常，它的权限应该是srw-rw----，所有者是root，组是docker。如果权限不正确，您可以使用以下命令更改它
    sudo chmod 666 /var/run/docker.sock
    # 重新启动Docker守护程序：
    sudo systemctl restart docker
    # 检查其他问题
    sudo journalctl -u docker
  ```

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

### 使用
```bash
# 启动
docker-compose up -d

-d	# 在后台运行服务容器
–no-color	# 不使用颜色来区分不同的服务的控制输出
–no-deps	# 不启动服务所链接的容器
–force-recreate	# 强制重新创建容器，不能与 –no-recreate 同时使用
–no-recreate # 如果容器已经存在，则不重新创建，不能与 –force-recreate 同时使用
–no-build	# 不自动构建缺失的服务镜像
–build	# 在启动容器前构建服务镜像
–abort-on-container-exit	# 停止所有容器，如果任何一个容器被停止，不能与-d同时使用
-t，-–timeout  # int	停止容器时候的超时（默认为 10 秒）
–remove-orphans	# 删除服务中没有在 compose 文件中定义的容器
-f # 指定使用的 Compose 模板文件，默认为 docker-compose.yml，可以多次指定

docker-compose start
docker-compose stop
docker-compose logs

docker-compose version

# 移除 --rmi all
docker-compose down

# 重新打包
docker-compose build

# 查看容器状态
docker-compose ps

# 删除所有（停止状态的）服务容器
docker-compose rm

# 在指定服务上执行一个命令。
docker-compose run
# 暂停运行中的服务容器
docker-compose pause
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