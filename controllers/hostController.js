const hostService = require('../services/hostService')
const { catchAsync } = require('../utils/error/handler')

const hostingInfo = catchAsync(async (req, res) => {
  const {
    name,
    address,
    latitude,
    longitude,
    price,
    guestMax,
    bedrooms,
    beds,
    bathrooms,
    areaId,
    convenients,
  } = req.body

  const images = req.files

  if (
    !name ||
    !address ||
    !latitude ||
    !longitude ||
    !price ||
    !guestMax ||
    !bedrooms ||
    !beds ||
    !bathrooms ||
    !areaId ||
    !convenients
  ) {
    throw new Error('KEY_ERROR')
  }

  if (!images.length) {
    throw new Error('NON_EXISTENT_IMAGES')
  }

  const userId = req.user

  await hostService.hostingInfo(
    userId,
    name,
    address,
    latitude,
    longitude,
    price,
    guestMax,
    bedrooms,
    beds,
    bathrooms,
    areaId,
    convenients,
    images
  )
  return res.status(201).json({ message: 'SUCCESSFUL_REGISTRATION' })
})

module.exports = {
  hostingInfo,
}
