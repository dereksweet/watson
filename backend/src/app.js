import express from 'express'
import cors from 'cors'

import { healthRoutes } from './routes/health.js'
import { conversationRoutes } from './routes/conversations.js'
import { userRoutes } from './routes/users.js'

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))

healthRoutes(app)
conversationRoutes(app)
userRoutes(app)

app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

export { app }
