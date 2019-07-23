# md 语法

语法简单， 格式固定 ，好看，

## 标题

```
# 这是一级标题
## 这是二级标题
### 这是三级标题
#### 这是四级标题
##### 这是五级标题
###### 这是六级标题
```

## 字体

- **加粗** `**加粗**`
- *斜体* `*斜体*`
- ***斜体加粗***
- ~~删除线~~ `~~删除线~~`

## 引用

`> 引用内容`
> 引用内容

`>> 引用内容`
>> 引用内容

## 分割线

大于等于三个 `-` 或者 `*` 即可

`---`

`------`

`***`

`*******`

---
------
***
*******

## 图片

语法：

```
![图片的alt](图片地址 "图片title")
图片alt就是显示在图片下面的文字，相当于对图片内容的解释。
图片title是图片的标题，当鼠标移到图片上时显示的内容。title可加可不加
```

例： 😅 我这个好像 alt 和 title 不行

` ![logo](../../assets/logo.jpg "这是logo") `

![logo](../../assets/logo.jpg "这是logo")


## 超链接

语法：

```
[超链接名](超链接地址 "超链接title")
title可加可不加
```
例：

`[xingwen](https://xingwenl.github.io/docs)`

[xingwen](https://xingwenl.github.io/docs)

## 列表

### 无序

无序使用  **+ - *** 任意一种即可

**+ - *** 与后面的内容 需要加一个空格

```
- 床前明月光，疑是地上霜
- 举头望明月，低头思故乡
```

- 床前明月光，疑是地上霜
- 举头望明月，低头思故乡

### 有序

```
数字加点
1. 列表内容
2. 列表内容
3. 列表内容

注意：序号跟内容之间要有空格

```

1. 列表内容
2. 列表内容
3. 列表内容

### 列表嵌套

上级和下级直接 差个 空格 或者 tab

```
- 一级1
    - 二级1
    - 二级2
- 一级2
    - 二级1
    - 二级2
- 一级3
    - 二级3

```

- 一级1
    - 二级1
    - 二级2
- 一级2
    - 二级1
    - 二级2
- 一级3
    - 二级3


## 表格

语法：

```
表头|表头|表头
---|:--:|---:
内容|内容|内容
内容|内容|内容


--- 无设置 
:--: 居中对齐
---： 右对齐

```

表头|表头|表头
---|:--:|---:
内容|内容|内容
内容|内容|内容

## 代码

### 单行

```
反引号 `` 包起来

`console.log("hello world")`

```

`console.log("hello world")`

### 多行

```
    (```js)
        console.log("hello world")
    (```)

    () 防止转译， 实际是不需要的， ，js代表改代码块是js语法
```

```js
    console.log("hello world")
```

## 待办事项
使用带有 [ ] 或 [x] （未完成或已完成）项的列表语法撰写一个待办事宜列表，并且支持子列表嵌套以及混用Markdown语法，例如：

```
- [ ] **Cmd Markdown 开发**
    - [ ] 改进 Cmd 渲染算法，使用局部渲染技术提高渲染效率
    - [ ] 支持以 PDF 格式导出文稿
    - [x] 新增Todo列表功能 [语法参考](https://github.com/blog/1375-task-lists-in-gfm-issues-pulls-comments)
    - [x] 改进 LaTex 功能
        - [x] 修复 LaTex 公式渲染问题
        - [x] 新增 LaTex 公式编号功能 [语法参考](http://docs.mathjax.org/en/latest/tex.html#tex-eq-numbers)
- [ ] **七月旅行准备**
    - [ ] 准备邮轮上需要携带的物品
    - [ ] 浏览日本免税店的物品
    - [x] 购买蓝宝石公主号七月一日的船票
```

- [ ] **Cmd Markdown 开发**
    - [ ] 改进 Cmd 渲染算法，使用局部渲染技术提高渲染效率
    - [ ] 支持以 PDF 格式导出文稿
    - [x] 新增Todo列表功能 [语法参考](https://github.com/blog/1375-task-lists-in-gfm-issues-pulls-comments)
    - [x] 改进 LaTex 功能
        - [x] 修复 LaTex 公式渲染问题
        - [x] 新增 LaTex 公式编号功能 [语法参考](http://docs.mathjax.org/en/latest/tex.html#tex-eq-numbers)
- [ ] **七月旅行准备**
    - [ ] 准备邮轮上需要携带的物品
    - [ ] 浏览日本免税店的物品
    - [x] 购买蓝宝石公主号七月一日的船票

## 流程图

本文章不支持 ，嘿嘿嘿

```flow
st=>start: 开始
op=>operation: My Operation
cond=>condition: Yes or No?
e=>end
st->op->cond
cond(yes)->e
cond(no)->op

```


## 本人心得


## 参考文章
>[Markdown基本语法](https://www.jianshu.com/p/191d1e21f7ed)
