const { HOTEL_AREAS } = require('../utils/constants')
const QueryBuilder = require('./QueryBuilder')

class HotelsQueryBuilder extends QueryBuilder {
  constructor(tableName, columns, filters) {
    super(tableName, columns)
    this.offset = filters.offset
    this.limit = filters.limit
    this.priceMin = filters.priceMin
    this.priceMax = filters.priceMax
    this.areaId = filters.areaId
    this.bedrooms = filters.bedrooms
    this.beds = filters.beds
    this.bathrooms = filters.bathrooms
    this.guestMax = filters.guestMax
    this.convenients = filters.convenients
    this.seaerch = filters.search
    this.checkin = filters.checkin
    this.checkout = filters.checkout
  }

  joinBuilder() {
    this.columns.push('ha.name areaName')

    const joinTables = [
      'INNER JOIN hotel_areas ha ON h.area_id = ha.id',
      'INNER JOIN hotel_convenient hc ON hc.hotel_id = h.id',
    ]

    if (this.convenients.length) {
      this.columns.push('JSON_ARRAYAGG(c.name) convenients')

      joinTables.push(
        `INNER JOIN (SELECT id, name FROM convenients WHERE id IN (${this.convenients.join(',')}) ) c ON hc.convenient_id = c.id`
      )
    }

    if (this.checkin && this.checkout) {
      const availableDateTable = `
      INNER JOIN
        (SELECT DISTINCT r.hotel_id, rs.availableDate FROM rooms r
        INNER JOIN
          (SELECT
          room_id, JSON_ARRAYAGG(date) availableDate
          FROM room_status rs
          WHERE date
          BETWEEN "${this.checkin}" AND "${this.checkout}" AND is_available = true
          GROUP BY rs.room_id
          HAVING JSON_LENGTH(JSON_EXTRACT(availableDate, "$")) = DATEDIFF("${this.checkout}", "${this.checkin}") + 1)
        AS rs ON r.id = rs.room_id)
      AS AD
      ON h.id = ad.hotel_id`

      joinTables.push(availableDateTable)
    }

    return joinTables.join(' ')
  }

  selectBuilder() {
    const joinedTables = this.joinBuilder()

    const rawQuery = `
      SELECT ${this.columns.join(',')}
      FROM ${this.tableName}
      ${joinedTables}`

    return rawQuery
  }

  priceBuilder() {
    if (this.priceMin && this.priceMax) {
      if (parseInt(this.priceMin) > parseInt(this.priceMax)) {
        throw new Error('INVALID_PRICE_RANGE')
      }

      return `h.price BETWEEN ${this.priceMin} AND ${this.priceMax}`
    }

    return ''
  }

  areaBuilder() {
    return this.areaId ? `ha.name = '${HOTEL_AREAS[this.areaId]}'` : ''
  }

  optionsBuilder() {
    const options = []

    this.bedrooms ? options.push(`h.bedrooms = ${this.bedrooms}`) : ''
    this.beds ? options.push(`h.beds = ${this.beds}`) : ''
    this.bathrooms ? options.push(`h.bathrooms = ${this.bathrooms}`) : ''

    return options
  }

  convenientsBuilder() {
    const convenients = []

    this.convenients ? convenients.push() : ''

    return ''
  }

  whereBuilder() {
    const where = []

    this.priceBuilder() ? where.push(this.priceBuilder()) : ''
    this.areaBuilder() ? where.push(this.areaBuilder()) : ''
    this.guestMax ? where.push(`h.guest_max = ${this.guestMax}`) : ''

    for (let option of this.optionsBuilder()) {
      where.push(option)
    }

    return where.length ? `WHERE ${where.join(' AND ')}` : ''
  }

  groupBuilder() {
    return `GROUP BY h.id`
  }

  havingBuilder() {
    return this.convenients.length
      ? `HAVING JSON_LENGTH(JSON_EXTRACT(convenients, "$")) = ${this.convenients.length}`
      : ''
  }

  orderBuilder() {
    return `ORDER BY h.id ASC`
  }

  limitBuilder() {
    return `LIMIT ${this.limit}`
  }

  offsetBuilder() {
    return `OFFSET ${this.offset}`
  }

  build() {
    const rawQueries = [
      this.selectBuilder(),
      this.whereBuilder(),
      this.groupBuilder(),
      this.havingBuilder(),
      this.orderBuilder(),
      this.limitBuilder(),
      this.offsetBuilder()
    ]

    const rawQuery = rawQueries.join(' ') + ';'

    return rawQuery
  }
}

module.exports = HotelsQueryBuilder
