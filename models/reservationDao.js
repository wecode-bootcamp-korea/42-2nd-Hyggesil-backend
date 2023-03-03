const database = require('./database')

const checkUserByToken = async (userId) => {
  try {
    const [result] = await appDataSource.query(
      `SELECT EXISTS(
        SELECT
          id
        FROM
          users
        WHERE
          id=?
      ) as registed`,
      [userId]
    )
    return !!parseInt(result.registed)
  } catch (err) {
    err.statusCode = 500
    throw err
  }
}

const getPointsByuserId = async (userId) => {
  const [data] = await database.query(
    `
    SELECT
    points
    FROM
    users
    WHERE
    id = ?
    `,
    [userId]
  )
  return parseInt(data.points)
}

const getPriceByHotelId = async (hotelId) => {
  const [data] = await database.query(
    `
    SELECT
    price
    FROM
    hotels
    WHERE
    id = ?
    `,
    [hotelId]
  )
  return parseInt(data.price)
}

const createReservationPayment = async (
  userId,
  hotelId,
  checkIn,
  checkOut,
  totalPrice,
  orderNumber,
  date,
  checkOutMinusOneDay
) => {
  const queryRunner = database.createQueryRunner()
  await queryRunner.connect()
  await queryRunner.startTransaction()
  try {
    const isAvailable = 1
    const selectionRoom = await queryRunner.query(
      `
      SELECT
      r.id,
      r.room_number,
      rs.possibleDate
      FROM rooms r
      INNER JOIN
      (
        SELECT
        room_id,
        JSON_ARRAYAGG
        (
          date
        )
        AS possibleDate
        FROM room_status
        WHERE date
        BETWEEN
        ?
        AND
        ?
        AND
        is_available = ?
        GROUP BY room_id
        )
        AS rs
        ON r.id = rs.room_id
        WHERE
        r.hotel_id = ?
    `,
      [checkIn, checkOut, isAvailable, hotelId]
    )

    let room = []
    for (let i = 0; i < selectionRoom.length; i++) {
      const day = selectionRoom[i].possibleDate.split(',')

      if (date === parseInt(day.length - 1)) {
        room.push(selectionRoom[i].id)
      }
    }

    const roomId = room[Math.floor(Math.random() * room.length)]
    if (!roomId) {
      throw new Error('NON_EXISTENT_ROOM')
    }

    await queryRunner.query(
      `
      INSERT INTO reservations
      (
        uuid,
        user_id,
        room_id,
        check_in,
        check_out,
        total_price
      )
      VALUES
      (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
      )
      `,
      [orderNumber, userId, roomId, checkIn, checkOut, totalPrice]
    )

    await queryRunner.query(
      `
      UPDATE room_status rs
      INNER JOIN
      rooms r
      ON
      rs.room_id = r.id
      SET
      rs.is_available = false
      WHERE rs.date
      BETWEEN
      ?
      AND
      ?
      AND
      rs.room_id = ?
      AND
      r.hotel_id = ?
      `,
      [checkIn, checkOutMinusOneDay, roomId, hotelId]
    )

    await queryRunner.query(
      `
      UPDATE users
      SET
      points = points - ${totalPrice}
      WHERE id = ?
      `,
      [userId]
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
  checkUserByToken,
  getPointsByuserId,
  getPriceByHotelId,
  createReservationPayment,
}
