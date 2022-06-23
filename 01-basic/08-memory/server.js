// 包含内存泄漏代码的服务器
const http = require('http')
const heapdump = require('heapdump')
const showMem = function () {
    const mem = process.memoryUsage()
    const format = function (bytes) {
        return (bytes / 1024 / 1024).toFixed(2) + 'MB'
    }
    console.log('Process : heapTotal:' + format(mem.heapTotal)
        + ' heapUsed:' + format(mem.heapUsed)
        + ' 堆外:' + format(mem.rss - mem.heapUsed))

    console.log('------------------------')
}


leakArray = [];


var leak = function () {
    // leakArray.push(new Array(20 * 1024 * 1024))
};
http.createServer(function (req, res) {
    leak();
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
    showMem()
}).listen(3000, () => {
    console.log('Server at 3000 pid:' + process.pid)
});