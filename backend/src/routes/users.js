import cors from 'cors'
import multer from 'multer'
import { createUser, loginUser, getUserInfoById } from '../services/users.js'

import dotenv from 'dotenv'
dotenv.config()

const upload = multer()

export function userRoutes(app) {
  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    }),
  )

  app.options('*', cors())

  app.post('/api/v1/user/signup', upload.none(), async (req, res) => {
    try {
      const user = await createUser(req.body)
      return res.status(201).json({ username: user.username })
    } catch (err) {
      return res.status(400).json({
        error: 'failed to create the user, does the username already exist?',
      })
    }
  })

  app.post('/api/v1/user/login', upload.none(), async (req, res) => {
    try {
      const token = await loginUser(req.body)

      res.cookie('watson_token', token, {
        httpOnly: false,
        sameSite: 'Lax',
        secure: false,
      })

      return res.status(200).send({ token })
    } catch (err) {
      return res.status(400).send({
        error: 'login failed, did you enter the correct username/password?',
      })
    }
  })

  app.post('/api/v1/user/logout', (req, res) => {
    res.clearCookie('watson_token', { httpOnly: false, secure: false, sameSite: 'Lax' })
    res.status(200).json({ message: 'Logged out successfully' })
  })

  app.get('/api/v1/users/:id', async (req, res) => {
    const userInfo = await getUserInfoById(req.params.id)
    return res.status(200).send(userInfo)
  })
}
