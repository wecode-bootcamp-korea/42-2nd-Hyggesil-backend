const express = require('express')
const multer = require('multer')
const mul = multer()
const router = express.Router()
const { checkValidToken } = require('../middlewares/auth')

const hostController = require('../controllers/hostController')

router.post(
  '/',
  mul.array('images', 5),
  checkValidToken,
  hostController.hostingInfo
)

module.exports = router
