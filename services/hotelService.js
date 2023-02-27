const { CONVENIENTS, DEFAULT_LIMIT } = require('../utils/constants')
const { removeNull } = require('../utils')
const hotelDao = require('../models/hotelDao')

const getHotels = async (filters) => {
  let hotels = await hotelDao.getHotels(filters)
  const hotelIds = hotels.map(hotel => hotel.id)

  const hotelConvenients = await hotelDao.getHotelConvenients(hotelIds)

  const hotelConvenientsObj = {}
  hotelConvenients.forEach(hotelConvenient => {
    hotelConvenientsObj[hotelConvenient.hotel_id] = hotelConvenient.convenients
  })

  const joinedHotel = hotels.map(hotel => ({
    ...hotel,
    price: Math.ceil(hotel.price),
    convenients: hotelConvenientsObj[hotel.id]
  }))

  return joinedHotel
}

module.exports = {
  getHotels,
}