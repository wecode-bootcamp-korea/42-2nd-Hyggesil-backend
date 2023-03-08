const { catchAsync } = require('../utils/error/handler')
const { DEFAULT_PAGE, DEFAULT_LIMIT } = require('../utils/constants')
const hotelService = require('../services/hotelService')

const getHotels = catchAsync(async (req, res) => {
  const filters = setFilters(req)

  const hotels = await hotelService.getHotels(filters)

  return res.status(200).json({ hotels: hotels })
})

const getHotel = catchAsync(async (req, res) => {
  const { hotelId } = req.params
  const { month = getCurrentMonth() } = req.query

  const hotel = await hotelService.getHotel(hotelId, month)

  return res.status(200).json({ hotel: hotel })
})

const getCurrentMonth = () => {
  return new Date().getMonth() + 1
}

const setFilters = (req) => {
  let [offset, limit] = getOffsetAndLimit(req.query)

  const queryParams = [
    'area_id',
    'price_min',
    'price_max',
    'bedrooms',
    'beds',
    'bathrooms',
    'search',
    'checkin',
    'checkout',
    'convenients',
    'guestMax'
  ]

  const filters = {
    offset: offset,
    limit: limit,
    convenients: []
  }

  for (let [key, value] of Object.entries(req.query)) {
    if (!queryParams.includes(key) || !value) continue
    switch (key) {
      case 'convenients':
        Array.isArray(value) ? filters.convenients = value : filters.convenients.push(value)
        break

      default:
        filters[key] = value
    }
  }

  return filters
}

const getOffsetAndLimit = (query) => {
  let { page, limit } = query

  page = parseInt(page)
  limit = parseInt(limit)

  if (!page) page = DEFAULT_PAGE
  if (!limit) limit = DEFAULT_LIMIT

  const offset = (page - 1) * limit

  return [offset, limit]
}

module.exports = {
  getHotels,
  getHotel
}