const MONTH = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
]

const CURRENT_YEAR = '2023'
const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 5

const HOTEL_AREAS = {
  1: '강동구',
  2: '강서구',
  3: '강남구',
  4: '강북구',
}

const CONVENIENTS = {
  1: '주방',
  2: '무선 인터넷',
  3: '업무 전용 공간',
  4: '건물 내 무료 주차',
  5: 'TV',
}

Object.freeze(HOTEL_AREAS)
Object.freeze(CONVENIENTS)

module.exports = {
  MONTH,
  DEFAULT_PAGE,
  DEFAULT_LIMIT,
  HOTEL_AREAS,
  CONVENIENTS,
  CURRENT_YEAR,
}
