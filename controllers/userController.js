const userService = require('../services/userService')
const { catchAsync } = require('../utils/error/handler')
const checkValidation = require('../utils/validation')

const signup = catchAsync(async (req, res) => {
  const { name, email, password, phoneNumber } = req.body

  if (!name || !email || !password) {
    throw new Error('KEY_ERROR')
  }

  await checkValidation.checkValidationEmail(email)
  await checkValidation.checkValidationPassword(password)
  await userService.signup(name, email, password, phoneNumber)

  return res.status(201).json({ message: 'SUCCESS_SIGNUP' })
})

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new Error('KEY_ERROR')
  }

  const accessToken = await userService.login(email, password)
  return res.status(200).json({ accessToken: accessToken })
})

const kakaoLogin = catchAsync(async (req, res) => {
  const kakaoAccessToken = req.headers.authorization
  if (!kakaoAccessToken) {
    throw new Error('INVALID_KAKAO_ACCESS_TOKEN')
  }

  const accessToken = await userService.kakaoLogin(kakaoAccessToken)
  return res.status(200).json({ accessToken: accessToken })
})

module.exports = {
  kakaoLogin,
  login,
  signup,
}
