# Vue3.x 项目工程环境

## 架构搭建
请确保你的电脑上成功安装 Node.js，本项目使用 Vite 构建工具，需要 Node.js 版本 >= 12.0.0。

查看 Node.js 版本：

```bash
node -v

# 使用 nvm 安装最新稳定版 Node.js
nvm install stable
```

### 使用 Vite 快速初始化项目雏形

```bash
# npm 
npm init @vitejs/app

# yarn
yarn create @vitejs/app
```

本项目选的是 `vue-ts`

### 修改Vite 配置文件
.vite.config.ts
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },
  base: './', // 设置打包路径
  server: {
    port: 4000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true // 允许跨域

    // 设置代理，根据我们项目实际情况配置
    // proxy: {
    //   '/api': {
    //     target: 'http://xxx.xxx.xxx.xxx:8000',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace('/api/', '/')
    //   }
    // }
  }
})
```

## 使用tsx
```bash
# 装vite 插件
yarn add @vitejs/plugin-vue-jsx -D

# 装babel 插件
yarn add @vue/babel-plugin-jsx -D
```
```js
// vite.config.js 文件添加
import vueJsx from '@vitejs/plugin-vue-jsx';
export default defineConfig({
  plugins: [vue(), vueJsx({ /* options */ })],
})
```

.babelrc
```json
{
  "plugins": ["@vue/babel-plugin-jsx"]
}
```
tsconfig.json
```json
{
  "compilerOptions": {
    "jsx": "preserve"
  }
}
```
> [plugin-vue-jsx](https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx)
> [jsx-next](https://github.com/vuejs/jsx-next)

## 代码规范
EditorConfig + Prettier + ESLint 组合来实现代码规范化。

### 集成 EditorConfig 配置
> 官网：[editorconfig.org](editorconfig.org)

在项目根目录下增加 .editorconfig 文件：
```bash
# Editor configuration, see http://editorconfig.org

# 表示是最顶层的 EditorConfig 配置文件
root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```
`VSCode 使用 EditorConfig 需要去插件市场下载插件 EditorConfig for VS Code 。`

### 集成 Prettier 配置
> 官网：[prettier.io](prettier.io)
- 安装 prettier
```bash
npm i prettier -D
```
- 创建 Prettier 配置文件
在本项目根目录下创建 .prettierrc 文件。
- 配置 .prettierrc
> [更多配置](https://prettier.io/docs/en/options.html)
```json
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "none",
  "bracketSpacing": true,
  "semi": false
}
```
- 测试
```
# 格式化所有文件（. 表示所有文件）
npx prettier --write .
```

VSCode 编辑器使用 Prettier 配置需要下载插件 Prettier - Code formatter 。

### 集成 ESLint 配置
[ESLint](https://github.com/eslint/eslint) 是一款用于查找并报告代码中问题的工具，并且支持部分问题自动修复。其核心是通过对代码解析得到的 AST（Abstract Syntax Tree 抽象语法树）进行模式匹配，来分析代码达到检查代码质量和风格问题的能力。

正如前面我们提到的因团队成员之间编程能力和编码习惯不同所造成的代码质量问题，我们使用 ESLint 来解决，一边写代码一边查找问题，如果发现错误，就给出规则提示，并且自动修复，长期下去，可以促使团队成员往同一种编码风格靠拢。

1. 安装 ESLint
```bash
npm i eslint -D
```
2. 配置 ESLint
ESLint 安装成功后，执行 `npx eslint --init`，然后按照终端操作提示完成一系列设置来创建配置文件。

**注意**：如果自动安装依赖失败，那么需要手动安装
```bash
npm i @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-base eslint-plugin-import eslint-plugin-vue -D
```
3. ESLint 配置文件 .eslintrc.js
在上一步操作完成后，会在项目根目录下自动生成 .eslintrc.js 配置文件：
```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:vue/essential', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {}
}
```
**注意** VSCode 使用 ESLint 配置文件需要去插件市场下载插件 ESLint 。
VSCode 在 settings.json 设置文件中，增加以下代码：
```json
 "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
 }
```

### 解决 Prettier 和 ESLint 的冲突
通常大家会在项目中根据实际情况添加一些额外的 ESLint 和 Prettier 配置规则，难免会存在规则冲突情况。

本项目中的 ESLint 配置中使用了 Airbnb JavaScript 风格指南校验，其规则之一是代码结束后面要加分号，而我们在 Prettier 配置文件中加了代码结束后面不加分号的配置项，这样就有冲突了，会出现用 Prettier 格式化后的代码，ESLint 检测到格式有问题的，从而抛出错误提示。
解决两者冲突问题，需要用到 eslint-plugin-prettier 和 eslint-config-prettier

- `eslint-plugin-prettier` 将 Prettier 的规则设置到 ESLint 的规则中。
- `eslint-config-prettier` 关闭 ESLint 中与 Prettier 中会发生冲突的规则。

  最后形成优先级：*Prettier 配置规则* > *ESLint 配置规则*。
- 安装插件
```bash
npm i eslint-plugin-prettier eslint-config-prettier -D
```
- 在 `.eslintrc.js` 添加 prettier 插件
```js
module.exports = {
  ...
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:prettier/recommended' // 添加 prettier 插件
  ],
  ...
}
```

### 集成 husky 和 lint-staged
我们在项目中已集成 ESLint 和 Prettier，在编码时，这些工具可以对我们写的代码进行实时校验，在一定程度上能有效规范我们写的代码，但团队可能会有些人觉得这些条条框框的限制很麻烦，选择视“提示”而不见，依旧按自己的一套风格来写代码，或者干脆禁用掉这些工具，开发完成就直接把代码提交到了仓库，日积月累，ESLint 也就形同虚设。

所以，我们还需要做一些限制，让没通过 ESLint 检测和修复的代码禁止提交，从而保证仓库代码都是符合规范的。

为了解决这个问题，我们需要用到 Git Hook，在本地执行 git commit 的时候，就对所提交的代码进行 ESLint 检测和修复（即执行 eslint --fix），如果这些代码没通过 ESLint 规则校验，则禁止提交。

实现这一功能，我们借助 `husky` + `lint-staged` 。

> - [husky](https://github.com/typicode/husky) —— Git Hook 工具，可以设置在 git 各个阶段（pre-commit、commit-msg、pre-push 等）触发我们的命令。
> - [lint-staged](https://github.com/okonet/lint-staged) —— 在 git 暂存的文件上运行 linters。

### 配置 husky
自动配置（推荐）

使用 husky-init 命令快速在项目初始化一个 husky 配置。

```bash
npx husky-init && npm install
```

husky 包含很多 hook（钩子），常用有：pre-commit、commit-msg、pre-push。这里，我们使用 pre-commit 来触发 ESLint 命令。

修改 .husky/pre-commit hook 文件的触发命令：
```bash
eslint --fix ./src --ext .vue,.js,.ts
```

上面这个 pre-commit hook 文件的作用是：当我们执行 git commit -m "xxx" 时，会先对 src 目录下所有的 .vue、.js、.ts  文件执行 eslint --fix 命令，如果 ESLint 通过，成功 commit，否则终止 commit。

但是又存在一个问题：有时候我们明明只改动了一两个文件，却要对所有的文件执行 eslint --fix。假如这是一个历史项目，我们在中途配置了 ESLint 规则，那么在提交代码时，也会对其他未修改的“历史”文件都进行检查，可能会造成大量文件出现 ESLint 错误，显然不是我们想要的结果。

我们要做到只用 ESLint 修复自己此次写的代码，而不去影响其他的代码。所以我们还需借助一个神奇的工具 lint-staged 。

### 配置 lint-staged
lint-staged 这个工具一般结合 husky 来使用，它可以让 husky 的 hook 触发的命令只作用于 git add那些文件（即 git 暂存区的文件），而不会影响到其他文件。

1. 安装 lint-staged
```
npm i lint-staged -D
```

2. 在 package.json里增加 lint-staged 配置项
```json
"lint-staged": {
  "*.{vue,js,ts}": "eslint --fix"
},
```
这行命令表示：只对 git 暂存区的 .vue、.js、.ts 文件执行 eslint --fix。

3. 修改 .husky/pre-commit hook 的触发命令为：npx lint-staged

至此，husky 和 lint-staged 组合配置完成。

## 提交规范

前面我们已经统一代码规范，并且在提交代码时进行强约束来保证仓库代码质量。多人协作的项目中，在提交代码这个环节，也存在一种情况：不能保证每个人对提交信息的准确描述，因此会出现提交信息紊乱、风格不一致的情况。

学习 Angular 规范的 commit message 格式。

### commit message 格式规范
commit message 由 Header、Body、Footer 组成。
```
<Header>

<Body>

<Footer>
```
#### Header
  Header 部分包括三个字段 type（必需）、scope（可选）和 subject（必需）。
  ```
  <type>(<scope>): <subject>
  ```
#### type

type 用于说明 commit 的提交类型（必须是以下几种之一）。

值|描述
:--|:--
feat|新增一个功能
fix|修复一个 Bug
docs|文档变更
style|代码格式（不影响功能，例如空格、分号等格式修正）
refactor|代码重构
perf|改善性能
test|测试
build|变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等）
ci|更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等
chore|变更构建流程或辅助工具
revert|代码回退

#### scope

scope 用于指定本次 commit 影响的范围。scope 依据项目而定，例如在业务项目中可以依据菜单或者功能模块划分，如果是组件库开发，则可以依据组件划分。（scope 可省略）

#### subject
subject 是本次 commit 的简洁描述，长度约定在 50 个字符以内，通常遵循以下几个规范：
- 用动词开头，第一人称现在时表述，例如：change 代替 changed 或 changes
- 第一个字母小写
- 结尾不加句号（.）

#### Body
body 是对本次 commit 的详细描述，可以分成多行。（body 可省略）

跟 subject 类似，用动词开头，body 应该说明修改的原因和更改前后的行为对比。

#### Footer
如果本次提交的代码是突破性的变更或关闭缺陷，则 Footer 必需，否则可以省略。


- 突破性的变更

  当前代码与上一个版本有突破性改变，则 Footer 以 BREAKING CHANGE 开头，后面是对变动的描述、以及变动的理由。


- 关闭缺陷

  如果当前提交是针对特定的 issue，那么可以在 Footer 部分填写需要关闭的单个 issue 或一系列 issues。

### 集成 Commitizen 实现规范提交
上面介绍了 Angular 规范提交的格式，初次接触的同学咋一看可能会觉得复杂，其实不然，如果让大家在 git commit 的时候严格按照上面的格式来写，肯定是有压力的，首先得记住不同的类型到底是用来定义什么，subject 怎么写，body 怎么写，footer 要不要写等等问题，懒才是程序员第一生产力，为此我们使用 Commitizen 工具来帮助我们自动生成 commit message 格式，从而实现规范提交。

> Commitizen 是一个帮助撰写规范 commit message 的工具。它有一个命令行工具 cz-cli。

#### 安装 Commitizen
```bash
npm install commitizen -D
```
#### 初始化项目
成功安装 Commitizen 后，我们用 cz-conventional-changelog 适配器来初始化项目：
```bash
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```
这行命令做了两件事：
- 安装 cz-conventional-changelog 到开发依赖（devDependencies）
- 在 package.json 中增加了 config.commitizen
```json
"config": {
  "commitizen": {
    "path": "./node_modules/cz-conventional-changelog"
  }
}
```

#### 自定义配置提交说明
git cz 终端操作提示都是英文的，如果想改成中文的或者自定义这些配置选项，我们使用 cz-customizable 适配器。

#### cz-customizable 初始化项目
运行如下命令使用 cz-customizable 初始化项目，注意之前已经初始化过一次，这次再初始化，需要加 --force 覆盖。
```bash
npx commitizen init cz-customizable --save-dev --save-exact --force
```
这行命令做了两件事：
- 安装 cz-customizable 到开发依赖（devDependencies）
  ```json
  "devDependencies": {
    ...
    "cz-customizable": "^6.3.0",
    ...
  },
  ```
- 修改 package.json 中的 config.commitizen 字段为：

  ```json
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-customizable"
    }
  }
  ```

#### 使用 cz-customizable
在项目根目录下创建 .cz-config.js 文件，然后按照官方提供的[示例](https://github.com/leoforfree/cz-customizable/blob/master/cz-config-EXAMPLE.js)来配置。

在本项目中我们修改成中文：
```js
module.exports = {
  // type 类型（定义之后，可通过上下键选择）
  types: [
    { value: 'feat', name: 'feat:     新增功能' },
    { value: 'fix', name: 'fix:      修复 bug' },
    { value: 'docs', name: 'docs:     文档变更' },
    { value: 'style', name: 'style:    代码格式（不影响功能，例如空格、分号等格式修正）' },
    { value: 'refactor', name: 'refactor: 代码重构（不包括 bug 修复、功能新增）' },
    { value: 'perf', name: 'perf:     性能优化' },
    { value: 'test', name: 'test:     添加、修改测试用例' },
    { value: 'build', name: 'build:    构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）' },
    { value: 'ci', name: 'ci:       修改 CI 配置、脚本' },
    { value: 'chore', name: 'chore:    对构建过程或辅助工具和库的更改（不影响源文件、测试用例）' },
    { value: 'revert', name: 'revert:   回滚 commit' }
  ],

  // scope 类型（定义之后，可通过上下键选择）
  scopes: [
    ['components', '组件相关'],
    ['hooks', 'hook 相关'],
    ['utils', 'utils 相关'],
    ['element-ui', '对 element-ui 的调整'],
    ['styles', '样式相关'],
    ['deps', '项目依赖'],
    ['auth', '对 auth 修改'],
    ['other', '其他修改'],
    // 如果选择 custom，后面会让你再输入一个自定义的 scope。也可以不设置此项，把后面的 allowCustomScopes 设置为 true
    ['custom', '以上都不是？我要自定义']
  ].map(([value, description]) => {
    return {
      value,
      name: `${value.padEnd(30)} (${description})`
    }
  }),

  // 是否允许自定义填写 scope，在 scope 选择的时候，会有 empty 和 custom 可以选择。
  // allowCustomScopes: true,

  // allowTicketNumber: false,
  // isTicketNumberRequired: false,
  // ticketNumberPrefix: 'TICKET-',
  // ticketNumberRegExp: '\\d{1,5}',


  // 针对每一个 type 去定义对应的 scopes，例如 fix
  /*
  scopeOverrides: {
    fix: [
      { name: 'merge' },
      { name: 'style' },
      { name: 'e2eTest' },
      { name: 'unitTest' }
    ]
  },
  */

  // 交互提示信息
  messages: {
    type: '确保本次提交遵循 Angular 规范！\n选择你要提交的类型：',
    scope: '\n选择一个 scope（可选）：',
    // 选择 scope: custom 时会出下面的提示
    customScope: '请输入自定义的 scope：',
    subject: '填写简短精炼的变更描述：\n',
    body:
      '填写更加详细的变更描述（可选）。使用 "|" 换行：\n',
    breaking: '列举非兼容性重大的变更（可选）：\n',
    footer: '列举出所有变更的 ISSUES CLOSED（可选）。 例如: #31, #34：\n',
    confirmCommit: '确认提交？'
  },

  // 设置只有 type 选择了 feat 或 fix，才询问 breaking message
  allowBreakingChanges: ['feat', 'fix'],

  // 跳过要询问的步骤
  // skipQuestions: ['body', 'footer'],

  // subject 限制长度
  subjectLimit: 100
  breaklineChar: '|', // 支持 body 和 footer
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true,
}

```

建议大家结合项目实际情况来自定义配置提交规则，例如很多时候我们不需要写长描述，公司内部的代码仓库也不需要管理 issue，那么可以把询问 body 和 footer 的步骤跳过（在 .cz-config.js 中修改成 skipQuestions: ['body', 'footer']）。

### 集成 commitlint 验证提交规范

在“代码规范”章节，我们已经讲到过，尽管制定了规范，但在多人协作的项目中，总有些人依旧我行我素，因此提交代码这个环节，我们也增加一个限制：只让符合 Angular 规范的 commit message 通过，我们借助 @commitlint/config-conventional 和 @commitlint/cli 来实现。

#### 安装 commitlint

安装 @commitlint/config-conventional 和 @commitlint/cli
```
npm i @commitlint/config-conventional @commitlint/cli -D
```

#### 配置 commitlint
- 创建 commitlint.config.js 文件 在项目根目录下创建 commitlint.config.js 文件，并填入以下内容：

  ```js
  module.exports = { extends: ['@commitlint/config-conventional'] }
  ```
- 使用 husky 的 commit-msg hook 触发验证提交信息的命令

  我们使用 husky 命令在 .husky 目录下创建 commit-msg 文件，并在此执行 commit message 的验证命令。

  ```
  npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
  ```

#### commitlint 验证

## 单元测试

使用 Vue 官方提供的 vue-test-utils 和社区流行的测试工具 jest 来进行 Vue 组件的单元测试。

```
npm i @vue/test-utils@next jest vue-jest@next ts-jest -D
```

### 创建 jest 配置文件
在项目根目录下新建 jest.config.js 文件：

```js
module.exports = {
  moduleFileExtensions: ['vue', 'js', 'ts'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': 'vue-jest', // vue 文件用 vue-jest 转换
    '^.+\\.ts$': 'ts-jest' // ts 文件用 ts-jest 转换
  },
  // 匹配 __tests__ 目录下的 .js/.ts 文件 或其他目录下的 xx.test.js/ts xx.spec.js/ts
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts)$'
}
```
### 创建单元测试文件
在上面的 jest.config.js 文件中，我们配置只匹配 __tests__ 目录下的任意 .ts 文件或其他目录下的 xx.test.ts/xx.spec.ts 文件进行单元测试。

### 集成 @types/jest

```
npm i @types/jest -D
```
TypeScript 的编译器也会提示 jest 的方法和类型找不到，我们还需把 @types/jest 添加根目录下的 tsconfig.json（TypeScript 配置文件）中：

```js
{
  "compilerOptions": {
    ...
    "types": ["vite/client", "jest"]
  },
}
```

### 添加 eslint-plugin-jest
```bash
# 安装 eslint-plugin-jest 
npm i eslint-plugin-jest -D
```
- 添加 eslint-plugin-jest 到 ESLint 配置文件 .eslintrc.js 中
```
module.exports = {
  ...
  extends: [
    ...
    'plugin:jest/recommended'
  ],
  ...
}
```
package.json
```json
"scripts": {
  "test": "jest"
}
```

这里，我们在项目根目录下创建 tests 目录来存储单元测试文件
```
├── src/
├── src/utils/number.ts
└── tests/                           // 单元测试目录
    ├── number.spec.ts                 // Test 组件测试
```
number.ts
```ts
export default function add(a: number, b: number) {
  return a + b;
}
```
number.spec.ts
```ts
import add from '../src/utils/number';
test('utils/number.ts', () => {
  expect(add(1, 2)).toEqual(3);
});
```
执行 `npm run test`

### 单元测试约束

前面，我们使用 husky 在 Git 的 pre-commit 和 commit-msg 阶段分别约束代码风格规范和提交信息规范。这一步，我们在 pre-push 阶段进行单元测试，只有单元测试全部通过才让代码 push 到远端仓库，否则终止 push。

使用 husky 命令在 .husky 目录下自动创建 pre-push hook 文件，并在此执行单元测试命令 npm run test。

```
npx husky add .husky/pre-push "npm run test $1"
```

现在，我们在 git push 时就能先进行单元测试了，只有单元测试全部通过，才能成功 push

## 参考文章
> [从 0 开始手把手带你搭建一套规范的 Vue3.x 项目工程环境](https://juejin.cn/post/6951649464637636622)

