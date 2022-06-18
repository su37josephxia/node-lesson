const showMem = function () {
    const mem = process.memoryUsage(); const format = function (bytes) {
        return (bytes / 1024 / 1024).toFixed(2) + ' MB';
    };
    console.log('Process: heapTotal ' + format(mem.heapTotal) +
        ' heapUsed ' + format(mem.heapUsed) + ' rss ' + format(mem.rss));
    console.log('-----------------------------------------------------------');
};

const useMem = function () {
    const size = 20 * 1024 * 1024;
    // 堆内存
    const arr = new Array(size);

    // 堆外内存
    // const ary = new Buffer(size)

    for (let i = 0; i < size; i++) {

        arr[i] = 0;
    }
    return arr;
}
const total = [];
for (let j = 0; j < 35; j++) {
    showMem();
    total.push(useMem())
};

showMem();