const net = require('net')  // TCP
// 语音聊天室
// clientA  ->  server(广播)  <-  clientB
const chatServer = net.createServer()
const list = []
// 监听连接
chatServer.on('connection', client => {
    // stream流
    client.write("Hi!\n")
    list.push(client)
    client.on('data', data => {
        console.log('receive:', data.toString())
        // 广播
        list.forEach(v => v.write(data))
    })
})

// 启动监听
chatServer.listen(9000)