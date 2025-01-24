/* eslint-env jest */

import mongoose from 'mongoose'
import { Chunk } from '../../db/models/chunk.js'

describe('Chunk Model Test', () => {
  beforeAll(async () => {
    await Chunk.deleteMany({})
  })

  afterAll(async () => {
    await Chunk.deleteMany({})
    await mongoose.connection.close()
  })

  it('should create and save a chunk successfully', async () => {
    const chunkData = { role: 'user', parts: [{ text: 'Hello world!' }] }
    const chunk = new Chunk(chunkData)
    const savedChunk = await chunk.save()

    expect(savedChunk._id).toBeDefined()
    expect(savedChunk.role).toBe(chunkData.role)
    expect(savedChunk.parts.length).toBe(1)
    expect(savedChunk.parts[0].text).toBe('Hello world!')
  })

  it('should exclude _id and __v fields in JSON output', async () => {
    const chunk = new Chunk({ role: 'assistant', parts: [{ text: 'Response message' }] })
    const savedChunk = await chunk.save()

    const jsonOutput = savedChunk.toJSON()
    expect(jsonOutput._id).toBeUndefined()
    expect(jsonOutput.__v).toBeUndefined()
    expect(jsonOutput.role).toBe('assistant')
  })

  it('should handle missing optional fields gracefully', async () => {
    const chunk = new Chunk({ role: 'system' })
    const savedChunk = await chunk.save()

    expect(savedChunk._id).toBeDefined()
    expect(savedChunk.role).toBe('system')
    expect(savedChunk.parts).toEqual([])
  })

  it('should not allow saving chunk without a role', async () => {
    const chunk = new Chunk({ parts: [{ text: 'Missing role' }] })

    await expect(chunk.save()).rejects.toThrow(mongoose.Error.ValidationError)
  })

  it('should store multiple parts within a chunk', async () => {
    const chunkData = {
      role: 'bot',
      parts: [{ text: 'First part' }, { text: 'Second part' }],
    }

    const chunk = new Chunk(chunkData)
    const savedChunk = await chunk.save()

    expect(savedChunk.parts.length).toBe(2)
    expect(savedChunk.parts[0].text).toBe('First part')
    expect(savedChunk.parts[1].text).toBe('Second part')
  })
})
