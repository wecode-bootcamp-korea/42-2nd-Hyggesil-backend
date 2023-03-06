const { CURRENT_YEAR } = require('../utils/constants')
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

  const hotelImages = await database.query(rawQuery, hotelIds)

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

const getHotel = async (hotelId) => {
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
  const rawQuery = `
  SELECT
    ${columns.join(',')}
  FROM hotels h
  WHERE h.id = ?
  ORDER BY h.id;`

  const [hotel] = await database.query(rawQuery, hotelId)

  return hotel
}

const getUnAvailableDate = async (hotelId, month) => {
  const isAvailable = false

  const rawQuery =
    `
    SELECT
      DISTINCT rs.unAvailableDate
    FROM rooms r
    INNER JOIN
      (
        SELECT
          room_id,
          JSON_ARRAYAGG(date) as unAvailableDate
        FROM room_status
        WHERE is_available = ?
        GROUP BY room_id
      ) AS rs
    ON r.id = rs.room_id WHERE r.hotel_id = ?;`

  const [{ unAvailableDate }] = await database.query(
    rawQuery,
    [isAvailable, hotelId])

  if (!unAvailableDate) return []

  return unAvailableDate
}

module.exports = {
  getHotels,
  getHotel,
  getHotelImages,
  getHotelConvenients,
  getUnAvailableDate
}