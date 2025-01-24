import { readFileToBase64 } from './files.js'

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
