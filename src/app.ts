import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './routes/index.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (_, res) => {
  res.send('Pijag Coffee API running')
})

app.use('/api/v1', routes)

export default app
