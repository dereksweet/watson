import { readFileToBase64 } from './files.js'

/**
 * Converts a conversation object into a format suitable for the Gemini model.
 * @param {Object} conversation - The conversation object.
 * @param {Array} conversation.chunks - The array of conversation chunks.
 * @param {string} conversation.chunks[].role - The role of the chunk (e.g., "user" or "model").
 * @param {Array} conversation.chunks[].parts - The array of parts in the chunk.
 * @param {string} [conversation.chunks[].parts[].text] - The text content of a part.
 * @param {string} [conversation.chunks[].parts[].data] - The encoded data of a part.
 * @returns {Promise<Array>} - The conversation formatted for the Gemini model.
 */
export async function convertConversationForGemini(conversation) {
  let contents = []

  if (conversation?.chunks?.length) {
    for (const chunk of conversation.chunks) {
      let parts = []

      for (const part of chunk.parts) {
        if (part.text) {
          parts.push({ text: part.text })
        } else {
          parts.push({
            inline_data: { mime_type: 'text/plain', data: part.data },
          })
        }
      }
      contents.push({ role: chunk.role, parts: parts })
    }
  }

  return contents
}

/**
 * Builds the user input parts for the Gemini model, including a prompt and an optional file.
 * @param {string} prompt - The user's input text.
 * @param {string} [filePath] - The optional path to an uploaded file.
 * @returns {Promise<Array>} - The formatted user input parts for the Gemini model.
 * @throws {Error} If the file cannot be read.
 */
export async function buildUserParts(prompt, filePath) {
  let userParts = []
  userParts.push({ text: prompt })

  if (filePath) {
    try {
      const base64Encoded = await readFileToBase64(filePath)

      userParts.push({
        inline_data: { mime_type: 'text/plain', data: base64Encoded },
      })
    } catch (error) {
      console.error('Error reading file:', error)
      throw new Error('Failed to read the file for processing')
    }
  }

  return userParts
}
