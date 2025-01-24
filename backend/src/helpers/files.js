import fs from 'fs/promises'

// Utility function to handle file saving
export async function saveFile(file) {
  if (!file) return null
  const filePath = `./uploads/${file.originalname}`
  try {
    await fs.writeFile(filePath, file.buffer)
    return filePath
  } catch (err) {
    console.error('Error saving uploaded file:', err)
    throw new Error('Failed to process uploaded file')
  }
}

// Utility function to clean up file
export async function deleteFile(filePath) {
  if (filePath) {
    try {
      await fs.access(filePath) // Check if file exists
      await fs.unlink(filePath)
    } catch (err) {
      console.error('Error deleting temporary file:', err)
    }
  }
}

export async function readFileToBase64(filePath) {
  const fileData = await fs.readFile(filePath, 'utf-8')
  const base64Encoded = Buffer.from(fileData, 'utf-8').toString('base64')

  return base64Encoded
}
