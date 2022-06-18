const fs = require('fs')
const {promisify} = require('util')
const readFileP = promisify(fs.readFile)
const fsp = require('fs').promises

// 同步阻塞方式
// const db = fs.readFileSync('./db.json')
// console.log(db.toString())

// 异步非阻塞
// fs.readFile('./db2.json', (err, db) => {
//     // 错误优先回调
//     if(err) {
//         console.error('读取异常:', err)
//         return
//     }
//     console.log(db.toString())
// })
// console.log('readed....')
// promise风格 + async/await

// readFileP('./db.json').then(
//     db => {
//         console.log(db.toString())
//     }
// )

fsp.readFile('./db.json').then(
    db => {
        console.log(db.toString())
    }
)