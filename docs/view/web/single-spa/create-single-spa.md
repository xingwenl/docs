# create-single-spa

single-spa cli  自动生成代码

## 全局安装

```bash
npm install --global create-single-spa
# or
yarn global add create-single-spa
```
创建
```bash
create-single-spa

# 三种模式
# single-spa root config
# single-spa application / parcel
# in-browser utility module (styleguide, api cache, etc)
```

## single-spa root config
single-spa 主项目，可以看作父组件

生成简单目录
```bash
...
src
  index.ejs # 相当与index.html
  root-config.ts # 在里可以写配置
...
```
index.ejs 文件里 这个地方是配置需要引入的js
```html
<!-- 可以写成引入的js -->
<!-- <script type="systemjs-importmap" src="/config/importmap.json"></script> -->
<script type="systemjs-importmap">
  {
    "imports": {
      "single-spa": "https://cdnjs.cloudflare.com/ajax/libs/single-spa/4.4.1/system/single-spa.min.js",
      "root-config": "//localhost:9000/root-config.js",
      "single-spa-vue": "//localhost:8080/js/app.js"
    }
  }
</script>
<!-- 需要使用的js -->
<script src="https://cdn.jsdelivr.net/npm/import-map-overrides/dist/import-map-overrides.js"></script>
<script src="https://cdn.jsdelivr.net/npm/systemjs/dist/system.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/systemjs/dist/extras/amd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/systemjs/dist/extras/named-exports.min.js"></script>

<!-- 这个可以自定义， 用于子项目 挂载的节点 -->
<div class="single-spa-vue"></div>
<script>
  // 加载 root-config
  System.import('root-config');
</script>
```
root-config.js
```js
import { registerApplication, start } from "single-spa";
// single-spa-vue 这个是加载子项目， 需要在systemjs-importmap 路径配置好，
registerApplication(
  'single-spa-vue', // 名称，建议和你定义子项目名称一致
  () => {
    return System.import('single-spa-vue') // 引入js
  },
  location => location.pathname.startsWith('/') // /开头的路径 可以加载single-spa-vue
);

start();
```

### registerApplication
#### name
`registerApplication`的第一个参数表示应用名称，`name`必须是string类型
#### Loading Function or Application
`registerApplication`可以是一个Promise类型的 加载函数，也可以是一个已经被解析的应用。
```js
// 第二个参数 
/**
你可以选择将一个已经被解析过的应用作为registerApplication的第二个参数，这个应用其实是一个包含各个生命周期函数的对象。我们既可以从另外一个文件中引入该对象，也可以在single-spa的配置文件中定义这个对象。
*/
const application = {
  bootstrap: () => Promise.resolve(), //bootstrap function
  mount: () => Promise.resolve(), //mount function
  unmount: () => Promise.resolve(), //unmount function
}
registerApplication('applicatonName', application, activityFunction)
```
**加载函数**

registerApplication的第二个参数必须是返回promise的函数(或"async function"方法)。这个函数没有入参，会在应用第一次被下载时调用。返回的Promise resolve之后的结果必须是一个可以被解析的应用。常见的实现方法是使用import加载：() => import('/path/to/application.js')

#### 激活函数
第三个函数就是一个纯函数， 函数返回为真时，则加载该网页

在以下情况下，single-spa将调用每个应用的活动函数：
- hashchange or popstate事件触发时
- pushState or replaceState被调用时
- 在single-spa上手动调用[triggerAppChange] 方法
- checkActivityFunctions方法被调用时

### 使用对象参数时
```js
const config = {
    name: 'myApp',
    app: () => import('src/myApp/main.js'),
    activeWhen: ['/myApp', (location) => location.pathname.startsWith('/app1')],
}
```
### 匹配规则
- [x] '/app1'
  - [x] https://app.com/app1
  - [x] https://app.com/app1/anything/everything
  - [ ] ~~https://app.com/app2~~

## single-spa application / parcel

main.js
```js
const vueOptions = {
  render: h => h(App),
  router, // 需要hitory 模式
  el: ".single-spa-vue" // 挂载到父节点的dom
}

// 如果不是single-spa模式， 这样也可以单独使用
if (!window.singleSpaNavigate) { 
  delete vueOptions.el;
  new Vue(vueOptions).$mount("#app");
}

// 下面是 给single-spa 父节点用的， 
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: vueOptions
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
```
设置公共路径， main.js 引入即可
```js
import { setPublicPath } from "systemjs-webpack-interop";
setPublicPath("single-spa-vue");
```

