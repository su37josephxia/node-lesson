class EventEmitter {
    constructor() {
        this.handlers = {
            // 'some_event': [
            //     () => {}
            // ]
        }
    }

    on(name , callback) {
        if(!this.handlers[name]) {
            this.handlers[name] = []
        }
        this.handlers[name].push(callback)
    }

    emit(name,...args) {
        if(this.handlers[name]) {
            for(let v of this.handlers[name]) {
                v(...args)
            }
        }
    }
}

const ev = new EventEmitter()
ev.on('some_event', num => {
    console.log('some_event1 :' + num)
})
ev.on('some_event', num => {
    console.log('some_event2 :' + num)
})
let num = 0
setInterval(() => {
    ev.emit('some_event', num ++)
}, 1000);