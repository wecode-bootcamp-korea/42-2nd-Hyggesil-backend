const { CONVENIENTS, HOTEL_AREAS } = require('../../utils/constants')
const { getRandomNumber, getRandomPrice } = require('../../utils')

const testHotelProps = (hotels) => {
  for (let hotel of hotels) {
    expect(hotel).toHaveProperty('coordinate')
    expect(hotel.images).toHaveLength(5)
  }
}

const testHotelConvenients = (hotel, convenients) => {
  for (let convenient of convenients) {
    expect(hotel.convenients).toContain(CONVENIENTS[convenient])
  }
}

class HotelFixture {
  constructor(database) {
    this.database = database
  }

  async createUser() {
    const rawQuery = `
    INSERT INTO users
    (name, email, password, phone_number)
    VALUES
    ('testUserName', 'testemail@gmail.com', '1234', '010-1234-1234');`

    return this.database.query(rawQuery)
  }

  async createHotelAreas() {
    for (let [id, area] of Object.entries(HOTEL_AREAS)) {
      const rawQuery = `
      INSERT INTO hotel_areas
      (id, name)
      VALUES
      (${id}, '${area}')
      ;`

      await this.database.query(rawQuery)
    }

    return
  }

  async createConvenients() {
    for (let [id, convenient] of Object.entries(CONVENIENTS)) {
      const rawQuery = `
      INSERT INTO convenients
      (id, name)
      VALUES
      (${id}, '${convenient}')
      ;`

      await this.database.query(rawQuery)
    }

    return
  }

  async createHotelImages() {
    for (let hotelId = 1; hotelId <= 25; hotelId++) {

      for (let imageName = 1; imageName <= 5; imageName++) {
        const rawQuery = `
        INSERT INTO hotel_images
        (hotel_id, url)
        VALUES
        (${hotelId}, 'http://127.0.0.1/hotels/${hotelId}/${imageName}.jpg');`

        await this.database.query(rawQuery)
      }
    }

    return
  }

  async createHotels() {
    for (let i = 1; i <= 25; i++) {
      const rawQuery = `
      INSERT INTO hotels
      (name, address, latitude, longitude, price, user_id, area_id)
      VALUES
      (
        'testName ${i}',
      'testAddress ${i}',
      '127.048548771160820',
      '37.505260589297310',
      ${getRandomPrice()},
      1,
      ${getRandomNumber(4)})
      ;`

      await this.database.query(rawQuery)
    }

    return
  }

  async createHotelConvenient() {
    for (let hotelId = 1; hotelId <= 25; hotelId++) {

      for (let convenientId = 1; convenientId <= 5; convenientId++) {
        const rawQuery = `
        INSERT INTO hotel_convenient
        (hotel_id,convenient_id)
        VALUES
        (${hotelId},${convenientId});`

        await this.database.query(rawQuery)
      }
    }

    return
  }

  async initialize() {
    await this.createUser()
    await this.createConvenients()
    await this.createHotelAreas()
    await this.createHotels()
    await this.createHotelImages()
    await this.createHotelConvenient()

    return
  }

  async truncateTables() {
    const tables = [
      'users',
      'convenients',
      'hotel_areas',
      'hotels',
      'hotel_images',
      'hotel_convenient'
    ]

    await this.database.query(`SET FOREIGN_KEY_CHECKS = 0;`)
    for (let table of tables) {
      const rawQuery = `TRUNCATE ${table};`
      await this.database.query(rawQuery)
    }
    await this.database.query(`SET FOREIGN_KEY_CHECKS = 1;`)
  }

}

module.exports = {
  testHotelProps,
  testHotelConvenients,
  HotelFixture
}