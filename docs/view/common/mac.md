# Mac 操作

## Homebrew

Mac 神器， 想安装啥 就安装啥， 

### 安装

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### 使用

```bash
brew install node
```

> [官网](https://brew.sh)

## fswatch + rsync

本地同步到服务器的神器

### 安装
```bash
brew install fswatch
```

### 用法
新建 upload.sh ,内容如下， 给权限 `chmod 777 upload.sh`
```bash 
# -e, --rsh=command 指定使用rsh、ssh方式进行数据同步。
# -a, --archive 归档模式，表示以递归方式传输文件，并保持所有文件属性，等于-rlptgoD
# -z, --compress 在传输过程中进行压缩
# -q, --quiet 精简输出模式
# --exclude 指定排除一个不需要传输的文件匹配模式
# --exclude-from 从file 读取排除规则， 和.gitignore里 一样， 
# --delete 删除那些接收端还有 而发送端已经不存在的文件

# 监听 相对于本文件下的dist文件夹里 所有内容，以ssh方式进行上传，上传至服务器端 /home/wwwroot/test  文件夹下， 
SRCPATH=./dist/
fswatch $SRCPATH | while read file
do
rsync -azhq --delete $SRCPATH --exclude '.git' --exclude-from './ignore.txt' -e 'ssh' root@111.11.111.111:/home/wwwroot/test
done
```
> [具体rsync用法](view/common/rsync.md)



## 文件权限

### 更改文件权限
```bash
# chmod 参数 权限 文件

# 例：把驱动目录下所有文件设定到root读写，其他用户只读

chmod -R 755 /Desktop

# 参数R 表示递归，755表示各用户的权限
```

### 更改文件属主
```bash
# chown 参数 用户:组 文件

# 例：把驱动目录下的所有文件属主改成根用户

chown -R root:wheel /System/Library/Extensions
```
-------
## 查看端口

```bash
# Mac下使用lsof（list open files）来查看端口占用情况，lsof 是一个列出当前系统打开文件的工具。
# 使用 lsof 会列举所有占用的端口列表

lsof

# 也可以使用 -i 查看某个端口是否被占用
# 如果端口被占用，则会返回相关信息，如果没被占用，则不返回任何信息

lsof -i:3000

# 杀死进程
kill -9 [pid]
```

## 查看文件大小

```bash
du -shc *
du -sh *
```

## 其他命令行
~/.bashrc是什么

~/.bashrc:该文件包含专用于你的bash shell的bash信息,当登录时以及每次打开新的shell时,该文件被读取.（每个用户都有一个.bashrc文件，在用户目录下）

~/.bash_profile是什么？

~/.bash_profile:每个用户都可使用该文件输入专用于自己使用的shell信息,当用户登录时,该文件仅仅执行一次!默认情况下,他设置一些环境变量,执行用户的.bashrc文件.
```bash
# 设置别名

# 修改文件
vim ~/.bash_profile
# 下方加入 alias ys="yarn start"， 保存
# 使别名命令生效
source ~/.bash_profile
# 命令行输入 ys 就相当于 yarn start
```

## 清理垃圾
/Library/Developer/Xcode
- DerivedData
- Archives


```bash
# /Library/Developer/Xcode
DerivedData
Archives
iOS DeviceSupport
/Devices

# 这四个可以删
```
