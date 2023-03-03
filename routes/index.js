const express = require('express')
const router = express.Router()

const userRouter = require('./userRouter')
const hotelRouter = require('./hotelRouter')
const reservationRouter = require('./reservationRouter')

router.use('/users', userRouter)
router.use('/hotels', hotelRouter)
router.use('/reservations', reservationRouter)

module.exports = router
