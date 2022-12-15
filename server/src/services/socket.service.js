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

      socket.on('setup', (gameId) => {
        socket.join(gameId)
      })

      socket.on('player_two_joined', (gameId) => {
        io.in(gameId).emit('player_two_joined', null)
      })

      socket.on('new_move', ({ gameId, data }) => {
        io.in(gameId).emit('move_piece', data)
        console.log(gameId, data)
      })

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    })

    return io
}

module.exports = webSocket