# webpack

#### 1. 样式消失问题

```
    .test{
        //正常编译
        display: -webkit-box;
        //跳过开头
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        //跳过结束、正常编译
        text-overflow: ellipsis;
        overflow: hidden;
    }
```

## css 相关配置

```js
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  requireModuleExtension: true,
  loaderOptions: {
    less: {
      // 覆盖less变量
      modifyVars: {
        'tabbar-item-font-size': '16px',
        // 使用less文件覆盖
        hack: `true; @import "${resolve('src/theme/vant.less')}";`,
      }
    }
    // sass 的全局变量
    sass: {
      prependData: `@import "./src/theme/gobal.scss";@import "./src/assets/css/theme.scss";`,
    },
    scss: {
      prependData: `@import "./src/theme/gobal.scss";@import "./src/assets/css/theme.scss";`,
    },
  },
}
```

## 代理

```js
module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "https://test.api.com.cn/api",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
```

## 用 Webpack 实现 CDN 的接入

```js
module.exports = {
  output: {
    // 指定存放 JavaScript 文件的 CDN 目录 URL
    publicPath: "//js.cdn.com/id/",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          // 压缩 CSS 代码
          use: ["css-loader?minimize"],
          // 指定存放 CSS 中导入的资源（例如图片）的 CDN 目录 URL
          publicPath: "//img.cdn.com/id/",
        }),
      },
      {
        // 增加对 PNG 文件的支持
        test: /\.png$/,
        // 给输出的 PNG 文件名称加上 Hash 值
        use: ["file-loader?name=[name]_[hash:8].[ext]"],
      },
      // 省略其它 Loader 配置...
    ],
    plugins: [
      // 使用 WebPlugin 自动生成 HTML
      new WebPlugin({
        // HTML 模版文件所在的文件路径
        template: "./template.html",
        // 输出的 HTML 的文件名称
        filename: "index.html",
        // 指定存放 CSS 文件的 CDN 目录 URL
        stylePublicPath: "//css.cdn.com/id/",
      }),
      new ExtractTextPlugin({
        // 给输出的 CSS 文件名称加上 Hash 值
        filename: `[name]_[contenthash:8].css`,
      }),
      // 省略代码压缩插件配置...
    ],
  },
};
```

以上代码中最核心的部分是通过 publicPath 参数设置存放静态资源的 CDN 目录 URL， 为了让不同类型的资源输出到不同的 CDN，需要分别在：

- output.publicPath 中设置 JavaScript 的地址。
- css-loader.publicPath 中设置被 CSS 导入的资源的的地址。
- WebPlugin.stylePublicPath 中设置 CSS 文件的地址。

设置好 publicPath 后，WebPlugin 在生成 HTML 文件和 css-loader 转换 CSS 代码时，会考虑到配置中的 publicPath，用对应的线上地址替换原来的相对地址

### vue.config.js

```js
const assets = {
  css: [],
  js: [
    `https://cdn.jsdelivr.net/npm/vue@2.6.11`, // vue官网 cnd
    `https://cdn.jsdelivr.net/npm/vue-router@3.1.6/dist/vue-router.min.js`,
  ],
};
module.exports = {
  // webpack 配置
  configureWebpack(config) {
    config.externals = {
      vue: "Vue",
      // '@antv/f2': 'F2',
      "vue-router": "VueRouter",
    };
  },
  // 修改 webpack
  chainWebpack() {
    // 给html 插件赋值 在index.html用
    config.plugin("html").tap((args) => {
      args[0].assets = assets;
      // console.log(args);
      return args;
    });
  },
};
```

```html
<!-- index.html -->
<head>
  <% _.forEach(htmlWebpackPlugin.options.assets.js, function(src) { %>
  <script src="<%- src %>"></script>
  <% }); %>
</head>
```

## 插件学习

### [ProgressBarPlugin](https://www.npmjs.com/package/progress-bar-webpack-plugin)

这是一款能为你展示构建进度的 Plugin，它的使用方法和普通 Plugin 一样，也不需要传入什么配置。下图就是你加上它之后，在你的终端面板上的效果，在你的终端底部，将会有一个构建的进度条，可以让你清晰的看见构建的执行进度

```js
// vue.config.js
module.exports = {
  configureWebpack: (config) => {
    config.plugins = [...config.plugins, new ProgressBarPlugin()];
  },
};
```

### 移除 moment 其他语言

```js
// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config
      .plugin("replace")
      .use(require("webpack").ContextReplacementPlugin)
      .tap(() => {
        return [/moment[/\\]locale$/, /zh-cn/];
      });
  },
};
```

### 安装 sass

```
yarn add sass-loader node-sass -D
```
