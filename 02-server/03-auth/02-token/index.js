const Koa = require('koa')
const router = require('koa-router')()
const jwtAuth = require('koa-jwt')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const jwt = require('jsonwebtoken')

const app = new Koa()

const secret = '123abc'
app.use(static(__dirname + '/'))
app.use(bodyParser())

router.post('/token/login', async ctx => {
    const { body } = ctx.request
    // 匹配

    //    然叔  + 6月28日  + 签名
    ctx.body = {
        message: 'Login OK',
        token: jwt.sign({
            data: {
                name: body.username
            },
            exp: Math.floor(Date.now() / 1000) + 60 * 60
        },
            secret
        )

    }
})


router.get('/token/users',
    // 鉴权  检查Token是否合法
    jwtAuth({
        secret
    }),
    async ctx => {
        // 用户信息
        console.log('state', ctx.state.user)

        ctx.body = {
            message: '获取信息成功',
            userinfo: ctx.state.user.data
        }
    }
)

app.use(router.routes())
app.listen(3000, () => {
    console.log('Server at 3000')
})