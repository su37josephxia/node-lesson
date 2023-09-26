(async () => {
    const { MongoClient } = require('mongodb')
    const client = new MongoClient(
        'mongodb://localhost:27017'
    )

    let ret
    ret = await client.connect()

    const db = client.db('test')

    const fruits = db.collection('fruits')

    // ret = await fruits.insertOne({
    //     name: 'banana',
    //     price: 2
    // })

    console.log('insert', ret)

    // 查询
    ret = await fruits.findOne()
    console.log('find', ret)

    // 更新
    ret = await fruits.updateOne({ name: 'banana' }, {
        $set: {
            price: 6
        }
    })


    // 删除
    await fruits.deleteMany({ price: 6 })

})()