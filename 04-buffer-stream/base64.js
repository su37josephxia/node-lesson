// src: data:base64 ASDFDSAFDSA
const fs = require('fs')
function genBase64() {
    const mime = 'image/png'
    const encoding = 'base64'
    const data = fs.readFileSync('./img.png')
    const url = `data:${mime};${encoding},${data.toString(encoding)}`
    fs.writeFileSync('./index.html',`<img src='${url}'/>`)
}
genBase64()