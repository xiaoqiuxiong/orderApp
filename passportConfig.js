const passport = require('koa-passport')
var LocalStrategy = require('passport-local').Strategy
const adminModel = require('./database/models/admin')
const bcrypt = require('bcrypt')
const config = require('./config')

// 判断方法
function isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return false;
    } else {
        return true;
    }
}

/**
 * @param phone 用户输入的手机号码
 * @param password 用户输入的密码
 * @param done 验证验证完成后的回调函数，由passport调用
 */
passport.use(
    new LocalStrategy(async function(phone, password, done) {
        const admin = await adminModel.findOne({ where: { phone: phone } })
        try {
            if (isEmpty(admin)) {
                // 加密模块
                const isTrue = await bcrypt.compareSync(password.toString(), admin.password)
                if (isTrue) {
                    return done(null, admin, '登录成功')
                } else {
                    return done(null, false, '密码错误')
                }
            } else {
                done(null, false, '未知用户')
            }
        } catch (err) {
            done(null, false, '未知用户')
        }
    }))

// 序列化
passport.serializeUser(function(admin, done) {
    done(null, admin);
})
// 反序列化
passport.deserializeUser(async function(admin, done) {
    const adminData = await adminModel.findOne({ where: { id: admin.id } })
    done(null, adminData)
})

module.exports = passport