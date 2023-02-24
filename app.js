const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { globalErrorHandler } = require('./utils/error/handler')

const routes = require('./routes')

const createApp = () => {
  const app = express()

  app.use(express.json())
  app.use(cors())
  app.use(morgan('dev'))
  app.use(routes)
  app.use(globalErrorHandler)

  app.get('/ping', (req, res) => {
    res.status(200).json({ message: 'pong' })
  })

  return app
}

module.exports = {
  createApp,
}
