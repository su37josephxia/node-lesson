// 环境变量
console.log(process.env.PATH.split(':').join('\n'))
// 架构
console.log('arch:',process.arch)
// 内存
console.log('内存:',process.memoryUsage())

// 定时退出
setTimeout(() => {
    process.exit(0)
},1000)
