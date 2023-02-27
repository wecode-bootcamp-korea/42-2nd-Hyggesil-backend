const { CONVENIENTS } = require('../../utils/constants')

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

const defaultHotels = [
  {
    id: 1,
    name: '그랜드 인터컨티넨탈 서울 팔래스',
    address: '서울 강남구 테헤란로 427 위워크',
    coordinate: { lat: 127.04854877116082, lng: 37.50526058929731 },
    price: 10000,
    guestMax: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    thumbnailUrl: 'http://localhost/image.jpg',
    user_id: 1,
    area_id: 1,
    areaName: '강동구',
    convenients: ['주방', '무선 인터넷', '업무 전용 공간', '건물 내 무료 주차', 'TV'],
    images: [
      'http://localhost/1.jpg',
      'http://localhost/2.jpg',
      'http://localhost/3.jpg',
      'http://localhost/4.jpg',
      'http://localhost/5.jpg'
    ]
  },
  {
    id: 2,
    name: '신라스테이 역삼',
    address: '서울 강남구 테헤란로 427 위워크',
    coordinate: { lat: 127.04854877116082, lng: 37.50526058929731 },
    price: 20000,
    guestMax: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    thumbnailUrl: 'http://localhost/image.jpg',
    user_id: 1,
    area_id: 1,
    areaName: '강동구',
    convenients: ['주방', '무선 인터넷', '업무 전용 공간', '건물 내 무료 주차'],
    images: [
      'http://localhost/1.jpg',
      'http://localhost/2.jpg',
      'http://localhost/3.jpg',
      'http://localhost/4.jpg',
      'http://localhost/5.jpg'
    ]
  },
  {
    id: 3,
    name: '롯데호텔 서울',
    address: '서울 강남구 테헤란로 427 위워크',
    coordinate: { lat: 127.04854877116082, lng: 37.50526058929731 },
    price: 30000,
    guestMax: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    thumbnailUrl: 'http://localhost/image.jpg',
    user_id: 1,
    area_id: 1,
    areaName: '강동구',
    convenients: ['주방', '무선 인터넷', '업무 전용 공간'],
    images: [
      'http://localhost/1.jpg',
      'http://localhost/2.jpg',
      'http://localhost/3.jpg',
      'http://localhost/4.jpg',
      'http://localhost/5.jpg'
    ]
  },
  {
    id: 4,
    name: 'JW 메리어트 호텔 서울',
    address: '서울 강남구 테헤란로 427 위워크',
    coordinate: { lat: 127.04854877116082, lng: 37.50526058929731 },
    price: 40000,
    guestMax: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    thumbnailUrl: 'http://localhost/image.jpg',
    user_id: 1,
    area_id: 1,
    areaName: '강동구',
    convenients: ['주방', '무선 인터넷'],
    images: [
      'http://localhost/1.jpg',
      'http://localhost/2.jpg',
      'http://localhost/3.jpg',
      'http://localhost/4.jpg',
      'http://localhost/5.jpg'
    ]
  },
  {
    id: 5,
    name: '프레지던트 호텔',
    address: '서울 강남구 테헤란로 427 위워크',
    coordinate: { lat: 127.04854877116082, lng: 37.50526058929731 },
    price: 50000,
    guestMax: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    thumbnailUrl: 'http://localhost/image.jpg',
    user_id: 1,
    area_id: 1,
    areaName: '강동구',
    convenients: ['주방'],
    images: [
      'http://localhost/1.jpg',
      'http://localhost/2.jpg',
      'http://localhost/3.jpg',
      'http://localhost/4.jpg',
      'http://localhost/5.jpg'
    ]
  }
]

module.exports = {
  defaultHotels,
  testHotelProps,
  testHotelConvenients
}