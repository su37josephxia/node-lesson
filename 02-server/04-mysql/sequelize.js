(async () => {
    const Sequelize = require('sequelize')
    // 建立连接
    const sequelize = new Sequelize('test', 'root', 'example', {
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases: false
    })

    // 定义模型
    const Fruit = sequelize.define('Fruit', {
        name: { type: Sequelize.STRING(20), allowNull: false }
    })
    // 同步
    let ret = await Fruit.sync()

    ret = await Fruit.create({
        name: '辣椒'
    })


    ret = await Fruit.findAll()
    console.log('findAll', JSON.stringify(ret, null, 4))

    ret = await Fruit.findAll({
        where: {
            name: '香蕉'
        }
    })
    console.log('香蕉ret:', JSON.stringify(ret))
})()