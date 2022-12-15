const mongoose = require('mongoose')

const MONGO_URL = process.env.MONGO_URL


mongoose.connection.once('open', () => console.log('Mongo DB is connected!'))
mongoose.connection.on('error', (error) => console.log('Mongo DB error: ' + error))

const mongoConnect = () => {
  mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  })
}

const mongoDisconnect = () => {
  mongoose.disconnect()
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}