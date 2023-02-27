const express = require('express')
const router = express.Router()

const userRouter = require('./userRouter')
const hotelRouter = require('./hotelRouter')

router.use('/users', userRouter)
router.use('/hotels', hotelRouter)

module.exports = router
