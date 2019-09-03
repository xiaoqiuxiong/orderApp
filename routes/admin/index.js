const router = require('koa-router')()

router.prefix('/home')
// 首页
router.get('/', async (ctx, next) => {
    await ctx.render('index');
})

module.exports = router