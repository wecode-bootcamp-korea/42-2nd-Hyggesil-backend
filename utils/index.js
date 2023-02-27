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

module.exports = {
  deepFreeze,
  removeNull
}