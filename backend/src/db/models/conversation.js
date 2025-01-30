import mongoose, { Schema } from 'mongoose'
import { Chunk } from './chunk.js'

/**
 * Mongoose schema for a conversation.
 * A conversation consists of multiple chunks exchanged between a user and an AI model.
 * @typedef {Object} Conversation
 * @property {string} user_id - The ID of the user associated with the conversation.
 * @property {string} code - A unique identifier for the conversation.
 * @property {Array<ObjectId>} chunks - References to conversation chunks.
 * @property {Date} createdAt - Timestamp of when the conversation was created.
 * @property {Date} updatedAt - Timestamp of when the conversation was last updated.
 */
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

/**
 * Middleware to delete all associated chunks before removing a conversation.
 * Triggered when calling `deleteOne` on a conversation document.
 */
conversationSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  await Chunk.deleteMany({ _id: { $in: this.chunks } })
  next()
})

/**
 * Middleware to delete all associated chunks before deleting a conversation via `findOneAndDelete`.
 * Ensures that all related chunks are removed when a conversation is deleted by its query.
 */
conversationSchema.pre('findOneAndDelete', async function (next) {
  const doc = await this.model.findOne(this.getQuery())
  if (doc) {
    await Chunk.deleteMany({ _id: { $in: doc.chunks } })
  }
  next()
})

/**
 * Mongoose model for conversations.
 * @type {import('mongoose').Model<Conversation>}
 */
export const Conversation = mongoose.model('Conversation', conversationSchema)
