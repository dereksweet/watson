/* eslint-env jest */

import mongoose from 'mongoose'
import { Conversation } from '../../db/models/conversation.js'
import { Chunk } from '../../db/models/chunk.js'

describe('Conversation Model Test', () => {
  beforeAll(async () => {
    await Conversation.deleteMany({})
    await Chunk.deleteMany({})
  })

  afterAll(async () => {
    await Conversation.deleteMany({})
    await Chunk.deleteMany({})
    await mongoose.connection.close()
  })

  it('should create and save a conversation successfully', async () => {
    const conversationData = { user_id: '12345', code: 'ABC123', chunks: [] }
    const conversation = new Conversation(conversationData)
    const savedConversation = await conversation.save()

    expect(savedConversation._id).toBeDefined()
    expect(savedConversation.user_id).toBe(conversationData.user_id)
    expect(savedConversation.code).toBe(conversationData.code)
    expect(savedConversation.chunks).toEqual([])
  })

  it('should delete associated chunks when deleting a conversation', async () => {
    const chunk = await Chunk.create({ role: 'user', parts: [{ text: 'Test chunk content' }] })
    const conversation = new Conversation({ user_id: '12345', code: 'DEL1234', chunks: [chunk._id] })
    await conversation.save()

    let chunkExists = await Chunk.findById(chunk._id)
    expect(chunkExists).not.toBeNull()

    await conversation.deleteOne()
    chunkExists = await Chunk.findById(chunk._id)
    expect(chunkExists).toBeNull()
  })

  it('should remove associated chunks when using findOneAndDelete', async () => {
    const chunk = await Chunk.create({ role: 'assistant', parts: [{ text: 'Another chunk content' }] })
    await Conversation.create({ user_id: '67890', code: 'DEL4567', chunks: [chunk._id] })

    let chunkExists = await Chunk.findById(chunk._id)
    expect(chunkExists).not.toBeNull()

    await Conversation.findOneAndDelete({ code: 'DEL4567' })

    chunkExists = await Chunk.findById(chunk._id)
    expect(chunkExists).toBeNull()
  })

  it('should exclude _id and __v fields in JSON output', async () => {
    const conversation = new Conversation({ user_id: '99999', code: 'TEST123', chunks: [] })
    const savedConversation = await conversation.save()

    const jsonOutput = savedConversation.toJSON()
    expect(jsonOutput._id).toBeUndefined()
    expect(jsonOutput.__v).toBeUndefined()
    expect(jsonOutput.user_id).toBe('99999')
  })

  it('should handle missing optional fields gracefully', async () => {
    const conversation = new Conversation({ user_id: 'testuser' })
    const savedConversation = await conversation.save()

    expect(savedConversation._id).toBeDefined()
    expect(savedConversation.user_id).toBe('testuser')
    expect(savedConversation.code).toBeUndefined()
  })
})
