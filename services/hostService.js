const hostDao = require('../models/hostDao')
const S3Uploader = require('../classes/S3Uploader')

const hostingInfo = async (
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
) => {
  const uploader = new S3Uploader()

  const imageUrl = []
  for (let i = 0; i < images.length; i++) {
    const url = await uploader.upload(images[i].buffer)
    imageUrl.push(url)
  }

  const convenientsArr = convenients.split(',')

  return await hostDao.createHostHotel(
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
    imageUrl,
    areaId,
    convenientsArr
  )
}

module.exports = {
  hostingInfo,
}
