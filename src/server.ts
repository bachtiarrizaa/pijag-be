import app from './app.js'
import prisma from './config/db.config'
import { appConfig } from './config/app.config'

const start = async () => {
  try {
    await prisma.$connect()
    console.log('Database connected')

    app.listen(appConfig.APP_PORT, appConfig.APP_HOST, () => {
      console.log(
        `Server running at http://${appConfig.APP_HOST}:${appConfig.APP_PORT}`
      )
    })
  } catch (error) {
    console.error('Failed to start:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

start()
