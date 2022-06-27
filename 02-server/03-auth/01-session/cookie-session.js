const http = require('http')
const SessionStorage = {
}

const server = http.createServer((req, res) => {
    const { headers } = req
    const { cookie } = headers
    const sessionKey = 'sid'
    if (cookie && cookie.indexOf(sessionKey) > -1) {
        // 旧用户
        // 获取sid
        //name:123;sid=432432432;abc=123213
        const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
        const sid = pattern.exec(cookie)[1]
        console.log('sid:', sid)
        console.log('session', SessionStorage[sid])


        res.end('Come Back')
    } else {
        // 新用户 随机数 uuid
        const sid = (Math.random() * 99999999999).toFixed()
        res.setHeader('Set-Cookie', `${sessionKey}=${sid};`)
        SessionStorage[sid] = {
            name: '全栈然叔',
            age: 40
        }

        res.end('Welcome')
    }

})
server.listen(3000, () => {
    console.log('Server at 3000')
})