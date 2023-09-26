const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test')

const conn = mongoose.connection
conn.on('error', () => console.error('连接数据库失败'))
conn.once('open', async () => {
    console.log('db open ...')

    // 定义模型 - Schema
    const Schema = mongoose.Schema({
        name: String,
        price: Number
    })

    const Model = mongoose.model('fruit', Schema)

    let r = await Model.create({ name: 'apple', price: 8 })
    console.log('create: ', r)

    r = await Model.find({ name: 'apple' })

    console.log('find:', r)

})