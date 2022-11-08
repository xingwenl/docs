# python 学习

使用机型 macOS High Sierra 版本10.13.6
下载版本 3.8.7

## 安装 
> [官网下载需要的版本](https://www.python.org/downloads/)

安装好配置环境变量
mac 自带python版本需要改下

```bash
# 终端输入
vim ~/.bash_profile
# 修改下
# 安装的python路径
alias python="/Library/Frameworks/Python.framework/Versions/3.8/bin/python3.8"
# 安装的pip路径
alias pip="/Library/Frameworks/Python.framework/Versions/3.8/bin/pip3"
# 保存推出刷新下
source ~/.bash_profile
```

## pip
pip 最常用命令

```bash
# 版本
pip --version
# 升级 pip
pip install -U pip
# 如果这个升级命令出现问题 ，可以使用以下命令：
sudo easy_install --upgrade pip

# 安装
pip install SomePackage              # 最新版本
pip install SomePackage==1.0.4       # 指定版本
pip install 'SomePackage>=1.0.4'     # 最小版本

# 升级包
pip install --upgrade SomePackage

# 卸载包
pip uninstall SomePackage

# 搜索包
pip search SomePackage

# 显示安装包信息
pip show 

# 查看指定包的详细信息
pip show -f SomePackage

# 列出已安装的包
pip list

# 查看可升级的包
pip list -o
```