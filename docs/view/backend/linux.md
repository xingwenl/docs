# Linux 常用

```bash
# 映射
ln -s /usr/local/src/nodejs/bin/npm /usr/local/bin/
ln -s /usr/local/src/nodejs/bin/node /usr/local/bin/
```

### 修改环境变量
vi /etc/profile


## 防火墙

防火墙firewall的设置和查看

```bash
systemctl start firewalld.service # 开启防火墙firewall
systemctl stop firewalld.service # 停止防火墙firewall

systemctl disable firewalld.service # 禁止firewall开机启动
systemctl enable firewalld.service # 开机启动firewall

firewall-cmd --permanent --zone=public --add-service=ftp # 防火墙添加放行ftp服务
firewall-cmd --permanent --zone=public --remove-service=ftp # 防火墙删除放行ftp服务
firewall-cmd --reload # 必须reload才能生效

firewall-cmd --query-port=9090/tcp # 查看9090端口的开放情况
firewall-cmd --zone=public --list-ports # 查看所有打开的端口
firewall-cmd --permanent --zone=public --add-port=9090/tcp # 开放9090端口
firewall-cmd --permanent --zone=public --remove-port=80/tcp # 关闭9090端口
```

## SSH

### 修改ssh服务配置文件
```bash
sudo vi /etc/ssh/sshd_config
```
### 文件内部操作
```bash
# 允许root用户远程登录
PermitRootLogin yes
# 允许无密码登录
PermitEmptyPasswords yes
#不允许空密码登录
PermitEmptyPasswords no 
# 设置是否使用口令验证。
PasswordAuthentication yes
# 允许ssh公钥登录
RSAAuthentication yes
PubkeyAuthentication yes

修改/etc/ssh/sshd_config文件，注意下面项目
# 默认显示每日提示（/etc/motd）
PrintMotd yes
# 默认显示上次登录信息
PrintLastLog yes
```

### 重启

```bash
service sshd restart  # 或者
/etc/initd.d/sshd restart

#重启配置
source .bash_profile
```

### 生成ssh

```bash
ssh-keygen -t rsa -C "your_email@example.com"
```

### 扩展：

为了安全起见，FreeBSD默认情况下是不允许root用户进行SSH远程登录的，需要进行以下操作才可以进行Root用户的ssh远程登录。

首先vi编辑/etc/inetd.conf,去掉ssh前的#注释，保存后:wq退出 (开启监听ssh服务)

编辑/etc/rc.conf， 最后加入:sshd_enable=”yes”即可

激活sshd服务：
```bash
/etc/rc.d/sshd start
```
检查服务是否启动，在22端口应该有监听。

```bash
check port number 22
# netstat -an # 或 netstat -tnlp
```

