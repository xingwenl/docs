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

> [具体 rsync 用法](view/common/rsync.md)

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

---

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

~/.bashrc 是什么

~/.bashrc:该文件包含专用于你的 bash shell 的 bash 信息,当登录时以及每次打开新的 shell 时,该文件被读取.（每个用户都有一个.bashrc 文件，在用户目录下）

~/.bash_profile 是什么？

~/.bash_profile:每个用户都可使用该文件输入专用于自己使用的 shell 信息,当用户登录时,该文件仅仅执行一次!默认情况下,他设置一些环境变量,执行用户的.bashrc 文件.

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

## 硬盘问题

在卸载外接移动硬盘时，没有在访达里点击「推出」，而是直接拔掉了，结果在下一次再使用移动硬盘的时候，发现无法读取

打开终端

```bash
diskutil list
```

输出

```
/dev/disk0 (internal, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        *121.3 GB   disk0
   1:                        EFI EFI                     209.7 MB   disk0s1
   2:                 Apple_APFS Container disk1         121.1 GB   disk0s2

/dev/disk1 (synthesized):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      APFS Container Scheme -                      +121.1 GB   disk1
                                 Physical Store disk0s2
   1:                APFS Volume Macintosh HD            107.5 GB   disk1s1
   2:                APFS Volume Preboot                 22.6 MB    disk1s2
   3:                APFS Volume Recovery                519.0 MB   disk1s3
   4:                APFS Volume VM                      3.2 GB     disk1s4

/dev/disk2 (external, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        *1.0 TB     disk2
   1:                        EFI EFI                     209.7 MB   disk2s1
   2:                  Apple_HFS My Passport             499.9 GB   disk2s2
   3:       Microsoft Basic Data sex                     499.8 GB   disk2s3
```

/dev/disk2 是我的移动硬盘
disk2s2 是时间备份分盘， disk2s3 就是未识别的硬盘，磁盘工具也无法装载

```bash
# 装载 disk2s3
sudo diskutil mount /dev/disk2s3
# 显示超时
Volume on disk2s3 timed out waiting to mount
# 次错误可能
#  输入 ps aux | grep fsck
# 然后杀掉所有fsck的进程 sudo pkill -f fsck

# 再试一次
sudo diskutil mount /dev/disk2s3
# 成功
Volume sex on /dev/disk2s3 mounted
```

> [参考](https://www.liuandy.cn/informal_essay/2018/03/21/2333.html#.YFRDTpMzZMI) > [disutil 介绍](https://www.jianshu.com/p/6a1f365617ad)

## "" 已损坏,无法打开， 您应该将它移到废纸篓的解决办法

打开 “访达”(Finder)进入 “应用程序” 目录，找到该软件图标，将图标拖到刚才的终端窗口里面，会得到如下组合：sudo xattr -r -d com.apple.quarantine /Applications/Navicat\ Premium.app，回到终端窗口按回车，输入系统密码回车即可。

```bash
sudo xattr -r -d com.apple.quarantine /Applications/Navicat\ Premium.app
```

