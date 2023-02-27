const QueryBuilder = require('./QueryBuilder')

class HotelImagesQueryBuilder extends QueryBuilder {
  constructor(tableName, columns, hotelIds) {
    super(tableName, columns)
    this.hotelIds = hotelIds
  }

  joinBuilder() {
    this.columns.push("JSON_ARRAYAGG(hi.url) images")

    const joinTables = [
      "INNER JOIN hotel_images hi ON h.id = hi.hotel_id"
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

  whereBuilder() {
    return `WHERE h.id IN (${Array(this.hotelIds.length).fill('?')})`
  }

  groupBuilder() {
    return `GROUP BY h.id`
  }

  orderBuilder() {
    return `ORDER BY h.id ASC`
  }

  build() {
    const rawQueries = [
      this.selectBuilder(),
      this.whereBuilder(),
      this.groupBuilder(),
      this.orderBuilder()
    ]

    const rawQuery = rawQueries.join(' ') + ';'

    return rawQuery
  }
}

module.exports = HotelImagesQueryBuilder