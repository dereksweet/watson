/* eslint-env jest */

import mongoose from 'mongoose'
import { Chunk } from '../../db/models/chunk.js'

describe('Part Schema Test (within Chunk)', () => {
  beforeAll(async () => {
    await Chunk.deleteMany({})
  })

  afterAll(async () => {
    await Chunk.deleteMany({})
    await mongoose.connection.close()
  })

  it('should create and save a chunk with a part having text', async () => {
    const chunk = new Chunk({
      role: 'user',
      parts: [{ text: 'Sample text' }],
    })

    const savedChunk = await chunk.save()
    expect(savedChunk.parts[0].text).toBe('Sample text')
    expect(savedChunk.parts[0].data).toBeUndefined()
  })

  it('should create and save a chunk with a part having data', async () => {
    const chunk = new Chunk({
      role: 'assistant',
      parts: [{ data: 'Some binary data' }],
    })

    const savedChunk = await chunk.save()
    expect(savedChunk.parts[0].data).toBe('Some binary data')
    expect(savedChunk.parts[0].text).toBeUndefined()
  })

  it('should exclude _id and __v fields in JSON output', async () => {
    const chunk = new Chunk({
      role: 'assistant',
      parts: [{ text: 'Hidden fields' }],
    })

    const savedChunk = await chunk.save()
    const jsonOutput = savedChunk.toJSON()

    expect(jsonOutput.parts[0]._id).toBeUndefined()
    expect(jsonOutput.parts[0].__v).toBeUndefined()
  })

  it('should return correct JSON structure for text parts', async () => {
    const chunk = new Chunk({
      role: 'user',
      parts: [{ text: 'Text content' }],
    })

    const savedChunk = await chunk.save()
    const jsonOutput = savedChunk.toJSON()

    expect(jsonOutput.parts[0]).toEqual({ text: 'Text content' })
  })

  it('should return correct JSON structure for data parts', async () => {
    const chunk = new Chunk({
      role: 'system',
      parts: [{ data: 'Encoded data' }],
    })

    const savedChunk = await chunk.save()
    const jsonOutput = savedChunk.toJSON()

    expect(jsonOutput.parts[0]).toEqual({
      inline_data: {
        mime_type: 'text/plain',
        data: 'Encoded data',
      },
    })
  })

  it('should return empty data structure when no data is provided', async () => {
    const chunk = new Chunk({
      role: 'user',
      parts: [{}],
    })

    const savedChunk = await chunk.save()
    const jsonOutput = savedChunk.toJSON()

    expect(jsonOutput.parts[0]).toEqual({
      inline_data: {
        mime_type: 'text/plain',
        data: '',
      },
    })
  })

  it('should handle both text and data gracefully, prioritizing text', async () => {
    const chunk = new Chunk({
      role: 'user',
      parts: [{ text: 'Hello', data: 'Extra data' }],
    })

    const savedChunk = await chunk.save()
    const jsonOutput = savedChunk.toJSON()

    expect(jsonOutput.parts[0]).toEqual({ text: 'Hello' })
  })
})
