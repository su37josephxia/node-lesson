const koa = require('koa')
const app = new koa()
const redisSotre = require('koa-redis')
const Redis = require('ioredis')
const redisClient = new Redis()

const session = require('koa-session')

app.keys = ['xxxxx']

app.use(session({
    key: 'rrr:sess',
    store: redisSotre({ redisClient })
}, app))

app.use(async (ctx, next) => {
    // 观察Redis状态
    const keys = await redisClient.keys('*')
    keys.forEach(async key => console.log(key + ':' + await redisClient.get(key)))
    await next()
})

app.use(async (ctx, next) => {
    if (ctx.path === '/favicon.ico') return
    let n = ctx.session.count || 0
    ctx.session.count = ++n
    ctx.body = `第${n}访问`
})

app.listen(3000)
