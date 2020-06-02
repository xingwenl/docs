# node-schedule

用于项目中做定时任务的操作，比如，定时给某用户发奖

## 安装

```bash
npm install node-schedule --save

yarn add node-schedule
```

## Cron风格定时器
### 例子
```js
const schedule = require('node-schedule')

// 每分钟的第2秒执行一次
const startTask = () => {
    schedule.scheduleJob('2 * * * * *', () => {
        console.log('startTask')
    })
}

startTask()
```

每个参数还可以传入数值范围
```js
const schedule = require('node-schedule')

//每分钟的1-10秒都会触发，其它通配符依次类推
const task1 = ()=>{
  schedule.scheduleJob('1-10 * * * * *', ()=>{
    console.log('scheduleCronstyle:'+ new Date());
  })
}

task1()
```

### 规则
六个占位符从左到右分别代表：秒、分、时、日、月、周几
`*` 表示通配符，匹配任意，如当秒为`*`时，表示任意秒数都会触发

```
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
```

```
每分钟的第30秒触发： '30 * * * * *'

每小时的1分30秒触发 ：'30 1 * * * *'

每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'

每月的1日1点1分30秒触发 ：'30 1 1 1 * *'

2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'

每周1的1点1分30秒触发 ：'30 1 1 * * 1'
```

## 对象文本语法定时器

```js
const schedule = require('node-schedule')

function task2(){

    //dayOfWeek
    //month
    //dayOfMonth
    //hour
    //minute
    //second
      //每周一的1：1分触发，
    schedule.scheduleJob({hour: 1, minute: 1, dayOfWeek: 1}, function(){
        console.log('task2:' + new Date());
    });
   
}

task2();
```

### 取消定时器

```js
const schedule = require('node-schedule')

function task3(){

    var counter = 1;
    const scheduleInstance = schedule.scheduleJob('* * * * * *', function(){
        console.log('定时器触发次数：' + counter);
        counter++;
    });

    setTimeout(function() {
        // 定时器取消
        scheduleInstance.cancel();   
        console.log('定时器取消')
    }, 5000);
    
}

task3();
```

### 设置开始时间和结束时间
它将在5秒后运行，10秒后停止，
`/1` 代表每一秒执行一次
```js
let startTime = new Date(Date.now() + 5000);
let endTime = new Date(startTime.getTime() + 5000);
var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, function(){
  console.log('Time for tea!');
});
```


## 参考

> [node-schedule](https://github.com/node-schedule/node-schedule)
> [Nodejs 定时任务](https://www.jianshu.com/p/8d303ff8fdeb)