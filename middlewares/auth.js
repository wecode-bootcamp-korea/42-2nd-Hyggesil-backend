const jwt = require('jsonwebtoken')
const userDao = require('../models/userDao')
const secretKey = process.env.SECRET_KEY

const checkValidToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      const err = new Error('NEED_ACCESS_TOKEN')
      err.statusCode = 401
      throw err
    }
    const decoded = jwt.verify(token, secretKey)
    const userId = decoded.userId
    const user = await userDao.checkUserByToken(userId)

    if (!user) {
      const err = new Error('INVALID_USER')
      err.statusCode = 401
      throw err
    }
    req.user = userId

    next()
  } catch (err) {
    throw err
  }
}

module.exports = { checkValidToken }
