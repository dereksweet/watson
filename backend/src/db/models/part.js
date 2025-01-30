import { Schema } from 'mongoose'

/**
 * Mongoose schema for a conversation part.
 * A part can contain either text or inline data.
 * @typedef {Object} Part
 * @property {string} [text] - The textual content of the part.
 * @property {string} [data] - The encoded data content (Base64).
 */
const partSchema = new Schema(
  {
    text: String,
    data: String,
  },
  {
    _id: false,
    timestamps: false,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v

        if (ret.text) {
          return { text: ret.text }
        } else {
          return {
            inline_data: {
              mime_type: 'text/plain',
              data: ret.data || '',
            },
          }
        }
      },
    },
  },
)

export { partSchema }
