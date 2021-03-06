// 管理员表
const Sequelize = require('sequelize'),
    sequelize = require('../index'),
    moment = require('moment'),
    admin = sequelize.define('admin', {
        // 手机号
        phone: {
            type: Sequelize.STRING(),
            unique: true
        },
        // 密码
        password: {
            type: Sequelize.STRING()
        },
        // 创建时间
        createdAt: {
            type: Sequelize.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
            }
        },
        // 更新时间
        updatedAt: {
            type: Sequelize.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
            }
        }
    }, {
        timestamp: false,
        freezeTableName: true
    });

module.exports = admin;