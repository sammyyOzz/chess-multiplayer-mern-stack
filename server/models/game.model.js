const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    player1: { 
      type: String, 
      required: true, 
      trim: true, 
      minlength: 3 
    },
    player2: { 
      type: String, 
      trim: true, 
      minlength: 3 
    }
}, {
    timestamps: true,
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game;