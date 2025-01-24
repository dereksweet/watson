import { Schema } from 'mongoose'

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
