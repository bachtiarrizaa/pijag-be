import { config } from 'dotenv'
config() // load env dulu sebelum apapun

// Dynamic import supaya env sudah loaded sebelum module lain di-import
const { default: app } = await import('./app.js')
const { default: prisma } = await import('./config/db.config.js')
const { appConfig } = await import('./config/app.config.js')

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
