const fs = require('fs')
const {spawn} = require('child_process')
const {resolve} = require('path')

function watch() {
    // 启动子进程
    const [cmd,,source,...argv] = process.argv

    const child = spawn(cmd, [source, ...argv])

    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)

    // 设置监听
    const watcher = fs.watch(resolve(__dirname, source), () => {
        console.log('File changed, reloading')
        child.kill()
        watcher.close()
        watch()
    })

    process.on('SIGTERM', () => {
        child.kill()
        process.exit(0)
    })
}

watch()