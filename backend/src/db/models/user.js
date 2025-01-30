import mongoose, { Schema } from 'mongoose'

/**
 * Mongoose schema for a user.
 * Stores user credentials for authentication.
 * @typedef {Object} User
 * @property {string} username - The unique username of the user.
 * @property {string} password - The hashed password of the user.
 */
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

/**
 * Mongoose model for users.
 * @type {import('mongoose').Model<User>}
 */
export const User = mongoose.model('user', userSchema)
