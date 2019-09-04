const router = require('koa-router')()

router.prefix('/admin')
router.get('/', async ctx => {
	await ctx.render('admin/list')
})
module.exports = router