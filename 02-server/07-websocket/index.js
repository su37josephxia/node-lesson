const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
    // 建立连接
    console.log(' a user connected ...')

    socket.on('chat message', msg => {
        // 广播
        io.emit('chat message', msg)
    })

    socket.on('disconnect', () => {
        console.log('user disconnect')
    })
})

http.listen(3000, () => {
    console.log('Server at 3000')
})