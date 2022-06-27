const Koa = require('koa')
const router = require('koa-router')()
const session = require('koa-session')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')

const app = new Koa()


app.keys = ['123213213']

app.use(static(__dirname + '/'))
app.use(bodyParser())
app.use(session(app))

// 鉴权
app.use((ctx, next) => {
    if (ctx.url.indexOf('login') > -1) {
        next()
    } else {

        if (!ctx.session.userinfo) {
            ctx.body = {
                message: 'Login NG'
            }
        } else {
            next()
        }
    }
})

// /login
router.post('/users/login', async ctx => {
    const { body } = ctx.request
    console.log('body:' + body)

    // 授权
    ctx.session.userinfo = {
        user: body.username
    }

    console.log('userinfo', ctx.session.userinfo)
    ctx.body = {
        message: 'Login OK'
    }
})


router.post('/users/logout', async ctx => {
    delete ctx.session.userinfo
    ctx.body = {
        message: '登出系统'
    }
})

router.get('/users/getUser', async ctx => {

    ctx.body = {
        message: 'User Message',
        data: ctx.session.userinfo

    }
})

app.use(router.routes())
app.listen(3000, () => {
    console.log('Server at 3000')
})