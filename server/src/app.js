require('dotenv').config()
const express = require('express');
const cors = require('cors');
const path = require('path');
// const gameRouter = require('./routes/game.route')

const app = express();

/**
 * Middlewares
 */
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, '..', 'public')))


/**
 * API routes
 */
// app.use('/api/game', gameRouter)

module.exports = app