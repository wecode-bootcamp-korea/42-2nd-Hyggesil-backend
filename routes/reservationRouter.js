const express = require('express')
const reservationController = require('../controllers/reservationController')
const { checkValidToken } = require('../middlewares/auth')

const router = express.Router()

router.post(
  '/payment',
  checkValidToken,
  reservationController.reservationPayment
)

module.exports = router
