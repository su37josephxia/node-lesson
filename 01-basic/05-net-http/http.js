// HTTP服务器器

const http = require('http')
const fs = require('fs')
const server = http.createServer((request, response) => {
    // console.log('this is a request')
    // response.end('Hello Node')
    const {url , method, headers} = request
    if(url === '/' && method === 'GET') {
        // 应答首页index.html
        fs.readFile('index.html', (err,data) => {
            if(err) {
                // 异常应答 500
                response.writeHead(500, {
                    'Content-Type':'text/plain;charset=utf-8'
                })
                response.end('500 服务器异常')
                return
            }
            response.statusCode = 200
            response.setHeader('Content-Type','text/html')
            response.end(data)
        })
    } else if(url === '/users' && method === 'GET') {
        response.writeHeader(200, {
            'Content-Type':'application/json'
        })
        response.end(JSON.stringify({name:'josephxia'}))
    }else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
        // url = /img.png
        fs.createReadStream('.' + url).pipe(response)
    }
    else {
        // 404
        response.statusCode = 404
        response.setHeader('Content-Type','text/plain;charset=utf-8')
        response.end('404 页面没找到')
    }


})

server.listen(3000, () => {
    console.log('Server at 3000')
})