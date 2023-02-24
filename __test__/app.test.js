const request = require('supertest')
const { createApp } = require('../app')

describe('App Test', () => {
  beforeAll(async () => {
    app = createApp()
  })

  test('SUCCESS : ping test', async () => {
    await request(app).get('/ping').expect(200).expect({ message: 'pong' })
  })
})
