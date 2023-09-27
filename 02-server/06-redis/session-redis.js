
const koa = require('koa')
const app = new koa()
const redisStore = require('koa-redis');
const Redis = require('ioredis')
const redisClient = new Redis({});

const session = require('koa-session')

// 签名key keys作用 用来对cookie进行签名
app.keys = ['some secret'];

app.use(session({
    key: 'kkb:sess',
    store: redisStore({ redisClient }) // 此处可以不必指定
}, app));

app.use(async (ctx, next) => {
    const keys = await redisClient.keys('*')
    keys.forEach(async key =>
        console.log(await redisClient.get(key))
    )
    await next()
})

// 测试
app.use(ctx => {
    if (ctx.path === '/favicon.ico') return;
    // 获取
    let n = ctx.session.count || 0;
    // 设置
    ctx.session.count = ++n;
    ctx.body = '第' + n + '次访问';
});

app.listen(3000)