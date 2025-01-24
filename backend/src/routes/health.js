import { sendPrompt } from '../services/gemini.js'

const TEST_PROMPT = 'Hello. How are you?'
const EXPECTED_RESPONSE_SUBSTRING = 'doing well'

export function healthRoutes(app) {
  app.get('/api/v1/health', async (req, res) => {
    try {
      const gemini_response = await sendPrompt(null, TEST_PROMPT)
      const gemini_status = gemini_response.includes(EXPECTED_RESPONSE_SUBSTRING) ? 'OK' : 'ERROR'

      return res.json({
        basic_status: 'OK',
        google_gemini_response: gemini_response,
        google_gemini_status: gemini_status,
      })
    } catch (err) {
      console.error('error on health check', err)
      return res.status(500).end()
    }
  })
}
