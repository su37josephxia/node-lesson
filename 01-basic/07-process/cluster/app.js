const http = require('http')
const server = http.createServer((request, response) => {
    // 模拟 可能存在异常
    Math.random() > 0.8 ? add() : 'ok'

    response.end('Hello Node')
})


if(!module.parent) {
    // 主模块
    server.listen(3000, () => {
        console.log('Server at 3000')
    })
}else {
    module.exports = server
}

