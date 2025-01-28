import { saveFile, deleteFile } from '../helpers/files.js'
import { createConversation, updateConversation, deleteConversation, getConversation } from '../services/conversations.js'
import { sendPrompt } from '../services/gemini.js'
import { requireAuth } from '../middleware/jwt.js'

import multer from 'multer'

// Configure multer for handling file uploads
const upload = multer()

export function conversationRoutes(app) {
  app.get('/api/v1/conversations/:code', requireAuth, async (req, res) => {
    try {
      const conversationCode = req.params.code
      const conversation = await getConversation(req.auth.sub, conversationCode)

      res.json({ conversation })
    } catch (err) {
      console.error('Error on GET /conversations/:code', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  })

  app.delete('/api/v1/conversations/:code', requireAuth, async (req, res) => {
    try {
      const conversationCode = req.params.code
      await deleteConversation(req.auth.sub, conversationCode)

      res.json({
        status: 'SUCCESS',
        deleted_conversation_code: conversationCode,
        deleted_user_id: req.auth.sub,
      })
    } catch (err) {
      console.error('Error on DELETE /conversations/:code', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  })

  app.post('/api/v1/conversations/:code', requireAuth, upload.single('file'), async (req, res) => {
    const prompt = req.body.prompt?.trim()

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' })
    }

    let filePath = null
    try {
      filePath = await saveFile(req.file)

      const conversationCode = req.params.code
      let conversation = await getConversation(req.auth.sub, conversationCode)

      const response = await sendPrompt(conversation, prompt, filePath)

      if (conversation) {
        await updateConversation(conversation, prompt, filePath, response)
      } else {
        conversation = await createConversation(req.auth.sub, conversationCode, prompt, filePath, response)
      }

      res.status(200).json({ response })
    } catch (err) {
      console.error('Error processing request:', err)
      res.status(500).json({ error: 'Failed to process request' })
    } finally {
      await deleteFile(filePath)
    }
  })
}
