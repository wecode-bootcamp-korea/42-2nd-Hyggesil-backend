const request = require('supertest')
const { createApp } = require('../app')
const database = require('../models/database')

describe('App Test', () => {
  let app

  beforeAll(async () => {
    app = createApp()
  })

  test('SUCCESS : ping test', async () => {
    await request(app).get('/ping').expect(200).expect({ message: 'pong' })
  })
})
