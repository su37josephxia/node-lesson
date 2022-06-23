const koa = require('koa')
const router = require('koa-router')()
const static = require('koa-static2')
const views = require('koa-views')
const app = new koa()
app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))
// /asssts/abc.png
app.use(static('assets', __dirname + '/assets'))
router.get('/', async ctx => {
    await ctx.render('index', {
        name: '然叔博客',
        menus: ['Home', 'Event', 'Gallery', 'News', 'About', 'Contact'],
    })
})
app.use(router.routes())
app.listen(3000, () => {
    console.log('Server at 3000')
})
