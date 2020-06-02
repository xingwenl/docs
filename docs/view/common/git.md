# git 服务器搭建

## 安装
`yum install -y git`

## 添加git管理账户密码
```bash
# 添加git账户
$ adduser git

# 修改git的密码
$ passwd git
# 然后两次输入git的密码确认后。

# 查看git是否安装成功
$ cd /home && ls -al
# 如果已经有了git，那么表示成，参考如下：
drwxr-xr-x.  5 root root 4096 Apr  4 15:03 .
dr-xr-xr-x. 19 root root 4096 Apr  4 15:05 ..
drwx------  10 git  git  4096 Apr  4 00:26 git

# 默认还给我们分配一个名字叫git的组。
```

## 配置服务端的ssh访问
```bash
# 1.切换到git账号
$ su git
# 2.进入 git账户的主目录
$ cd /home/git

# 3.创建.ssh的配置，如果此文件夹已经存在请忽略此步。
$ mkdir .ssh

# 4. 进入刚创建的.ssh目录并创建authorized_keys文件,此文件存放客户端远程访问的 ssh的公钥。
$ cd /home/git/.ssh
$ touch authorized_keys

# 5. 设置权限，此步骤不能省略，而且权限值也不要改，不然会报错。
$ chmod 700 /home/git/.ssh/
$ chmod 600 /home/git/.ssh/authorized_keys

```

## 创建git仓库
```bash
$ cd /home/git
sudo git init --bare test.git
# 设置文件夹权限和用户
chown -R git test.git #用户
chgrp -R git test.git #用户组
```

### 连接远程仓库
```bash
$ git clone git@47.97.110.41:/home/git/test.git
```

## 禁止客户端shell登录
因为前面我们添加了客户端的ssh的公钥到远程服务器，所以客户端可以直接通过shell远程登录服务器，这不安全，也不是我们想要的。且看下面如何禁用shell登录

```bash

# 给 /home/git 下面创建git-shell-commands目录，并把目录的拥有者设置为git账户。可以直接用git账号登录服务器终端操作。
$ mkdir /home/git/git-shell-commands

#修改/etc/passwd文件
$ vim /etc/passwd

# 可以通过 vim的正则搜索快速定位到这行，  命名模式下  :/git:x

# 找到这句, 注意1000可能是别的数字
git:x:1000:1000::/home/git:/bin/bash

# 改为：
git:x:1000:1000::/home/git:/bin/git-shell

# 最好不要直接改，可以先复制一行，然后注释掉一行，修改一行，保留原始的，这就是经验！！！
# vim快捷键： 命令模式下：yy复制行， p 粘贴  0光标到行首 $到行尾 x删除一个字符  i进入插入模式 
# 修改完后退出保存：  esc进入命令模式， 输入：:wq!   保存退出。
```
## git 常用命令
```bash
# 本地分支与远程origin的分支进行关联处理
git branch --set-upstream-to=origin/master
```
#### 合并 git commit 提交信息
```bash
# 合并最近的 4 次提交纪录
git rebase -i HEAD~4
# 这个时候 自动进入vi模式

pick cacc52da add: 1
pick f072ef48 add: 2
pick 4e84901a add: 3
pick 8f33126c add: 4

# 命令:
# p, pick = 使用提交
# r, reword = 使用提交，但修改提交说明
# e, edit = 使用提交，但停止以便进行提交修补
# s, squash = 使用提交，但和前一个版本融合
# f, fixup = 类似于 "squash"，但丢弃提交说明日志
# x, exec = 使用 shell 运行命令（此行剩余部分）
# d, drop = 删除提交
#

# pick 修改为 s  把 2、3、4 修改到 1 上 ，可重新修改日志
pick f072ef48 add: 1
s 4e84901a add: 2
s 8f33126c add: 3
s 3f33126c add: 4

# wq 保存并推出


s 改成 edit  就是修改提交信息
```


## 常见问题

### .gitignore 失效
```bash
git rm -r --cached .
git add .
git commit -m 'We really don't want Git to track this anymore!'
git rm --cached logs/xx.log
```

### 文件过大 传不上去
提交文件大小的上限设置大点
```bash 
git config --global http.postBuffer 524288000
```

### 删除大文件

> [地址](https://www.jianshu.com/p/fe3023bdc825)

### GIT的HTTP方式免密pull、push
```bash
cd ~
touch .git-credentials
vim .git-credentials
# .git-credentials文件输入下面格式
https://{username}:{password}@github.com
# 终端输入
git config --global credential.helper store
# 打开~/.gitconfig文件，会发现多了一项:
[credential]
helper = store
```

## Github 搭建Github Pages

### 进入设置

![图片1](../../assets/git/1.jpg)

### 设置分支文件

![图片2](../../assets/git/2.jpg)

### 生成地址
[地址](https://xingwenl.github.io/docs/)

