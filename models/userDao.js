const database = require('./database')

const checkUserByKakaoId = async (kakaoId) => {
  const [data] = await database.query(
    `
    SELECT EXISTS
    (
      SELECT * FROM
      users
      WHERE
      users.kakao_id = ? 
      ) AS checkUser;
    `,
    [kakaoId]
  )
  return !!parseInt(data.checkUser)
}

const checkUserByEmail = async (email) => {
  const [data] = await database.query(
    `
    SELECT EXISTS
    (
      SELECT * FROM
      users
      WHERE
      users.email = ? 
      ) AS checkUser;
    `,
    [email]
  )
  return !!parseInt(data.checkUser)
}

const checkUserByPhoneNumber = async (phoneNumber) => {
  const [data] = await database.query(
    `
    SELECT EXISTS
    (
      SELECT * FROM
      users
      WHERE
      users.phone_number = ? 
      ) AS checkUser;
    `,
    [phoneNumber]
  )
  return !!parseInt(data.checkUser)
}

const createUser = async (name, email, hasedpassword, phoneNumber) => {
  return await database.query(
    `
    INSERT INTO
    users
    (
      name,
      email,
      password,
      phone_number
      )
      VALUES (
        ?,
        ?,
        ?,
        ?
      )
    ;`,
    [name, email, hasedpassword, phoneNumber]
  )
}

const createKakaoUser = async (kakaoId, userName, userEmail) => {
  const existEmail = userEmail ? `${userEmail}` : ''
  const password = ''

  await database.query(
    `
    INSERT INTO
    users
    (
      kakao_id,
      name,
      email,
      password
      )
      VALUES (
        ?,
        ?,
        ?,
        ?
      )
    ;`,
    [kakaoId, userName, existEmail, password]
  )
}

const getPasswordByEmail = async (email) => {
  const [data] = await database.query(
    `
    SELECT
    password
    FROM users
    WHERE
    email = ?
    ;`,
    [email]
  )
  return data
}

const getUserId = async (userInfo) => {
  const column = String(userInfo).includes('@') ? `email` : `kakao_id`
  const [data] = await database.query(
    `
    SELECT
    id
    FROM users
    WHERE
    ${column} = ?
    ;`,
    [userInfo]
  )
  return data.id
}

module.exports = {
  checkUserByKakaoId,
  checkUserByEmail,
  checkUserByPhoneNumber,
  createUser,
  createKakaoUser,
  getPasswordByEmail,
  getUserId,
}
