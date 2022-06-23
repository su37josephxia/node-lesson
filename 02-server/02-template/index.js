const koa = require('koa');
const app = new koa();
const router = require('koa-router')();
const static = require('koa-static2')
const views = require('koa-views');
app.use(views(__dirname + '/views', {
    extension: 'ejs'
}));
app.use(static('assets', __dirname + '/assets'))
router.get('/', async (ctx) => {
    await ctx.render('index', {
        name: 'Header',
        menus: ['Home', 'Event', 'Gallery', 'News', 'About', 'Contact'],
    });
});
app.use(router.routes())
app.listen(3000, () => {
    console.log('Server at 3000')
})