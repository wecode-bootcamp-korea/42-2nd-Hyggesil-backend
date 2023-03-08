const database = require('../models/database')
const { MONTH, CURRENT_YEAR } = require('../utils/constants')

const createHostHotel = async (
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
) => {
  const queryRunner = database.createQueryRunner()
  await queryRunner.connect()
  await queryRunner.startTransaction()
  try {
    const createHotel = await queryRunner.query(
      `
        INSERT INTO hotels
        (
          name,
          address,
          latitude,
          longitude,
          price,
          guest_max,
          bedrooms,
          beds,
          bathrooms,
          user_id,
          area_id
        )
        VALUES
        (
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?
        )
        `,
      [
        name,
        address,
        latitude,
        longitude,
        price,
        guestMax,
        bedrooms,
        beds,
        bathrooms,
        userId,
        areaId,
      ]
    )

    const hotelId = createHotel.insertId
    const urlArr = []

    for (let i = 0; i < imageUrl.length; i++) {
      const url = imageUrl[i]
      const urlData = []
      urlData.push(hotelId, url)
      urlArr.push(urlData)
    }

    await queryRunner.query(
      `
      INSERT INTO hotel_images
      (
        hotel_id,
        url
      )
      VALUES ?
      `,
      [urlArr]
    )

    const convenientId = []

    for (let i = 0; i < convenientsArr.length; i++) {
      const convenient = convenientsArr[i]
      const convenientData = []
      convenientData.push(hotelId, convenient)
      convenientId.push(convenientData)
    }

    await queryRunner.query(
      `
    INSERT INTO hotel_convenient
    (
    hotel_id,
    convenient_id
    )
    VALUES ?
    `,
      [convenientId]
    )

    const isAvailable = true

    await queryRunner.query(
      `
      UPDATE
      users
      SET
      is_host = ?
      WHERE
      id = ?
      `,
      [isAvailable, userId]
    )

    const roomId = []
    const roomNumber = []

    for (let i = 1; i <= 5; i++) {
      const roomNumberData = 100 + i
      const roomNumberArr = []
      roomNumberArr.push(hotelId, roomNumberData)
      roomNumber.push(roomNumberArr)
    }

    const data = await queryRunner.query(
      `
      INSERT INTO rooms
      (
        hotel_id,
        room_number
      )
      VALUES ?
      `,
      [roomNumber]
    )
    roomId.push(data.insertId)

    const values = []

    for (let month of MONTH) {
      const days = new Date(CURRENT_YEAR, month, 0).getDate()

      for (let day = 1; day <= days; day++) {
        if (day < 10) day = '0' + day
        const date = CURRENT_YEAR + '-' + month + '-' + day
        values.push(date)
      }
    }

    const result = []
    const resultArr = []

    for (let j = 0; j < values.length; j++) {
      const date = values[j]
      const roomNumber = roomId[0]
      const isAvailable = 1
      resultArr.push([roomNumber, date, isAvailable])
    }

    result.push(resultArr)

    await queryRunner.query(
      `
      INSERT INTO room_status
      (
        room_id,
        date,
        is_available
      )
      VALUES ?
      `,
      result
    )
    await queryRunner.commitTransaction()
  } catch (err) {
    await queryRunner.rollbackTransaction()
    throw err
  } finally {
    await queryRunner.release()
  }
}

module.exports = {
  createHostHotel,
}
