const cluster = require('cluster')
const os = require('os')
const numCPUs = os.cpus().length

const workers = {}
if(cluster.isMaster) {
    // 主进程
    // 守护进程
    for(let i = 0; i < numCPUs; i++) {
        let worker = cluster.fork() // 复制进程
        console.log('🚀 cluster fork:', worker.process.pid)
        workers[worker.process.pid] = worker
    }

    // 监控小弟
    cluster.on('exit', (worker) => {
        console.log('❌ 工作进程异常: ', worker.process.pid)
        delete workers[worker.process.pid]
        worker = cluster.fork()
        console.log('🚀 cluster fork:', worker.process.pid)
        workers[worker.process.pid] = worker
    })
    
}else {
    // 工作进程
    const app = require('./app')
    app.listen(3000)
}

process.on('SIGTERM', () => {
    for(var pid in workers) {
        process.kill(pid)
    }
    process.exit(0)
})

require('./test')