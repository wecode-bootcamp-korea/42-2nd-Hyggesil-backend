const reservationService = require('../services/reservationService')
const { catchAsync } = require('../utils/error/handler')

const reservationPayment = catchAsync(async (req, res) => {
  const { hotelId, checkIn, checkOut, totalPrice } = req.body
  const userId = req.user

  await reservationService.reservationPayment(
    userId,
    hotelId,
    checkIn,
    checkOut,
    totalPrice
  )
  return res.status(201).json({ message: 'COMPLETE_PAYMENT' })
})

module.exports = {
  reservationPayment,
}
