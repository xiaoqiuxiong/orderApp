let Sequelize = require('sequelize');
let sequelize = require('../index.js');

// 管理员表

let admin = sequelize.define('admin', {
    // 手机号
    phone: {
        type: Sequelize.STRING(),
        unique: true
    },
    // 密码
    password: {
        type: Sequelize.STRING()
    }
}, {
    freezeTableName: true
});

module.exports = admin;