# 日志模块

## Log4js

创建logger.ts
```ts
import * as Log4js from 'log4js'

// 配置
Log4js.configure({
    //输出位置的基本信息设置
    appenders: {
        // 设置每天：以日期为单位,数据文件类型，DateFile 注意设置pattern，alwaysIncludePattern属性 
        // prod.log.20200408.log 格式文件
        fileAppender: {
            type: 'DateFile',
            filename: './logs/prod.log',
            pattern: 'yyyyMMdd.log',
            alwaysIncludePattern: true,
            layout: { type: 'Awesome-nest' },
            daysToKeep: 60
        },

        // 错误日志 type:过滤类型logLevelFilter,将过滤error日志写进指定文件
        errorLog: {
            type: 'file',
            filename: './logs/error.log',
            pattern: 'yyyyMMdd.log',
            alwaysIncludePattern: true,
            layout: { type: 'Awesome-nest' },
        },
        // appender声明 appender 是 errorLog
        error: { type: "logLevelFilter", level: "error", appender: 'errorLog' },
        //http请求日志  http请求日志需要app.use引用一下， 这样才会自动记录每次的请求信息 
        httpLog: {
            type: "file",
            filename: "./logs/http.log",
            pattern: "yyyyMMdd.log",
            alwaysIncludePattern: true,
            // keepFileExt: true,
            layout: { type: 'Awesome-nest' },
        },
    },
    categories: {
        //appenders:采用的appender,取上面appenders项,level:设置级别
        http: {
            appenders: ['httpLog'],
            level: "debug"
        },
        default: {
            appenders: ['fileAppender', 'error'],
            level: 'info'
        }
    },
})

const logger = Log4js.getLogger()

// 设置http
const httpLog = Log4js.getLogger('http');
export const httpLogger = Log4js.connectLogger(httpLog, { level: 'WARN', });
// 这时每个请求都会有日志
app.user(httpLogger)
```