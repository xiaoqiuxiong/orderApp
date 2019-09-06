const router = require('koa-router')()
const adminModel = require('../../database/models/admin')
const bcrypt = require('bcrypt')
const passport = require('koa-passport')
const config = require('../../config')
let Op = require('sequelize').Op
const moment = require('moment')
let Sequelize = require('sequelize');

// 判断方法
function isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return false;
    } else {
        return true;
    }
}


router.prefix('/adminApi/admin')
// 新增管理员
router.post('/add', async ctx => {
    let req = ctx.request.body
    req.password = req.password.toString()
    if (req.phone.toString().length != 11) {
        ctx.body = {
            code: 1,
            msg: '请正确输入手机号码'
        }
        return false
    }
    if (!req.password) {
        ctx.body = {
            code: 1,
            msg: '请输入密码'
        }
        return false
    }
    const admin = await adminModel.findOne({
        where: { phone: req.phone }
    })
    if (admin) {
        ctx.body = {
            code: 1,
            msg: '手机号码已经存在'
        }
        return false
    }

    // 加密模块
    const salt = await bcrypt.genSaltSync(config.SALT_WORK_FACTOR)
    const hash = await bcrypt.hashSync(req.password, salt)
    if (!hash) {
        ctx.body = {
            code: 2,
            msg: '密码加密失败'
        }
        return false
    }
    req.password = hash
    const res = await adminModel.create(req)
    if (!res) {
        ctx.body = {
            code: 1,
            msg: '创建失败'
        }
        return false
    }
    ctx.body = {
        code: 0,
        msg: '创建成功',
        data: res
    }
})

// 管理员登陆
router.post('/login', async ctx => {
    let req = ctx.request.body
    if (!(/^1[3456789]\d{9}$/.test(req.username))) {
        ctx.body = {
            code: 1,
            msg: '请正确输入手机号码'
        }
        return false
    }
    if (!req.password) {
        ctx.body = {
            code: 1,
            msg: '请输入密码'
        }
        return false
    }
    // 调用策略
    await passport.authenticate('local', (err, admin, info, status) => {
        if (isEmpty(admin)) {
            let adminInfo = admin
            ctx.cookies.set('token', new Buffer(JSON.stringify(adminInfo)).toString('base64'), { maxAge: 1000 * 60 * 60 * 24 })
            adminInfo.password = null
            ctx.cookies.set('adminInfo', JSON.stringify({ id: adminInfo.id, phone: adminInfo.phone }), { maxAge: 1000 * 60 * 60 * 24 })
            ctx.body = {
                code: 0,
                msg: info,
                data: adminInfo
            };
        } else {
            ctx.body = {
                code: 1,
                msg: info
            }
        }
        ctx.login(admin)
    })(ctx)
})

// 管理员登陆
router.post('/logout', async ctx => {
    ctx.logout()
    ctx.body = {
        code: 0,
        msg: '已经退出登录'
    }
})

// 管理员列表
router.get('/list', async ctx => {
    let req = ctx.request.query,
        phone = req.phone,
        start = req.time ? moment(new Date(req.time.split('~')[0])).utcOffset(0).format('YYYY-MM-DD HH:mm:ss') : '',
        end = req.time ? moment(new Date(req.time.split('~')[1])).utcOffset(24 * 60).format('YYYY-MM-DD HH:mm:ss') : '',
        countPerPage = parseInt(req.limit) || 10,
        currentPage = parseInt(req.page) || 1;
    const admins = await adminModel.findAndCountAll({
        attributes: { exclude: ['password', 'updatedAt'] },
        limit: countPerPage,
        offset: countPerPage * (currentPage - 1),
        where: Sequelize.and(
            start ? {
                createdAt: {
                    [Op.between]: [start, end]
                }
            } : null,
            phone ? { phone } : null
        )
    })
    ctx.body = {
        code: 0,
        msg: 'success',
        count: admins.count,
        rows: admins.rows
    }
})

module.exports = router