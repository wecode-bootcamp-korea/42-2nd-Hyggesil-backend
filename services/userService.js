const axios = require('axios')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userDao = require('../models/userDao')

const secretKey = process.env.SECRET_KEY

const createToken = async (userInfo) => {
  const time = new Date().getTime() / 1000 + 60 * 60 * 9
  const currentTime = Math.floor(time)
  const expireTime = currentTime + 60 * 60 * 24

  const payload = {
    userId: userInfo,
    iss: 'Hyggesil',
    iat: currentTime,
    exp: expireTime,
  }
  return jwt.sign(payload, secretKey)
}

const signup = async (name, email, password, phoneNumber) => {
  const checkUserByEmail = await userDao.checkUserByEmail(email)
  if (checkUserByEmail) {
    throw new Error('ALREADY_EXIST_USER')
  }

  if (phoneNumber) {
    const checkUserByPhoneNumber = await userDao.checkUserByPhoneNumber(
      phoneNumber
    )
    if (checkUserByPhoneNumber) {
      throw new Error('ALREADY_EXIST_PHONE_NUMBER')
    }
  }

  const hasedPassword = await bcrypt.hash(password, 12)
  return await userDao.createUser(name, email, hasedPassword, phoneNumber)
}

const login = async (email, password) => {
  const userInfo = await userDao.getPasswordByEmail(email)
  if (!userInfo) {
    throw new Error('WRONG_EMAIL')
  }

  const hasedPassword = userInfo.password
  const checkHash = await bcrypt.compare(password, hasedPassword)
  if (!checkHash) {
    throw new Error('WRONG_PASSWORD')
  }

  const userId = await userDao.getUserId(email)
  const accessToken = createToken(userId)

  return accessToken
}

const kakaoLogin = async (kakaoAccessToken) => {
  const kakaoUserInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: {
      Authorization: `Bearer ${kakaoAccessToken}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  })

  const kakaoToken = kakaoUserInfo.data
  const kakaoId = kakaoToken.id
  const userName = kakaoToken.kakao_account.profile.nickname
  const userEmail = kakaoToken.kakao_account.email

  const checkUserByKakaoId = await userDao.checkUserByKakaoId(kakaoId)

  if (!checkUserByKakaoId) {
    const checkcUserEmailByKakaoId = await userDao.checkUserByEmail(userEmail)
    if (checkcUserEmailByKakaoId) {
      throw new Error('ALREADY_EXIST_EMAIL')
    }

    await userDao.createKakaoUser(kakaoId, userName, userEmail)
  }

  const userId = await userDao.getUserId(kakaoId)
  const accessToken = createToken(userId)

  return accessToken
}

module.exports = {
  signup,
  login,
  kakaoLogin,
}
