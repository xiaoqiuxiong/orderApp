const router = require('koa-router')()

router.prefix('/menu')
router.get('/', async ctx => {
    await ctx.render('menu/list')
})
router.get('/menu/add', async ctx => {
    await ctx.render('menu/add')
})
router.get('/menu/detail', async ctx => {
    await ctx.render('menu/detail')
})
router.get('/menu/classify/add', async ctx => {
    await ctx.render('menu/classify/add')
})
router.get('/menu/classify/list', async ctx => {
    await ctx.render('menu/classify/list')
})
router.get('/menu/classify/detail', async ctx => {
    await ctx.render('menu/classify/detail')
})
module.exports = router