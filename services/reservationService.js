const reservationDao = require('../models/reservationDao')
const uuid = require('uuid')

const reservationPayment = async (
  userId,
  hotelId,
  checkIn,
  checkOut,
  totalPrice
) => {
  const getPointsByuserId = await reservationDao.getPointsByuserId(userId)
  if (parseInt(totalPrice) > getPointsByuserId) {
    throw new Error('TOTALPRICE_EXCEEDED_POINTS')
  }
  const day = new Date(checkOut)
  const checkOutMinusOneDay = new Date(day.setDate(day.getDate() - 1))
  const calculateDate = new Date(`${checkOut}`) - new Date(`${checkIn}`)
  const date = calculateDate / (24 * 60 * 60 * 1000)
  const price = await reservationDao.getPriceByHotelId(hotelId)
  const checkTotalPrice = date * price
  // if (parseInt(totalPrice) != checkTotalPrice) {
  //   throw new Error('THE_TOTAL_PRICES_DO_NOT_MATCH')
  // }

  const orderNumber = uuid.v4()

  return await reservationDao.createReservationPayment(
    userId,
    hotelId,
    checkIn,
    checkOut,
    totalPrice,
    orderNumber,
    date,
    checkOutMinusOneDay
  )
}

module.exports = {
  reservationPayment,
}
