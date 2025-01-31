import cors from 'cors'
import multer from 'multer'
import { createUser, loginUser, getUserInfoById } from '../services/users.js'

import dotenv from 'dotenv'
dotenv.config()

const upload = multer()

/**
 * Defines user-related API routes.
 * @param {import('express').Application} app - The Express application instance.
 */
export function userRoutes(app) {
  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    }),
  )

  app.options('*', cors())

  /**
   * Handles user signup by creating a new user.
   * @route POST /api/v1/user/signup
   * @access Public
   * @param {string} req.body.username - The username for the new user.
   * @param {string} req.body.password - The password for the new user.
   * @returns {Object} 201 - Successfully created user.
   * @returns {Object} 400 - Error if username already exists.
   */
  app.post('/api/v1/user/signup', upload.none(), async (req, res) => {
    try {
      const user = await createUser(req.body)
      return res.status(201).json({ username: user.username })
    } catch (err) {
      return res.status(400).json({
        error: 'failed to create the user, does the username already exist?',
        details: JSON.stringify(err),
      })
    }
  })

  /**
   * Handles user login by verifying credentials and returning a JWT token.
   * @route POST /api/v1/user/login
   * @access Public
   * @param {string} req.body.username - The username of the user.
   * @param {string} req.body.password - The password of the user.
   * @returns {Object} 200 - Login success with token.
   * @returns {Object} 400 - Error if login fails due to incorrect credentials.
   */
  app.post('/api/v1/user/login', upload.none(), async (req, res) => {
    try {
      const token = await loginUser(req.body)

      res.cookie('watson_token', token, {
        httpOnly: false,
        sameSite: 'Strict',
        secure: false,
      })

      return res.status(200).send({ token })
    } catch (err) {
      return res.status(400).send({
        error: 'login failed, did you enter the correct username/password?',
      })
    }
  })

  /**
   * Handles user logout by clearing authentication cookies.
   * @route POST /api/v1/user/logout
   * @access Public
   * @returns {Object} 200 - Logout success message.
   */
  app.post('/api/v1/user/logout', (req, res) => {
    res.clearCookie('watson_token', { httpOnly: false, secure: false, sameSite: 'Strict' })
    res.status(200).json({ message: 'Logged out successfully' })
  })

  /**
   * Retrieves user information by user ID.
   * @route GET /api/v1/users/:id
   * @access Public
   * @param {string} req.params.id - The ID of the user.
   * @returns {Object} 200 - The user information.
   */
  app.get('/api/v1/users/:id', async (req, res) => {
    const userInfo = await getUserInfoById(req.params.id)
    return res.status(200).send(userInfo)
  })
}
