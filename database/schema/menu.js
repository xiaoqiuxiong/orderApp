// 菜单表
const Sequelize = require('sequelize'),
    sequelize = require('../index'),
    moment = require('moment'),
    menuClassify = require('./menuClassify'),
    config = require('../../config'),
    menu = sequelize.define('menu', {
        // 菜单名
        name: {
            type: Sequelize.STRING(),
            unique: true
        },
        // 菜单分类
        classityId: {
            type: Sequelize.INTEGER(),
            references: {
                model: menuClassify,
                key: 'id'
            }
        },
        // 菜单库存
        inventory: {
            type: Sequelize.INTEGER(),
            unique: true
        },
        // 菜单原价
        originalPrice: {
            type: Sequelize.FLOAT(),
            unique: true
        },
        // 菜单现价
        price: {
            type: Sequelize.FLOAT(),
            unique: true
        },
        // 菜单单位
        unit: {
            type: Sequelize.STRING(),
            unique: true
        },
        // 热卖
        isHot: {
            type: Sequelize.BOOLEAN(),
            default: 0
        },
        // 热卖
        isNew: {
            type: Sequelize.BOOLEAN(),
            default: 0
        },
        // 菜单图片
        img: {
            type: Sequelize.STRING(),
            unique: true,
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

module.exports = menu;