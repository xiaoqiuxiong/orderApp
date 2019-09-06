let config = {
    APPNAME: '小N点餐',  //程序名称
    // 数据库配置
    SQLCONFIG: {
        host: "localhost",  //数据库ip
        user: "root",  //数据库用户名
        password: "",  //数据库密码
        port: "3000",  //数据库端口号
        database: "orderdb"  //数据库名称
    },
    // 密码加盐强度
    SALT_WORK_FACTOR: 10,
    KEY: 'xiaoqiuxiong',
    // 七牛云域名前缀
    QNBASEPATH: 'http://pxefy5rqa.bkt.clouddn.com/'
};
module.exports = config;