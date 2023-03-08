const { deepFreeze } = require('../index')

const messages = {
  INVALID_PRICE_RANGE: {
    statusCode: 400,
    message: '가격 범위가 유효하지 않습니다.',
  },

  KEY_ERROR: {
    statusCode: 400,
    message: '입력한 값이 올바르지 않습니다.',
  },

  INVALID_PASSWORD: {
    statusCode: 400,
    message: '비밀번호를 올바르게 입력해 주세요.',
  },

  ALREADY_EXIST_USER: {
    statusCode: 400,
    message: '등록된 사용자입니다.',
  },

  ALREADY_EXIST_EMAIL: {
    statusCode: 400,
    message: '등록된 이메일입니다.',
  },

  WRONG_EMAIL: {
    statusCode: 400,
    message: '잘못된 이메일입니다.',
  },

  WRONG_PASSWORD: {
    statusCode: 400,
    message: '잘못된 비밀번호입니다.',
  },

  INVALID_KAKAO_ACCESS_TOKEN: {
    statusCode: 400,
    message: '유효하지 않는 토큰입니다.',
  },

  ALREADY_EXIST_PHONE_NUMBER: {
    statusCode: 400,
    message: '등록된 번호입니다.',
  },

  TOTALPRICE_EXCEEDED_POINTS: {
    statusCode: 400,
    message: '결제 금액이 보유 포인트를 초과했습니다.',
  },

  THE_TOTAL_PRICES_DO_NOT_MATCH: {
    statusCode: 400,
    message: '결제 금액이 일치하지 않습니다.',
  },

  NON_EXISTENT_ROOM: {
    statusCode: 400,
    message: '빈 객실이 없습니다.',
  },

  NON_EXISTENT_IMAGES: {
    statusCode: 400,
    message: '이미지 파일이 없습니다.',
  },

  FAILED_TO_UPLOAD: {
    statusCode: 400,
    message: '파일 업로드에 실패하였습니다.',
  },
}

deepFreeze(messages)

module.exports = messages
