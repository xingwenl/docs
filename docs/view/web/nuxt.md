# Nuxt

## 安装

```bash
# yarn create nuxt-app <项目名>
yarn create nuxt-app nuxt-project

# 启动
yarn run dev
```





## 部署

###  nuxt打包

- 打包 `yarn run build`

- 选择部署的文件 

  - `.nuxt/`
  - `package.json`
  - `nuxt.config.js`

- 用[pm2](/view/backend/pm2)启动 nuxt 

  ```bash
  # 第一次需要安装依赖
  yarn install
  # pm2 启动 --name "nuxt" --  这是设置名称
  pm2 start yarn --name "nuxt" --run start
  ```

  

### [Nginx](/view/backend/nginx) 配置

```bash
# 通过upstream nodejs 可以配置多台nodejs节点，做负载均衡
# keepalive 设置存活时间。如果不设置可能会产生大量的timewait
# proxy_pass 反向代理转发 http://nodenuxt   
# upstream 名称：nodenuxt  -- > proxy_pass 反向代理即是 http://nodenuxt
upstream nodenuxt {
    server 127.0.0.1:3002; #nuxt项目 监听端口
    keepalive 64;
}
server {
    listen 80;
    server_name nuxt.sosout.com;
    location / {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;  
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_cache_bypass $http_upgrade;
        proxy_pass http://nodenuxt; #反向代理
    }
}
```



## 参考文献

>[next.js、nuxt.js等服务端渲染框架构建的项目部署到服务器，并用PM2守护程序](https://segmentfault.com/a/1190000012774650)