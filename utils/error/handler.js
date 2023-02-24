const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) => next(err))
  }
}

const globalErrorHandler = (err, req, res, next) => {
  res.status(err.statusCode).json({ message: err.message })
}

module.exports = {
  catchAsync,
  globalErrorHandler,
}
