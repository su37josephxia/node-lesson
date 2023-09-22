const fs = require('fs')
/**
 * 将数据存入文件
 * @param {*} key 
 * @param {*} value 
 */
function set(key, value) {
    fs.readFile('./db.json', (err, data) => {
        // 首次访问 创建一个文件
        // 第二次 读取文件
        const json = data ? JSON.parse(data) : {}
        // 设置数据
        console.log('value', value)
        json[key] = JSON.parse(value)
        // 写入文件
        fs.writeFile('./db.json', JSON.stringify(json), err => {
            if (err) {
                console.log('❌ 写入失败!!!')
            } else {
                console.log('✅ 写入成功!!!')
            }
        })
    })
}
/**
 * 从文件读取数据
 * @param {*} key 
 * @returns 
 */
function get(key) {
    fs.readFile('./db.json', (err, data) => {
        const json = JSON.parse(data)
        console.log(json[key])
        return json[key]
    })
}

// 输入输出流
// get a\n
// set a 1\n
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.on('line', (input) => {
    // set a 1
    const [op, key, ...value] = input.split(' ')
    if (op === 'get') {
        get[key]
    } else if (op === 'set') {
        set(key, value.join(''))
    } else if (op === 'quit') {
        rl.close()
    } else {
        console.log('❓ 我不知道你想干啥？？')
    }
})
rl.on('close', () => {
    console.log('程序结束')
    process.exit(0)
})