# npm 发布包

```
.
├── src  源代码目录
│   └── index.js
├── package.json
└── README.md
```

## 配置babel 
安装
```bash
npm install --save-dev @babel/cli @babel/core @babel/preset-env
```

1. 新建 .babelrc.json 文件
```
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": []
}
```
添加编译命命令，修改 package.json
```json
"scripts": {
  "build:cjs": "babel source --out-dir src"
},
```

2. 配置 webpack
安装webpack相关依赖
```bash
npm install --save-dev webpack webpack-cli babel-loader cross-env
```
新建 webpack.config.js
```js
const path = require('path');
const isMin = !!~process.env.NODE_ENV.indexOf('min');
const type = process.env.NODE_ENV.replace(/:.*/g, '');
const libraryTarget = type === 'iife' ? 'window' : type;
const config = {
  mode: isMin ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: `index.${type}${isMin ? '.min' : ''}.js`,
    library: 'loanCalculateUtils',  // 整个库对外暴露的变量名
    libraryTarget,  // 变量名添加到哪个上 browser
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }
    ]
  },
  plugins: [],
};
module.exports = config;
```
添加运行命令
```json
"scripts": {
  "build:cjs": "babel source --out-dir src",
+ "build:umd": "cross-env NODE_ENV=umd webpack",
+ "build:umd:min": "cross-env NODE_ENV=umd:min webpack",
+ "build:iife": "cross-env NODE_ENV=iife webpack",
+ "build:iife:min": "cross-env NODE_ENV=iife:min webpack",
+ "build": "npm run build:cjs && npm run build:umd && npm run build:umd:min && npm run build:iife && npm run build:iife:min"
},
```

3. 添加忽视文件
.gitignore 打包文件不需要上传GitHub
```bash
node_modules
package-lock.json
```
.npmignore 忽略npm无关文件

新建文件 .npmignore
```
node_modules
package-lock.json
# 源文件目录
src
# 测试文件目录
test
# 忽视文件
.gitignore
.npmignore
# babel配置文件
.babelrc.json
# eslint配置文件
.eslintrc.js
# webpack配置文件
webpack.config.js
```


```bash
# 需要设置回到 npm，发布必须转到 npm
npm config set registry https://registry.npmjs.org/

# 查看用户
npm whoami
# 登录 没有 就去注册
npm login
# 发布
npm publish
```
> https://www.bbsmax.com/A/MyJxyoEA5n/
> https://www.bbsmax.com/A/amd0wjgD5g/