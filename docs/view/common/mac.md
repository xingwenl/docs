# Mac 操作记录

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
