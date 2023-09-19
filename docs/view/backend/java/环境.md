# java 环境

## linux安装
## 安装
yum方式下载安装

```bash
# 查找java相关的列表  或者直接搜索yum search jdk
yum -y list java*

# 安装jdk
yum install java-1.8.0-openjdk.x86_64

# 验证
java -version
```

默认路径为 /usr/lib/jvm

## 设置环境变量
将jdk的安装路径加入到JAVA_HOME

```bash
vi /etc/profile
```
在文件最后加入：
```bash
#set java environment
JAVA_HOME=/usr/lib/jvm/jre-1.6.0-openjdk.x86_64
PATH=$PATH:$JAVA_HOME/bin
CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export JAVA_HOME CLASSPATH PATH
```
修改/etc/profile之后让其生效

. /etc/profile （注意 . 之后应有一个空格）

#set java environment
JAVA_HOME=/usr/lib/jvm/jre-1.6.0-openjdk.x86_64
PATH=$PATH:$JAVA_HOME/bin
CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export JAVA_HOME CLASSPATH PATH


## mac安装

安装地址: https://www.java.com/en/download/
