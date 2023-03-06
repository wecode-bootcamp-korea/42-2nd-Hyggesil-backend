const QueryBuilder = require('../classes/QueryBuilder')

class HotelConvenientsQueryBuilder extends QueryBuilder {
  constructor(tableName, columns, hotelIds) {
    super(tableName, columns)
    this.hotelIds = hotelIds
  }

  joinBuilder() {
    this.columns.push(`JSON_ARRAYAGG(c.name) convenients`)

    const joinTables = [
      'INNER JOIN convenients c ON hc.convenient_id = c.id'
    ]

    return joinTables.join(',')
  }

  selectBuilder() {
    const joinTables = this.joinBuilder()

    const rawQuery = `
    SELECT ${this.columns.join(',')}
    FROM ${this.tableName}
    ${joinTables}`

    return rawQuery
  }

  whereBuilder() {
    if (typeof this.hotelIds == 'string') {
      return `WHERE hc.hotel_id IN (${this.hotelIds})`
    }

    if (!this.hotelIds.length) {
      return ``
    }

    return `WHERE hc.hotel_id IN (${this.hotelIds.join(',')})`
  }

  groupByBuilder() {
    return `GROUP BY hc.hotel_id`
  }

  orderByBuilder() {
    return `ORDER BY hotel_id ASC`
  }

  build() {
    const rawQueries = [
      this.selectBuilder(),
      this.whereBuilder(),
      this.groupByBuilder(),
      this.orderByBuilder()
    ]

    const rawQuery = rawQueries.join(' ') + ';'

    return rawQuery
  }
}

module.exports = HotelConvenientsQueryBuilder