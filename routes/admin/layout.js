const router = require('koa-router')()
const config = require('../../config.js')

// 布局
router.get('/', async (ctx, next) => {
    await ctx.render('layout',{APPNAME: config.APPNAME});
})

module.exports = router