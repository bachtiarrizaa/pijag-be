import express from 'express'
import cors from 'cors'
import passport from 'passport'
import routes from './routes'
import { errorMiddleware } from './middlewares/error.middleware'
import { PassportConfig } from './config/passport.config'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
PassportConfig.init()
app.use(passport.initialize())
app.get('/', (_, res) => {
  res.send('Pijag Coffee API running')
})
app.use('/api', routes)
app.use(errorMiddleware)

export default app
