const database = require('../../models/database')
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY

const createToken = async () => {
  const time = new Date().getTime() / 1000 + 60 * 60 * 9
  const currentTime = Math.floor(time)
  const expireTime = currentTime + 60 * 60 * 24

  const payload = {
    userId: 3,
    iss: 'Hyggesil',
    iat: currentTime,
    exp: expireTime,
  }
  return jwt.sign(payload, secretKey)
}

const createUser = async () => {
  await database.query(
    `
    INSERT INTO
    users
    (
      id,
      name,
      email,
      password,
      phone_number
      )
      VALUES (
        ?,
        ?,
        ?,
        ?,
        ?
      )
    ;`,
    [3, 'testName', 'fffrd92@gmail.com', 'test!57password', '010-1234-4434']
  )
}

const createHotelArea = async () => {
  await database.query(
    `
    INSERT INTO
    hotel_areas
    (name)
    VALUES
    (?)
    `,
    ['강남']
  )
}

const createHotel = async () => {
  await database.query(
    `
    INSERT INTO
    hotels
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
      thumbnail_url,
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
      ?,
      ?
    )
    `,
    [
      'testHotel',
      'testAddrss',
      '45678',
      '65678',
      100000,
      2,
      1,
      2,
      2,
      'testurl',
      3,
      1,
    ]
  )
}

const createRooms = async () => {
  for (let i = 1; i < 6; i++) {
    const roomNumber = 100 + i
    await database.query(
      `
      INSERT INTO
      rooms
      (
        hotel_id,
        room_number
      )
      VALUES
      (
        ?,
        ?
      )
      `,
      [1, roomNumber]
    )
  }
}

const createRoomStatus = async () => {
  for (let i = 1; i < 6; i++) {
    const id = i
    for (let j = 0; j < 21; j++) {
      const day = new Date('2023-03-01')
      const date = new Date(day.setDate(day.getDate() + j))
      await database.query(
        `
        INSERT INTO
        room_status
          (
            room_id,
            date,
            is_available
          )
          VALUES
          (
            ?,
            ?,
            ?
          )
        `,
        [id, date, false]
      )
    }
  }
}

const updateAvailableRoom = async () => {
  await database.query(
    `
        UPDATE
        room_status
        SET
        is_available = ?
        WHERE date 
        BETWEEN 
        "2023-03-01" 
        AND 
        "2023-03-05"
        `,
    [true]
  )
}

module.exports = {
  createToken,
  createUser,
  createHotelArea,
  createHotel,
  createRooms,
  createRoomStatus,
  updateAvailableRoom,
}
