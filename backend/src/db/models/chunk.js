import mongoose, { Schema } from 'mongoose'
import { partSchema } from './part.js'

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

export const Chunk = mongoose.model('Chunk', chunkSchema)
export { chunkSchema }
