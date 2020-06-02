# pako

用来压缩数据，和解压gzip的，

```js
    let test = { my: 'super', puper: [456, 567], awesome: 'pako' };
    // 缩小 === 压缩
    let binaryString = pako.deflate(JSON.stringify(test))
    // 放大 === 解压
    let res = pako.inflate(binaryString, {to: 'string'})
```