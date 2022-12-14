const app = require('./app')
const http = require('http')
const socketIo = require("./services/socket.service");
const { mongoConnect } = require('./services/mongo.service');

const PORT = process.env.PORT || 5000

// mongoConnect()

const server = http.createServer(app)

socketIo(server)

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})