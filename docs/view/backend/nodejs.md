# [nodeJS](http://nodejs.cn/api/)


##### [putty远程连接服务器](https://help.aliyun.com/document_detail/59083.html?spm=5176.10173289.107.1.73ee2e77Rk5hDi#windows);


##### [express脚手架](http://www.expressjs.com.cn/starter/generator.html);

```
    express --view=pug appname //初始化

    DEBUG=appname:* npm start //本地运行

```

##### [pm2](http://pm2.keymetrics.io/);

```
    pm2 start npm -- start  //开启进程守护（express脚手架可用）
    pm2 start id/name
    pm2 stop id/name //结束进程
    pm2 delete id/name //删除进程

    //process.json配置
```

# 搭建基础node项目

```bash
mkdir node-ts

# 初始化
npm init
# 添加库
pnpm add typescript
pnpm add @types/node -D

# 用于检测文件的变化
pnpm add -g nodemon

# 将ts代码在内存中完成编译，同时完成运行, 这个库提供了一个命令ts-node编译某个ts文件并执行。
# 当然这个库不会去读取tsc的配置文件。所以需要自己写编译文件的路径。
pnpm add -D ts-node
```

`.package.json`
```json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon --watch src -e ts --exec ts-node src/index.ts",
    "build": "tsc",
    "tsc": "tsc --init"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "typescript": "^4.9.5"
  },
  "devDependencies": {
    "@types/node": "^18.13.0",
    "ts-node": "^10.9.1"
  }
}
```
`"dev": "nodemon --watch src -e ts --exec ts-node src/index.ts"`

- `--watch src` : 监听src目录
- `-e ts`：监听后缀名为ts的文件
- `--exec ts-node src/index.ts`: 监听的文件发生变化后执行命令 `ts-node src/index.ts`


`tsc` 命令用于打包文件
如果一个目录下存在一个tsconfig.json文件，那么它意味着这个目录是TypeScript项目的根目录。 tsconfig.json文件中指定了用来编译这个项目的根文件和编译选项。 一个项目可以通过以下方式之一来编译：

使用tsconfig.json不带任何输入文件的情况下调用tsc，编译器会从当前目录开始去查找tsconfig.json文件，逐级向上搜索父目录。

`pnpm tsc` 会生成tsconfig.json 文件
