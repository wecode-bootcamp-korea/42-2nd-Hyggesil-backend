require('dotenv').config()
const { HOTEL_AREAS } = require('../utils/constants')
const {
  defaultHotels,
  testHotelProps,
  testHotelConvenients,
} = require('./fixtures/hotelFixture')
const request = require('supertest')
const { createApp } = require('../app')
const database = require('../models/database')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const path = require('path')

describe('Hotel List Test', () => {
  let app

  beforeAll(async () => {
    app = createApp()
    await database.initialize()
    const initdbFile = path.resolve(__dirname, '..', 'initdb.js')
    const initDBcommand = `node ${initdbFile} dbmate=true test`
    await exec(initDBcommand)
  })

  afterAll(async () => {
    await database.destroy()
  })

  test('SUCCESS : 필터 없이 호텔 목록 가져오는 기능', async () => {
    const response = await request(app).get('/hotels')
    const hotels = response.body.hotels

    expect(response.status).toEqual(200)
    expect(hotels).toEqual(defaultHotels)
    testHotelProps(hotels)
  })

  test('SUCCESS : 호텔 목록 페이지 기능', async () => {
    const pages = [1, 2, 3, 4, 5]
    for (let page of pages) {
      const response = await request(app).get('/hotels').query({ page: page })

      const hotels = response.body.hotels

      expect(response.status).toEqual(200)
      testHotelProps(hotels)
    }
  })

  test('SUCCESS : 호텔 가격별 필터 기능', async () => {
    const response = await request(app).get('/hotels').query({
      price_min: 50000,
      price_max: 100000,
    })

    const hotels = response.body.hotels

    expect(hotels).toHaveLength(5)
    expect(response.status).toEqual(200)
    testHotelProps(hotels)

    for (let hotel of hotels) {
      expect(hotel.price).toBeGreaterThanOrEqual(50000)
      expect(hotel.price).toBeLessThanOrEqual(100000)
    }
  })

  test('SUCCESS : 호텔 지역별 필터 기능', async () => {
    const areaId = 1
    const response = await request(app).get('/hotels').query({
      area_id: areaId,
    })

    const hotels = response.body.hotels

    expect(hotels).toHaveLength(5)
    expect(response.status).toEqual(200)
    testHotelProps(hotels)

    for (let hotel of hotels) {
      expect(hotel.areaName).toEqual(HOTEL_AREAS[areaId])
    }
  })

  test('SUCCESS : 호텔 옵션 필터 기능', async () => {
    const response = await request(app).get('/hotels').query({
      bedrooms: 1,
      beds: 2,
      bathrooms: 3,
    })

    const hotels = response.body.hotels

    expect(response.status).toEqual(200)
    testHotelProps(hotels)

    for (let hotel of hotels) {
      expect(hotel.bedrooms).toEqual(1)
      expect(hotel.beds).toEqual(2)
      expect(hotel.bathrooms).toEqual(3)
    }
  })

  test('SUCCESS : 호텔 편의 시설별 필터 기능', async () => {
    const convenients = [1, 2, 3]
    const response = await request(app).get('/hotels').query({
      convenients: convenients,
    })

    const hotels = response.body.hotels

    expect(response.status).toEqual(200)

    for (let hotel of hotels) {
      testHotelConvenients(hotel, convenients)
    }
  })

  test('SUCCESS : 모든 필터 적용한 호텔 목록 불러오기', async () => {
    const priceMin = 10000
    const priceMax = 150000
    const bedrooms = 1
    const beds = 1
    const bathrooms = 1
    const convenients = [1, 2]
    const areaId = 1
    let page = 1

    const response = await request(app).get('/hotels').query({
      price_min: priceMin,
      price_max: priceMax,
      bedrooms: bedrooms,
      beds: beds,
      bathrooms: bathrooms,
      convenients: convenients,
      area_id: areaId,
      page: page,
    })

    const hotels = response.body.hotels

    expect(response.status).toEqual(200)
    testHotelProps(hotels)

    for (let hotel of hotels) {
      expect(hotel.price).toBeGreaterThanOrEqual(priceMin)
      expect(hotel.price).toBeLessThanOrEqual(priceMax)
      expect(hotel.bedrooms).toEqual(bedrooms)
      expect(hotel.beds).toEqual(beds)
      expect(hotel.bathrooms).toEqual(bathrooms)
      expect(hotel.areaName).toEqual(HOTEL_AREAS[areaId])
      testHotelConvenients(hotel, convenients)
    }
  })
})
