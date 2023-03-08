const express = require('express')
const router = express.Router()

const userRouter = require('./userRouter')
const hotelRouter = require('./hotelRouter')
const reservationRouter = require('./reservationRouter')
const hostRouter = require('./hostRouter')

router.use('/users', userRouter)
router.use('/hotels', hotelRouter)
router.use('/reservations', reservationRouter)
router.use('/hosts', hostRouter)

module.exports = router
