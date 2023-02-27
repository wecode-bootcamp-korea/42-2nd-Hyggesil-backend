const { catchAsync } = require('../utils/error/handler')
const { DEFAULT_PAGE, DEFAULT_LIMIT } = require('../utils/constants')
const hotelService = require('../services/hotelService')

const getHotels = catchAsync(async (req, res) => {
  const filters = setFilters(req)

  const hotels = await hotelService.getHotels(filters)

  return res.status(200).json({ hotels: hotels })
})

const setFilters = (req) => {
  let [offset, limit] = getOffsetAndLimit(req.query)

  const {
    area_id,
    price_min,
    price_max,
    bedrooms,
    beds,
    bathrooms,
    convenients = []
  } = req.query

  const filters = {
    offset: offset,
    limit: limit,
    convenients: []
  }

  if (area_id) filters.areaId = area_id
  if (price_min) filters.priceMin = price_min
  if (price_max) filters.priceMax = price_max
  if (bedrooms) filters.bedrooms = bedrooms
  if (beds) filters.beds = beds
  if (bathrooms) filters.bathrooms = bathrooms
  if (convenients) filters.convenients.push(...convenients)

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
  getHotels
}