const Koa = require('koa')
const router = require('koa-router')()
// koa classify 类风格 new
// vue3 functional风格 createVue
const app = new Koa()
router.get('/string', (ctx) => {
    ctx.body = 'stirng'
})
router.get('/json', (ctx) => {
    ctx.body = 'json'
})
app.use(router.routes())

// app.use(require('koa-static')(__dirname + '/'))
// 调用了一个中间件
app.use((ctx, next) => {
    console.log('====start===')
    next()
    console.log('====end=====')
})
app.use((ctx, next) => {
    const start = Date.now()
    next()
    const end = Date.now()
    console.log(`请求 ${ctx.url} 耗时 ${parseInt(end - start)}ms`)

})
// app.use((ctx, next) => {
//     console.log('response')
//     const expire = Date.now() + 1000
//     while (Date.now() < expire)
//         ctx.body = {
//             name: '然叔'
//         }
// })



app.listen(3000, () => {
    console.log('Server at 3000')
})

