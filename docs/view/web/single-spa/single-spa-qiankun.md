# single-spa-qiankun
基于single-spa的qiankun 框架

> [项目地址](https://github.com/xingwenl/single-spa-qiankun)
> [demo](http://spa-root.dev.lixw.top/)

## 启动
进入子项目 vue-spa
```bash
cd vue-spa && yarn && yarn dev
```

进入子项目 root
```bash
cd root && yarn && yarn dev
```

## qiankun 框架 实现微前端

> [官方文档](https://qiankun.umijs.org/)

> [源码](https://github.com/umijs/qiankun)

主项目框架任意，子项目框架任意

### 主项目root

- 现在用vue-cli3生成一个全新的vue项目， 路由采用history模式
- 安装`qiankun`: `yarn add qiankun -S`
- 开始修改

创建一个registerApp.js，在main.js引入

```js
import { registerMicroApps, start } from 'qiankun';
import { lifeCycles } from "./appLoading";
registerMicroApps([
  {
    // 子项目的名称
    name: "vue-single-page", 
    // 子项目访问路径
    entry: "http://localhost:9001", 
    // 什么路由下 激活子项目
    activeRule: genActiveRule("/vue-single"),
    //  子项目应该挂到哪个dom下, 请注意 这个dom应该先在主项目写好，不然会找不到dom元素而报错， 这个也可以用下面的render函数来渲染,，
    container: "#vueSingleContainer",
    render(app) {
      console.log(app.loading)
      // app的内容
      console.log(app.appContent)
    }
  }
], {
  // 子项目开始加载
  beforeLoad(app: any) {
    console.log('before load', app)
    return Promise.resolve()
  },
  // 子项目挂载之后
  afterMount(app: any) {
    console.log('afterMount load', app)
    return Promise.resolve()
  },
})
start();

function genActiveRule(routerPrefix: string) {
  return (location: Location) => location.pathname.startsWith(routerPrefix);
}
```
### 子项目 vue-single
不需要引入任何东西，直接在main.js 写以下代码即可
```js
let instance = null;

function render() {
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#vueSpaApp");
}

// 如果这个是 qiankun环境 __POWERED_BY_QIANKUN__ 这个为true， 所以用这个判断是否在qiankun环境下， 如果不是，则可独立渲染
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
// 下面几个钩子函数 bootstrap mount unmount, 必选 ，其他随意
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log("react app bootstraped");
}
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  console.log("[mount] 父传的props", props);
  render();
}
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  instance.$destroy();
  instance = null;
}
/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log("update props", props);
}
```
因为这是基于`single-spa`的， 所以可以在`single-spa`里看到 [其他声明周期的函数](https://single-spa.js.org/docs/building-applications/#registered-application-lifecycle)

#### 路由修改
```js
const router = new VueRouter({
  mode: "history",
  base: window.__POWERED_BY_QIANKUN__ ? "/vue-single" : "/",
  routes
});
```

#### 样式隔离

```bash
# 安装
yarn add postcss-selector-namespace -D
```

在postcss.config.js中加入以下配置，如果没有该js则创建一个
```js
module.exports = {
  plugins: {
    // postcss-selector-namespace: 给所有css添加统一前缀，然后父项目添加命名空间
    'postcss-selector-namespace': {
      namespace(css) {
        // 指定的样式可以不需要添加命名空间 类似于下面
        // if (css.includes('antd.less')) return '';
        return '#vueSpaApp' // 返回要添加的类名
      }
    },
  }
}
```
成功后的样式
```css
#vueSpaApp #nav {
  padding: 30px;
}
```

#### webpack 配置
```js
const { name } = require("./package");
const port = 9001;
module.exports = {
  lintOnSave: false,
  filenameHashing: true,
  devServer: {
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true
    },
    // 开发环境允许跨域
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  configureWebpack: {
    output: {
      library: `${name}-page`, // 输入的对象
      libraryTarget: "umd", // 挂载到属性上
      jsonpFunction: `webpackJsonp_${name}`
    }
  }
};
```
> [webpack 相关说明](https://webpack.js.org/configuration/output/#outputlibrary)

### 注意 
子项目打包后，如果子项目和主项目不是同一个域名，需要配置跨域

nginx
```bash
location / {  
  add_header Access-Control-Allow-Origin *;
  add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
  add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
}

# 如果上面不行， 也可以 直接写在server里
server {
  add_header Access-Control-Allow-Origin *;
  add_header Access-Control-Allow-Methods 'GET,POST';
  add_header Access-Control-Allow-Headers 'Keep-Alive,User-Agent,X-Requsested-WithmIf-Modified-Since,Cache-Control,Content-Type,Authorization';
}
```
> [nginx配置](https://segmentfault.com/a/1190000012550346)