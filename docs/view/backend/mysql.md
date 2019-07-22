# mysql配置
## 安装
Linux下使用yum安装MySQL，以及启动、登录和远程访问MySQL数据库

### 安装mysql客户端

`yum install mysql`

### 安装mysql 服务器端

`yum install mysql-server`  
`yum install mysql-devel`

## 配置 utf8

```bash
vim /etc/my.cnf
#mysqld 下加入
default-character-set=utf8
```
```bash
# 启动
service mysqld start 或者
/etc/init.d/mysqld start
或则 mysql.server start

#停止
service mysqld stop

#登录
#创建root管理员
mysqladmin -u root password 123456
#登录
mysql -u root -p123456
mysql> show databases; #查看databases
mysql> use mysql; #进入mysql
#修改密码
# 5.7以前的 
UPDATE user SET Password=PASSWORD('newpassword') where USER='root'; 
# 5.7之后
UPDATE user SET authentication_string=PASSWORD('newpassword') where USER='root';

#账号xingwen
#密码123456
mysql> grant all privileges on *.* to 'xingwen'@'%' identified by '123456' with grant option; #添加用户允许远程连接
mysql> set password for 'root'@'%'=password('123456'); #修改密码为123456
```
## 忘记密码
```bash
# 在/etc/my.conf下面加上  skip-grant-tables ，保存
vim /etc/my.conf

#重启mysqld
service mysqld restart

#登录修改root密码
mysql
mysql> user mysql;
mysql> UPDATE user SET authentication_string=PASSWORD('newpassword') where USER='root';
mysql> flush privileges;
mysql> exit;

#将/etc/my.conf 设置还原
# 重启

```

## 错误解决
```
ERROR 1819 (HY000): Your password does not satisfy the current policy requirements
```
这个是与 `validate_password_policy` 值有关，默认是1
<table style="width: 100%">
	<tr><th>Policy</th><th>Test perofmed</td></tr>
	<tr><td>0 or LOW</td><td>Length</td></tr>
	<tr><td>1 or MEDIUM</td><td>Length; numeric, lowercase/uppercase, and special characters</td></tr>
	<tr><td> 2 or STRONG</td><td>Length; numeric, lowercase/uppercase, and special characters; dictionary file</td></tr>
</table>
设置简单密码 `set global validate_password_policy=0;`


## 默认配置文件路径

- 配置文件： `etc/my.cnf` 
- 日志文件： `/var/log/mysqld.log`
- 服务启动脚本 `/etc/init.d/mysqld`

## Mysql 操作笔记

``` bash
utf8_bin：区分大小写；
utf8_general_cs：大小写敏感；
utf8_general_ci：大小写不敏感。
```

