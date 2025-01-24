import { HarmBlockThreshold, HarmCategory, VertexAI } from '@google-cloud/vertexai'
import { convertConversationForGemini, buildUserParts } from '../helpers/gemini.js'

import fs from 'fs'

const project = 'sherlock-447721'
const location = 'us-central1'
const textModel = 'gemini-1.0-pro'

const vertexAI = new VertexAI({ project: project, location: location })

const systemInstructionsPath = './src/services/system_instructions.txt'
const fileContent = fs.readFileSync(systemInstructionsPath, 'utf-8')

// Instantiate Gemini model
const generativeModel = vertexAI.getGenerativeModel({
  model: textModel,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
  generationConfig: { maxOutputTokens: 256 },
  systemInstruction: {
    role: 'system',
    parts: [{ text: fileContent }],
  },
})

/**
 * Function to send a prompt and optionally the contents of a file in Base64 to the Gemini model.
 * @param {string} prompt - User input text.
 * @param {string} [filePath] - Optional path to the uploaded file.
 * @returns {Promise<string>} - Response from the model.
 */
export async function sendPrompt(conversation, prompt, filePath) {
  let contents = await convertConversationForGemini(conversation)

  contents.push({ role: 'user', parts: await buildUserParts(prompt, filePath) })

  const request = {
    contents: contents,
  }

  try {
    const streamingResult = await generativeModel.generateContentStream(request)
    const aggregatedResponse = await streamingResult.response
    const responseText = aggregatedResponse.candidates[0].content.parts[0].text

    return responseText
  } catch (error) {
    console.error('Error sending prompt:', error)
    throw new Error('Failed to process the request with Gemini')
  }
}
