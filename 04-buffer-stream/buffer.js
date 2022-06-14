// 申请缓冲区
const buf = Buffer.alloc(10)
console.log('buf', buf)

const buf2 = Buffer.from('a')
console.log('buf2',buf2)

// UTF-8 1-6字节表示的 
const buf3 = Buffer.from('中')
console.log('buf3', buf3)

const buf4 = Buffer.concat([buf2, buf3])
console.log(buf4,buf4.toString())

