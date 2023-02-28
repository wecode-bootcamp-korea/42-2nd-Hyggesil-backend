const checkValidationEmail = (email) => {
  const email_REGEX = new RegExp(
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
  )
  if (!email_REGEX.test(email)) {
    const err = new Error('INVALID_EMAIL')
    err.statusCode = 400
    throw err
  }
}

const checkValidationPassword = (password) => {
  const PASSWORD_REGEX = new RegExp(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/
  )
  if (!PASSWORD_REGEX.test(password)) {
    const err = new Error('INVALID_PASSWORD')
    err.statusCode = 400
    throw err
  }
}

module.exports = {
  checkValidationEmail,
  checkValidationPassword,
}
