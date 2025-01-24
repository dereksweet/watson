import express from 'express'
import cors from 'cors'

import { healthRoutes } from './routes/health.js'
import { conversationsRoutes } from './routes/conversations.js'

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true })) // Handles form-urlencoded data

healthRoutes(app)
conversationsRoutes(app)

app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

export { app }
