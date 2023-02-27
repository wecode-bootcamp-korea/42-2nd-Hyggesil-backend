const messages = require('../error/messages')

const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) => next(err))
  }
}

const globalErrorHandler = (err, req, res, next) => {
  const statusCode = messages[err.message]?.statusCode || 500
  const message = messages[err.message]?.message || '알려지지 않은 에러.'
  res.status(statusCode).json({ message: message })
}

module.exports = {
  catchAsync,
  globalErrorHandler,
}
