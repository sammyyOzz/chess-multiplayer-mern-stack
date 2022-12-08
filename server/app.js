require('dotenv').config()
const express = require('express');
const cors = require('cors');
// const gameRouter = require('./routes/game.route')

const app = express();

/**
 * Middlewares
 */
app.use(cors())
app.use(express.json())


/**
 * API routes
 */
// app.use('/api/game', gameRouter)

module.exports = app