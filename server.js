require('dotenv').config()

const { createApp } = require('./app')
const database = require('./models/database')

const PORT = process.env.PORT

const startServer = () => {
  const app = createApp()
  database
    .initialize()
    .then(() => {
      try {
        app.listen(PORT, () => {
          console.log(`Server is listening on PORT : ${PORT}`)
        })
      } catch (err) {
        console.error(err)
      }
    })
    .catch((err) => {
      console.error('Fail to init DB.')
      database.destroy()
    })
}

startServer()
