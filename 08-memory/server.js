// 包含内存泄漏代码的服务器

const heapdump = require('heapdump')
const http = require('http')

leakArray = [];

const showMem = function () {
    const mem = process.memoryUsage(); const format = function (bytes) {
        return (bytes / 1024 / 1024).toFixed(2) + ' MB';
    };
    console.log('Process: heapTotal ' + format(mem.heapTotal) +
        ' heapUsed ' + format(mem.heapUsed) + ' rss ' + format(mem.rss));
    console.log('-----------------------------------------------------------');
};


var leak = function () {
    leakArray.push(new Array(20 * 1024 * 1024))
};
http.createServer(function (req, res) {
    leak();
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
    showMem()
}).listen(3000, () => {
    console.log('Server at 3000 pid:' + process.pid)
});