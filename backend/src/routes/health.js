import { sendPrompt } from '../services/gemini.js'

const TEST_PROMPT = 'Hello. How are you?'
const EXPECTED_RESPONSE_SUBSTRING = 'doing well'

/**
 * Defines the health check API route.
 * @param {import('express').Application} app - The Express application instance.
 */
export function healthRoutes(app) {
  /**
   * Performs a basic health check and verifies connectivity with the Google Gemini service.
   * @route GET /api/v1/health
   * @access Public
   * @returns {Object} 200 - Health check status and Gemini service response.
   * @returns {Object} 500 - Internal server error if the check fails.
   */
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
