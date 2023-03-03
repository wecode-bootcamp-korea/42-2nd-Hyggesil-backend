const request = require('supertest')
const axios = require('axios')

const { createApp } = require('../app')
const database = require('../models/database')

describe('Sign Up', () => {
  let app

  beforeAll(async () => {
    app = createApp()
    await database.initialize()
  })

  afterAll(async () => {
    await database.query(`SET FOREIGN_KEY_CHECKS = 0;`)
    await database.query(`TRUNCATE users;`)
    await database.query(`SET FOREIGN_KEY_CHECKS = 1;`)
    await database.destroy()
  })

  test('FAILED: not exist email', async () => {
    await request(app)
      .post('/users/signup')
      .send({
        name: '테스트1',
        password: 'Abcd014dks!',
        phoneNumber: '010-3456-1411',
      })
      .expect(400)
      .expect({ message: '입력한 값이 올바르지 않습니다.' })
  })

  test('FAILED: not exist password', async () => {
    await request(app)
      .post('/users/signup')
      .send({
        name: '테스트1',
        email: 'test@gmail.com',
        phoneNumber: '010-3456-1411',
      })
      .expect(400)
      .expect({ message: '입력한 값이 올바르지 않습니다.' })
  })

  test('FAILED: not exist name', async () => {
    await request(app)
      .post('/users/signup')
      .send({
        email: 'test@gmail.com',
        password: 'Abcd014dks!',
        phoneNumber: '010-3456-1411',
      })
      .expect(400)
      .expect({ message: '입력한 값이 올바르지 않습니다.' })
  })
  test('FAILED: invaild password(특수문자 누락)', async () => {
    await request(app)
      .post('/users/signup')
      .send({
        name: '테스트1',
        email: 'test@gmail.com',
        password: 'Abcd014dks',
        phoneNumber: '010-3456-1411',
      })
      .expect(400)
      .expect({ message: '비밀번호를 올바르게 입력해 주세요.' })
  })

  test('FAILED: invaild password(문자 누락)', async () => {
    await request(app)
      .post('/users/signup')
      .send({
        name: '테스트1',
        email: 'test@gmail.com',
        password: '014@94533!',
        phoneNumber: '010-3456-1411',
      })
      .expect(400)
      .expect({ message: '비밀번호를 올바르게 입력해 주세요.' })
  })

  test('FAILED: invaild password(숫자 누락)', async () => {
    await request(app)
      .post('/users/signup')
      .send({
        name: '테스트1',
        email: 'test@gmail.com',
        password: 'aahhdbvd*@',
        phoneNumber: '010-3456-1411',
      })
      .expect(400)
      .expect({ message: '비밀번호를 올바르게 입력해 주세요.' })
  })

  test('FAILED: invaild password(7자 미만)', async () => {
    await request(app)
      .post('/users/signup')
      .send({
        name: '테스트1',
        email: 'test@gmail.com',
        password: 'Ab44ks@',
        phoneNumber: '010-3456-1411',
      })
      .expect(400)
      .expect({ message: '비밀번호를 올바르게 입력해 주세요.' })
  })

  test('FAILED: invaild password(16자 이상)', async () => {
    await request(app)
      .post('/users/signup')
      .send({
        name: '테스트1',
        email: 'test@gmail.com',
        password: 'Ab44ks@kslg039151d',
        phoneNumber: '010-3456-1411',
      })
      .expect(400)
      .expect({ message: '비밀번호를 올바르게 입력해 주세요.' })
  })

  test('SUCCESS: create user', async () => {
    await request(app)
      .post('/users/signup')
      .send({
        name: '테스트1',
        email: 'test@gmail.com',
        password: 'Abcd014dks!',
        phoneNumber: '010-3456-1411',
      })
      .expect(201)
      .expect({ message: 'SUCCESS_SIGNUP' })
  })

  test('FAILED: ALREADY_EXIST_USER', async () => {
    await request(app)
      .post('/users/signup')
      .send({
        name: '테스트1',
        email: 'test@gmail.com',
        password: 'Abcd014dks!',
        phoneNumber: '010-3456-1411',
      })
      .expect(400)
      .expect({ message: '등록된 사용자입니다.' })
  })

  test('FAILED: ALREADY_EXIST_PHONE_NUMBER', async () => {
    await request(app)
      .post('/users/signup')
      .send({
        name: '테스트1',
        email: 'tet@gmail.com',
        password: 'Abcd014dks!',
        phoneNumber: '010-3456-1411',
      })
      .expect(400)
      .expect({ message: '등록된 번호입니다.' })
  })
})

describe('Login', () => {
  let app

  beforeAll(async () => {
    app = createApp()
    await database.initialize()
  })

  afterAll(async () => {
    await database.query(`SET FOREIGN_KEY_CHECKS = 0;`)
    await database.query(`TRUNCATE users;`)
    await database.query(`SET FOREIGN_KEY_CHECKS = 1;`)

    await database.destroy()
  })

  test('SUCCESS: create user', async () => {
    await request(app)
      .post('/users/signup')
      .send({
        name: '테스트1',
        email: 'test@gmail.com',
        password: 'Abcd014dks!',
        phoneNumber: '010-3456-1411',
      })
      .expect(201)
      .expect({ message: 'SUCCESS_SIGNUP' })
  })

  test('FAILED: invalid email', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({
        password: 'Abcd014dks!',
      })
      .expect(400)
      .expect({ message: '입력한 값이 올바르지 않습니다.' })
  })

  test('FAILED: invalid password', async () => {
    await request(app)
      .post('/users/login')
      .send({
        email: 'test@gmail.com',
      })
      .expect(400)
      .expect({ message: '입력한 값이 올바르지 않습니다.' })
  })

  test('FAILED: invalid email(이메일 오타)', async () => {
    await request(app)
      .post('/users/login')
      .send({
        email: 'tes@gmail.com',
        password: 'Abcd014dks!',
      })
      .expect(400)
      .expect({ message: '잘못된 이메일입니다.' })
  })

  test('FAILED: invalid password(비밀번호 오타)', async () => {
    await request(app)
      .post('/users/login')
      .send({
        email: 'test@gmail.com',
        password: 'Abcd014dks',
      })
      .expect(400)
      .expect({ message: '잘못된 비밀번호입니다.' })
  })

  test('SUCCESS: success login', async () => {
    const response = await request(app).post('/users/login').send({
      email: 'test@gmail.com',
      password: 'Abcd014dks!',
    })
    expect(response.status).toEqual(200)
    expect(response.body).toHaveProperty('accessToken')
  })
})

describe.skip('Kakao Login', () => {
  let app
  beforeAll(async () => {
    app = createApp()
    await database.initialize()
  })

  afterAll(async () => {
    await database.query(`SET FOREIGN_KEY_CHECKS = 0;`)
    await database.query(`TRUNCATE users;`)
    await database.query(`SET FOREIGN_KEY_CHECKS = 1;`)
    await database.destroy()
  })

  test('FAILED : INVAILD KAKAO TOKEN', async () => {
    const response = await request(app).post('/users/login/kakao')
    expect(response.status).toEqual(400)
    expect(response.body).toEqual({ message: '유효하지 않는 토큰입니다.' })
  })

  test('SUCCESS : SUCCESS KAKAO LOGIN', async () => {
    axios.get = jest.fn().mockReturnValue({
      data: {
        id: 1234,
        kakao_account: {
          profile: {
            nickname: '테스트',
          },
          email: 'testtest222@gmail.com',
        },
      },
    })
    const response = await request(app)
      .post('/users/login/kakao')
      .set({ Authorization: 'TEST ACCESS TOKEN' })
    expect(response.status).toEqual(200)
    expect(response.body).toHaveProperty('accessToken')
  })
})
