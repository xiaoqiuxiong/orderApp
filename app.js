const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const registerRouter = require('./routes/access')
const passport = require('./passportConfig')
const session = require('koa-session')
const jwt = require('koa-jwt')
const config = require('./config')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))

//配置session的中间件
app.keys = ['xiaoqiuxiong']
app.use(session({
    key: 'koa:xiaoqiuxiong',
    maxAge: 1000 * 60 * 60 * 24,
    overwrite: true,
    httpOnly: false,
    signed: true
}, app))

app.use(passport.initialize())
app.use(passport.session())
app.use(json())
app.use(logger())


app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function(ctx, next) {
    return next().catch((err) => {
        if (401 == err.status) {
            ctx.status = 200;
            ctx.body = {
                code: 9999,
                msg: '您还没有登录，请先登录！'
            };
        } else {
            throw err;
        }
    });
})

// 控制接口
// app.use(jwt({
//     secret: 'xiaoqiuxiong',
// }).unless({
//     path: ['/adminApi/add', '/adminApi/login'],
// }))

// 控制后台
app.use(async (ctx, next) => {
    if (ctx.url.match(/^\/adminApi/)) {
        if (ctx.url.match(/^\/adminApi\/add/) || ctx.url.match(/^\/adminApi\/login/)) {
            await next()
        } else {
            if (!ctx.isAuthenticated()) {
                ctx.body = {
                    code: 9999,
                    msg: '您还没有登录，请先登录！'
                }
                return false
            }
            await next()
        }
    }
})
// routes
app.use(registerRouter())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app