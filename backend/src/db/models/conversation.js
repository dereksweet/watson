import mongoose, { Schema } from 'mongoose'
import { Chunk } from './chunk.js'

const conversationSchema = new Schema(
  {
    user_id: String,
    code: String,
    chunks: [{ type: Schema.Types.ObjectId, ref: 'Chunk' }],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret._id
        delete ret.__v
      },
    },
  },
)

// Middleware to remove associated chunks when a conversation is deleted
conversationSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  await Chunk.deleteMany({ _id: { $in: this.chunks } })
  next()
})

conversationSchema.pre('findOneAndDelete', async function (next) {
  const doc = await this.model.findOne(this.getQuery())
  if (doc) {
    await Chunk.deleteMany({ _id: { $in: doc.chunks } })
  }
  next()
})

export const Conversation = mongoose.model('Conversation', conversationSchema)
