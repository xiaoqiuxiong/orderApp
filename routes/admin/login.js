const router = require('koa-router')()
const config = require('../../config')
// 登录
router.get('/login', async (ctx, next) => {
    await ctx.render('login',{title:config.APPNAME});
})

module.exports = router