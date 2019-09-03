let adminModel = require('../schema/admin');

// 同步表结构
adminModel.sync({
    force: false // 强制同步，先删除表，然后新建
});

module.exports = adminModel