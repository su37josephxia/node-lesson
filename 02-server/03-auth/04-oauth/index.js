const Koa = require('koa')
const router = require('koa-router')()
const static = require('koa-static')
const app = new Koa();
const axios = require('axios')
const querystring = require('query-string')
const jwt = require("jsonwebtoken");
const jwtAuth = require("koa-jwt");
const accessTokens = {}

const secret = "it's a secret";
app.use(static(__dirname + '/'));
const config = {
    client_id: '73a4f730f2e8cf7d5fcf',
    client_secret: '74bde1aec977bd93ac4eb8f7ab63352dbe03ce48',

}

router.get('/auth/github/login', async (ctx) => {
    // 重定向页面
    const path = `https://github.com/login/oauth/authorize?${querystring.stringify({
        client_id: config.client_id
    })}`
    ctx.redirect(path)
})


router.get('/auth/github/callback', async ctx => {
    const { code } = ctx.query
    console.log('授权码:' + code)

    const params = {
        client_id: config.client_id,
        client_secret: config.client_secret,
        code
    }
    const res = await axios.post(`https://github.com/login/oauth/access_token`, params)
    const { access_token } = querystring.parse(res.data)

    const uid = (Math.random() * 999999).toFixed()
    accessTokens[uid] = access_token

    const token = jwt.sign(
        {
            data: uid,
            exp: Math.floor(Date.now() / 1000) + 60 * 60
        },
        secret
    )

    // 将token保存到localstorage =》 js
    // 关闭认证页面
    // 通知主页面认证完成  设置 success标志 (localstorage) + 页面轮训
    ctx.response.body = `<script>
        window.localStorage.setItem("authSuccess", "true");
        window.localStorage.setItem("token","${token}");
        window.close();
    </script>`

})


router.get('/auth/github/userinfo',
    jwtAuth({
        secret
    }),
    async ctx => {
        const access_token = accessTokens[ctx.state.user.data]
        const url = `https://api.github.com/user`

        const res = await axios.get(url, {
            headers: {
                Authorization: `token ${access_token}`
            }
        })


        ctx.body = res.data
    }


)

app.use(router.routes()); /*启动路由*/
app.listen(7001);