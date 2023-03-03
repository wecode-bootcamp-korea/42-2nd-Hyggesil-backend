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
    this.convenients = filters.convenients
  }

  joinBuilder() {
    this.columns.push('ha.name areaName')
    this.columns.push('JSON_ARRAYAGG(c.name) convenients')

    const joinTables = [
      'INNER JOIN hotel_areas ha ON h.area_id = ha.id',
      'INNER JOIN hotel_convenient hc ON hc.hotel_id = h.id',
      `INNER JOIN (SELECT id, name FROM convenients WHERE id IN (${this.convenients.join(
        ','
      )}) ) c ON hc.convenient_id = c.id`,
    ]

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

    for (let option of this.optionsBuilder()) {
      where.push(option)
    }

    return where.length ? `WHERE ${where.join(' AND ')}` : ''
  }

  groupBuilder() {
    return `GROUP BY h.id`
  }

  havingBuilder() {
    return this.convenients
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
      this.offsetBuilder(),
    ]

    const rawQuery = rawQueries.join(' ') + ';'

    return rawQuery
  }
}

module.exports = HotelsQueryBuilder
