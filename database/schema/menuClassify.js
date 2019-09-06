// 菜单分类表
const Sequelize = require('sequelize'),
    sequelize = require('../index'),
    moment = require('moment'),
    config = require('../../config'),
    menuClassify = sequelize.define('menuClassify', {
        // 分类名称
        name: {
            type: Sequelize.STRING(),
            unique: true
        },
        // 分类图标
        icon: {
            type: Sequelize.STRING(),
            default: `${config}menu_default.png`           
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

module.exports = menuClassify;