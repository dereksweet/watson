import { Conversation } from '../db/models/conversation.js'
import { Chunk } from '../db/models/chunk.js'

import { readFileToBase64 } from '../helpers/files.js'

export async function getConversation(user_id, code) {
  return await Conversation.findOne({
    user_id: String(user_id),
    code: String(code),
  }).populate('chunks')
}

export async function deleteConversation(user_id, code) {
  return await Conversation.findOneAndDelete({
    user_id: String(user_id),
    code: code,
  })
}

export async function createConversation(user_id, code, prompt, filePath, response) {
  let user_parts = [{ text: prompt }]
  if (filePath) {
    const base64Encoded = await readFileToBase64(filePath)
    user_parts.push({ data: base64Encoded })
  }

  const user_chunk = await Chunk.create({
    role: 'user',
    parts: user_parts,
  })

  const ai_chunk = await Chunk.create({
    role: 'model',
    parts: [{ text: response }],
  })

  const conversation = new Conversation({
    user_id: user_id,
    code: code,
    chunks: [user_chunk._id, ai_chunk._id],
  })

  return await conversation.save()
}

export async function updateConversation(conversation, prompt, filePath, response) {
  let user_parts = [{ text: prompt }]
  if (filePath) {
    const base64Encoded = await readFileToBase64(filePath)
    user_parts.push({ data: base64Encoded })
  }

  const user_chunk = await Chunk.create({
    role: 'user',
    parts: user_parts,
  })
  const ai_chunk = await Chunk.create({
    role: 'model',
    parts: [{ text: response }],
  })

  await user_chunk.save()
  await ai_chunk.save()

  return await conversation.updateOne({
    $push: {
      chunks: { $each: [user_chunk, ai_chunk] },
    },
  })
}
