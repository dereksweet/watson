import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../db/models/user.js'

/**
 * Creates a new user with a hashed password and saves it to the database.
 * @param {Object} userData - The user data.
 * @param {string} userData.username - The username of the new user.
 * @param {string} userData.password - The plaintext password to be hashed.
 * @returns {Promise<User>} - The saved user document.
 */
export async function createUser({ username, password }) {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({ username, password: hashedPassword })
  return await user.save()
}

/**
 * Authenticates a user by verifying their username and password, then generates a JWT token.
 * @param {Object} credentials - The user login credentials.
 * @param {string} credentials.username - The username of the user.
 * @param {string} credentials.password - The plaintext password provided by the user.
 * @throws {Error} If the username or password is incorrect.
 * @returns {Promise<string>} - A JWT token valid for 24 hours.
 */
export async function loginUser({ username, password }) {
  const user = await User.findOne({ username })
  if (!user) {
    throw new Error('invalid username!')
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new Error('invalid password!')
  }
  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  })
  return token
}

/**
 * Retrieves user information by user ID.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object>} - An object containing the username if found, or an error message if not.
 */
export async function getUserInfoById(userId) {
  try {
    const user = await User.findById(userId)
    if (!user) return { error: 'User Not Found' }
    return { username: user.username }
  } catch (err) {
    return { error: 'User Not Found' }
  }
}
