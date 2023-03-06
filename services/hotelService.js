const hotelDao = require('../models/hotelDao')

const getHotels = async (filters) => {
  const hotels = await hotelDao.getHotels(filters)
  const hotelIds = hotels.map(hotel => hotel.id)
  const hotelImages = await hotelDao.getHotelImages(hotelIds)
  const hotelConvenients = await hotelDao.getHotelConvenients(hotelIds)

  const hotelConvenientsObj = {}
  hotelConvenients.forEach(hotelConvenient => {
    hotelConvenientsObj[hotelConvenient.hotel_id] = hotelConvenient.convenients
  })

  const hotelImagesObj = {}
  hotelImages.forEach(hotelImage => {
    hotelImagesObj[hotelImage.id] = hotelImage.images
  })

  const joinedHotel = hotels.map(hotel => ({
    ...hotel,
    price: Math.ceil(hotel.price),
    images: hotelImagesObj[hotel.id] ?
      hotelImagesObj[hotel.id] : [],
    convenients: hotelConvenientsObj[hotel.id] ?
      hotelConvenientsObj[hotel.id] : []
  }))

  return joinedHotel
}

const getHotel = async (hotelId, month) => {
  const hotel = await hotelDao.getHotel(hotelId)
  const [hotelImages] = await hotelDao.getHotelImages(hotelId)
  const [{ convenients }] = await hotelDao.getHotelConvenients([hotelId])

  const unAvailableDate = await hotelDao.getUnAvailableDate(hotelId, month)

  const joinedHotel = {
    ...hotel,
    price: Math.floor(hotel.price),
    images: hotelImages,
    convenients: convenients,
    unAvailableDate: unAvailableDate
  }

  return joinedHotel
}

module.exports = {
  getHotels,
  getHotel
}