const logTime = (name) => {
    console.log(`${name} ${Date.now()}`)
}

// 回调地狱
// setTimeout(() => {
//     logTime('Callback1')
//     setTimeout(() => {
//         logTime('Callback2')
//         setTimeout(() => {
//             logTime('Callback3')
//         },1000)
//     },1000)
// },1000)

// Promise
// const createTimerPromise = (name, delay = 1000) => new Promise((resolve) => {
//     setTimeout(() => {
//         logTime(name)
//         resolve()
//     },delay)
// })

// createTimerPromise('Promise1')
// .then(() => createTimerPromise('Promise2'))
// .then(() => createTimerPromise('Promise3'))

// // 完美的方式 异步处理接近同步函数
// function* generator() {
//     yield createTimerPromise('Generator1')
//     yield createTimerPromise('Generator2')
//     yield createTimerPromise('Generator3')
// }
// // TJ大神
// const co = generator => {
//     let it
//     if(it = generator.next().value) {
//         it.then(() => co(generator))
//     }else {
//         return 
//     }
// }
// co(generator())

// // Async/Await
// async function asyncFun() {
//     await createTimerPromise('Async1')
//     await createTimerPromise('Async2')
//     await createTimerPromise('Async3')
// }

// asyncFun()


// Event事件
const  {EventEmitter} = require('events')
const event = new EventEmitter()

const createTimerEvent = name => event =>  {
    setTimeout(() => {
        logTime(name)
        // 发布一个通知
        event.emit('end')
    },1000)
}

const list = [
    createTimerEvent('event1'),
    createTimerEvent('event2'),
    createTimerEvent('event3'),
]
let i = 0
event.on('end' , () => i < list.length && list[i++](event))
event.emit('end')