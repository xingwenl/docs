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