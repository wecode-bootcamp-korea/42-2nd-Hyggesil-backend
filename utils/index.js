const { CURRENT_YEAR } = require('./constants')

const removeNull = (array) => {
  array = array.filter(arr => arr !== null)
  return array
}

const deepFreeze = (obj) => {
  const propNames = Object.getOwnPropertyNames(obj)

  for (let name of propNames) {
    const value = obj[name]

    if (typeof value == 'object') {
      Object.freeze(value)
    }
  }

  return Object.freeze(obj)
}

const getRandomNumber = (max) => {
  return Math.floor((Math.random() * max) + 1)
}

const getRandomPrice = () => {
  const min = 10
  const max = 100

  const randomNum = Math.floor(Math.random() * (max - min + 1)) * 1000

  return randomNum
}

const getMonthRage = (month) => {
  const nextMonthDays = new Date(CURRENT_YEAR, month + 1, 0).getDate()

  const currentMonth = month.toString().padStart(2, '0')
  const nextMonth = (parseInt(month) + 1).toString().padStart('2', '0')

  const fromDate = CURRENT_YEAR + '-' + currentMonth + '-' + '01'
  const toDate = CURRENT_YEAR + '-' + nextMonth + '-' + nextMonthDays

  return [fromDate, toDate]
}

module.exports = {
  deepFreeze,
  removeNull,
  getRandomNumber,
  getRandomPrice,
  getMonthRage
}