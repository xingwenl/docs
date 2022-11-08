# CocoaPods 

## CocoaPods 镜像

旧版的 CocoaPods 可以使用如下方法使用 tuna 的镜像

```bash
$ pod repo remove master
$ pod repo add master https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git
$ pod repo update
```

新版的 CocoaPods 不允许用pod repo add直接添加master库了，但是依然可以：

```bash
$ cd ~/.cocoapods/repos 
$ pod repo remove master
$ git clone https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git master
```

最后进入自己的工程，在自己工程的podFile第一行加上：

```
source 'https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git'
```

> 参考 [CocoaPods 镜像使用帮助](https://mirror.tuna.tsinghua.edu.cn/help/CocoaPods/)



> source 'https://gitee.com/mirrors/CocoaPods-Specs.git'

## 安装:

####1、升级Ruby环境

```
终端输入：$ sudo gem update ==system
```

### 2、更换Ruby镜像

```
# 移除现有Ruby镜像
终端输入：$ gem sources --remove https://rubygems.org/

# 然后添加国内最新镜像源（淘宝的Ruby镜像已经不更新了）
# https://gems.ruby-china.org/ 这个不能用了
终端输入：$ gem sources -a https://gems.ruby-china.com/

# 执行完毕之后输入gem sources -l来查看当前镜像
终端输入：$ gem sources -l

# 如果结果是这个 则成功
*** CURRENT SOURCES ***
https://gems.ruby-china.org/
```

### 3、安装CocoaPods

```
终端输入：$ sudo gem install cocoapods

# 若没有权限则输入
终端输入：$ sudo gem install -n /usr/local/bin cocoapods

# 出现gems installed 安装成功
终端输入：$ pod setup

# 出现Setup completed的时候说明已经完成了
```

## 4、CocoaPods的使用

```
# cd到工程目录
终端输入：$ pod init
此时会创建一个Podfile 文件

# 搜索
终端输入：$ pod search AFNetworking

# vim Podfile 
# 按 i 输入
# pod 'AFNetworking', '~>3.0'

# 下载指定版本
终端输入：$ pod install

# 更新最新版本
终端输入：$ pod update 
```



> [https://www.jianshu.com/p/9e4e36ba8574](URL)
