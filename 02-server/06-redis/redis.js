(async () => {
    const { createClient } = require('redis');
    const client = await createClient()
        .on('error', err => console.log('Redis Client Error', err))
        .connect();

    await client.set('key', 'value');
    const value = await client.get('key');
    console.log('key:', value)

    const keys = await client.keys('*');
    console.log('keys:', keys)
    await client.disconnect();
})()
