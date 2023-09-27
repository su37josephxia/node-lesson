(async () => {
    const { createClient } = require('redis')
    const client = await createClient()
        .on('error', err => console.err('Redis Error', err))
        .connect()

    await client.set('k1', 'josephxia')

    const name = await client.get('k1')
    console.log('name:', name)

    const keys = await client.keys('*')
    console.log('keys', keys)

})()