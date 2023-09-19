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
#密码123456 2021-1228 还可以用
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
mysql> use mysql;
mysql> UPDATE user SET authentication_string=PASSWORD('newpassword') where USER='root';
mysql> flush privileges;
mysql> exit;

# update mysql.user set authentication_string = password ('Password4') where user = 'testuser' and host = '%';
#将/etc/my.conf 设置还原
# 重启

```
### 修改密码 最后一种mysql8有效
```bash
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
```

### 设置远程访问
如果链接不上， 请先远程访问
```sql
--  进入 mysql
use mysql;
update mysql set host = '%' where user = 'root';
```


### 如果想让用户能读取和修改已有表的内容，但又不允许创建新表或删除表，可按如下授权：
```sql
GRANT SELECT,INSERT,DELETE,UPDATE ON samp_db.* TO 'user'@'%' IDENTIFIEDBY "pass"
--  增加一个用户test1密码为abc，让他可以在任何主机上登录，并对所有数据库有查询、插入、修改、删除的权限。
 grant select,insert,update,delete on *.* to test1@"%" Identified by "abc";
--  ON 子句中*.* 说明符的意思是“所有数据库，所有的表”
```
grant select,insert,update,delete on *.* to souke@"%" Identified by "abc";

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

，输入：mysql>use 目标数据库名 
如我输入的命令行:mysql>use blog; 
6，导入文件：mysql>source 导入的文件名; 
如我输入的命令行：mysql>source blog.sql;

```sql
  -- insert 和 select 结合
  insert into biz_teacher 
  (teacher_name, teacher_age, teacher_tellphone, teacher_wechart, teacher_email, teacher_company, 
  teacher_location, teacher_title, teacher_post, teach_style, tecaher_phone, teacher_live_img, 
  self_evaluation, price_up, price_down)
  select
  t.teacher_name, t.teacher_age, t.teacher_tellphone, t.teacher_wechart, t.teacher_email, t.teacher_company, t.teacher_location, t.teacher_title, t.teacher_post, t.teach_style, t.tecaher_phone, t.teacher_live_img, t.self_evaluation, t.price_up, t.price_down
  from biz_course t GROUP BY teacher_name

  -- update 和 select 结合
  update biz_course as c
  inner join(
    select teacher_name, id from biz_teacher
  ) t on c.teacher_name = t.teacher_name 
  set c.teacher_id = t.id
```

