import mongoose, { Schema } from 'mongoose'
import { partSchema } from './part.js'

/**
 * Mongoose schema for a conversation chunk.
 * A chunk represents a part of a conversation with a specific role (e.g., "user" or "model").
 * @typedef {Object} Chunk
 * @property {string} role - The role of the chunk (e.g., "user" or "model").
 * @property {Array} parts - The parts of the chunk, containing text or inline data.
 * @property {Date} createdAt - Timestamp of when the chunk was created.
 * @property {Date} updatedAt - Timestamp of when the chunk was last updated.
 */
const chunkSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
    },
    parts: [partSchema],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v
      },
    },
  },
)

/**
 * Mongoose model for conversation chunks.
 * @type {import('mongoose').Model<Chunk>}
 */
export const Chunk = mongoose.model('Chunk', chunkSchema)
export { chunkSchema }
