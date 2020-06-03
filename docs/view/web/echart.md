# echart 记录 

```js
options = {

    // 总标题设置
    title: {
        text: '标题'
    },

    // 设置X轴
    xAxis: {
        // 轴坐标的 显示的label
        axisLabel: {
            color: 'red',
            // 格式化 显示的值
            formatter(a) {
                return `${a + 1} 元`
            }
        },
        
        // 坐标线
        axisLine: {
            lineStyle: {
                color: 'red'
            },
        },

        // 坐标轴刻度
        axisTick: {
            show: false
        }
    },



}
```

> [ECharts 配置项文档](https://echarts.apache.org/zh/option.html#title)