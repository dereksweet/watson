import { Conversation } from '../db/models/conversation.js'
import { Chunk } from '../db/models/chunk.js'

import { readFileToBase64 } from '../helpers/files.js'

/**
 * Retrieves a conversation for a specific user and code.
 * @param {string} user_id - The ID of the user.
 * @param {string} code - The unique code identifying the conversation.
 * @returns {Promise<Conversation|null>} - The retrieved conversation with populated chunks, or null if not found.
 */
export async function getConversation(user_id, code) {
  return await Conversation.findOne({
    user_id: String(user_id),
    code: String(code),
  }).populate('chunks')
}

/**
 * Deletes a conversation for a specific user and code.
 * @param {string} user_id - The ID of the user.
 * @param {string} code - The unique code identifying the conversation.
 * @returns {Promise<Conversation|null>} - The deleted conversation document, or null if not found.
 */
export async function deleteConversation(user_id, code) {
  return await Conversation.findOneAndDelete({
    user_id: String(user_id),
    code: code,
  })
}

/**
 * Creates a new conversation and saves it to the database.
 * @param {string} user_id - The ID of the user.
 * @param {string} code - The unique code for the conversation.
 * @param {string} prompt - The user's input text.
 * @param {string} [filePath] - Optional path to the uploaded file.
 * @param {string} response - The AI-generated response.
 * @returns {Promise<Conversation>} - The saved conversation document.
 */
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

/**
 * Updates an existing conversation by appending new user and AI response chunks.
 * @param {Conversation} conversation - The conversation document to update.
 * @param {string} prompt - The user's input text.
 * @param {string} [filePath] - Optional path to the uploaded file.
 * @param {string} response - The AI-generated response.
 * @returns {Promise<void>} - Resolves when the conversation is updated.
 */
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
