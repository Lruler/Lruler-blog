const http = require('http')
const serverHandle = require('../app')

const PORT = 8000

const server = http.createServer(serverHandle)
console.log('开启访问成功,请访问8000端口')

server.listen(PORT)