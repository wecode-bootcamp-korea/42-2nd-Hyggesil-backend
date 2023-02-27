const database = require('./database')
const HotelsQueryBuilder = require('../classes/HotelsQueryBuilder')
const HotelImagesQueryBuilder = require('../classes/HotelImagesQueryBuilder')
const HotelConvenientsQueryBuilder = require('../classes/HotelConvenientsQueryBuilder')

const getHotels = async (filters) => {
  const tableName = 'hotels h'
  const columns = [
    'h.id',
    'h.name',
    'h.address',
    'JSON_OBJECT("lat", h.latitude, "lng", h.longitude) coordinate',
    'h.price',
    'h.guest_max guestMax',
    'h.bedrooms',
    'h.beds',
    'h.bathrooms',
    'h.thumbnail_url thumbnailUrl',
    'h.user_id',
    'h.area_id'
  ]

  const hotelsQueryBuilder = new HotelsQueryBuilder(
    tableName, columns, filters
  )

  const rawQuery = hotelsQueryBuilder.build()

  const hotels = await database.query(rawQuery)

  return hotels
}

const getHotelImages = async (hotelIds) => {
  const tableName = 'hotels h'
  const columns = [
    'h.id',
    'h.name'
  ]

  const hotelImagesQueryBuilder = new HotelImagesQueryBuilder(
    tableName, columns, hotelIds
  )

  const rawQuery = hotelImagesQueryBuilder.build()

  const hotelImages = database.query(rawQuery, hotelIds)

  return hotelImages
}

const getHotelConvenients = async (hotelIds) => {
  const tableName = 'hotel_convenient hc'
  const columns = [
    'hc.hotel_id'
  ]

  const hotelConvenientsQueryBuilder = new HotelConvenientsQueryBuilder(
    tableName, columns, hotelIds
  )

  const rawQuery = hotelConvenientsQueryBuilder.build()

  const convenients = await database.query(rawQuery)

  return convenients
}

module.exports = {
  getHotels,
  getHotelImages,
  getHotelConvenients
}