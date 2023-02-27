const { deepFreeze } = require('../index')

const messages = {
  'invalidPriceRange': {
    statusCode: 400,
    message: '가격 범위가 유효하지 않습니다.'
  }
}

deepFreeze(messages)

module.exports = messages