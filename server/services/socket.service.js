const socketIo = require("socket.io");

const NODE_ENV = process.env.NODE_ENV

function webSocket(server) {

    const io = socketIo(server, {
      cors: {
          origin: NODE_ENV === 'production' 
              ? "/"
              : "http://localhost:5173",
          methods: ["GET", "POST"],
          credentials: true
      }
    });
    
    io.on('connection', (socket) => {
        console.log('client connected!')

        socket.on('setup', ({ game }) => {
          socket.join(game)
        })

        socket.on('new_message', ({ game, data }) => {
          io.in(game).emit('message', data)
          console.log(game, data)
        })

        socket.on("disconnect", () => {
          console.log("Client disconnected");
        });
    })

    return io
}

module.exports = webSocket