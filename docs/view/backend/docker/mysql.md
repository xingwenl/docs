```
# mysql 运行
docker run -itd --name mysql3307 -p 3307:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
```
```yml
version: "3.8"
services:
  mysql:
    image: mysql:8.0
    restart: always
    # 容器名称
    container_name: mysql8
    # 映射路径
    volumes:
      - $PWD/my.cnf:/etc/mysql/my.cnf
      - $PWD/data:/var/lib/mysql
    # 修改加密规则为“mysql_native_password”
    command:
      --default-authentication-plugin=mysql_native_password
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_general_ci
      #--explicit_defaults_for_timestamp=true
      #--lower_case_table_names=1
    ports:
      - 3306:3306
    networks:
      - mysql
    environment:
      # - "MYSQL_ROOT_PASSWORD=yunmo123456"
      MYSQL_ROOT_PASSWORD: yunmo123456
      MYSQL_USER: yunmo
      MYSQL_PASSWORD: yunmo123456
# 放在mysql网路下面
networks:
  mysql:
    driver: bridge
    name: mysql
```

```my.cnf
Last login: Mon Dec  6 22:16:29 on ttys003
^[[A%                                                                                                                                                                               ➜  ~ ssh root@106.14.147.123
Last failed login: Mon Dec  6 22:18:53 CST 2021 from 47.106.250.53 on ssh:notty
There was 1 failed login attempt since the last successful login.
Last login: Mon Dec  6 22:16:34 2021 from 101.80.168.250

Welcome to Alibaba Cloud Elastic Compute Service !

[root@iZuf6ih9c6b9vb784956ndZ ~]# cat /docker/mysql/my.cnf
# Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; version 2 of the License.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301 USA

#
# The MySQL  Server configuration file.
#
# For explanations see
# http://dev.mysql.com/doc/mysql/en/server-system-variables.html

[mysqld]
pid-file        = /var/run/mysqld/mysqld.pid
socket          = /var/run/mysqld/mysqld.sock
datadir         = /var/lib/mysql
secure-file-priv= NULL
bind-address    = 0.0.0.0

# Custom config should go here
!includedir /etc/mysql/conf.d/
```

```bash
# 进入mysql
docker exec -it mysql8 bash

# 进入sql命令，更改密码
mysql
```