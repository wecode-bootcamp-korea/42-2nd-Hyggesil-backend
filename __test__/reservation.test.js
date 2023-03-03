const request = require('supertest')
const { createApp } = require('../app')
const reservationFixture = require('./fixtures/reservationFixture')
const database = require('../models/database')

describe('Reservation', () => {
  let app
  let token = reservationFixture.createToken()

  beforeAll(async () => {
    app = createApp()
    await database.initialize()

    await reservationFixture.createUser()
    await reservationFixture.createHotelArea()
    await reservationFixture.createHotel()
    await reservationFixture.createRooms()
    await reservationFixture.createRoomStatus()
    await reservationFixture.updateAvailableRoom()
  })

  afterAll(async () => {
    await database.query(`SET FOREIGN_KEY_CHECKS = 0;`)
    await database.query(`TRUNCATE users;`)
    await database.query(`TRUNCATE hotel_areas;`)
    await database.query(`TRUNCATE hotels;`)
    await database.query(`TRUNCATE rooms;`)
    await database.query(`TRUNCATE room_status;`)
    await database.query(`SET FOREIGN_KEY_CHECKS = 1;`)
    await database.destroy()
  })

  test('FAILED: total price excceed points', async () => {
    await request(app)
      .post('/reservations/payment')
      .set({
        Authorization: await token,
      })
      .send({
        hotelId: 1,
        checkIn: '2023-03-01',
        checkOut: '2023-03-03',
        totalPrice: 120000000,
      })
      .expect(400)
      .expect({ message: '결제 금액이 보유 포인트를 초과했습니다.' })
  })

  test('FAILED: total price do not match', async () => {
    await request(app)
      .post('/reservations/payment')
      .set({
        Authorization: await token,
      })
      .send({
        hotelId: 1,
        checkIn: '2023-03-01',
        checkOut: '2023-03-03',
        totalPrice: 1000700,
      })
      .expect(400)
      .expect({ message: '결제 금액이 일치하지 않습니다.' })
  })

  test('FAILED: nonexistent room', async () => {
    await request(app)
      .post('/reservations/payment')
      .set({
        Authorization: await token,
      })
      .send({
        hotelId: 1,
        checkIn: '2023-03-05',
        checkOut: '2023-03-07',
        totalPrice: 200000,
      })
      .expect(400)
      .expect({ message: '빈 객실이 없습니다.' })
  })

  test('SUCCESS: complete payment', async () => {
    await request(app)
      .post('/reservations/payment')
      .set({
        Authorization: await token,
      })
      .send({
        hotelId: 1,
        checkIn: '2023-03-01',
        checkOut: '2023-03-03',
        totalPrice: 200000,
      })
      .expect(201)
      .expect({ message: 'COMPLETE_PAYMENT' })
  })
})
