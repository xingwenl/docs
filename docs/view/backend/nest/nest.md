# Nest

## 介绍
Nest 是一个用于构建高效，可扩展的 Node.js 服务器端应用程序的框架。它使用渐进式 JavaScript，内置并完全支持 TypeScript（但仍然允许开发人员使用纯 JavaScript 编写代码）并结合了 OOP（面向对象编程），FP（函数式编程）和 FRP（函数式响应编程）的元素。

在底层，Nest使用强大的 HTTP Server 框架，如 Express（默认）和 Fastify。Nest 在这些框架之上提供了一定程度的抽象，同时也将其 API 直接暴露给开发人员。这样可以轻松使用每个平台的无数第三方模块。 

## 安装

<!-- tabs:start -->
### ** cli 安装 **
```bash
$ npm i -g @nestjs/cli
$ nest new project-name
```

### ** git 安装 **
```bash
$ git clone https://github.com/nestjs/typescript-starter.git project
$ cd project
$ npm install
$ npm run start
```

### ** 手动创建 **
您还可以通过使用 npm（或 yarn ）安装核心和支持文件，从头开始手动创建新项目。当然，在这种情况下，您将自己负责创建项目样板文件。
```bash
$ npm i --save @nestjs/core @nestjs/common rxjs reflect-metadata
```

<!-- tabs:end -->

