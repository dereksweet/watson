import fs from 'fs/promises'

/**
 * Saves an uploaded file to the local file system.
 * @param {Object} file - The uploaded file object from Multer.
 * @param {string} file.originalname - The original filename.
 * @param {Buffer} file.buffer - The file content as a buffer.
 * @returns {Promise<string|null>} - The file path where the file was saved, or null if no file was provided.
 * @throws {Error} If there is an issue saving the file.
 */
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

/**
 * Deletes a file from the local file system if it exists.
 * @param {string} filePath - The path to the file to be deleted.
 * @returns {Promise<void>} - Resolves when the file is deleted or if it doesn't exist.
 */
export async function deleteFile(filePath) {
  if (filePath) {
    try {
      await fs.access(filePath)
      await fs.unlink(filePath)
    } catch (err) {
      console.error('Error deleting temporary file:', err)
    }
  }
}

/**
 * Reads a file and encodes its contents in Base64 format.
 * @param {string} filePath - The path to the file to be read.
 * @returns {Promise<string>} - The Base64-encoded content of the file.
 * @throws {Error} If there is an issue reading the file.
 */
export async function readFileToBase64(filePath) {
  const fileData = await fs.readFile(filePath, 'utf-8')
  const base64Encoded = Buffer.from(fileData, 'utf-8').toString('base64')

  return base64Encoded
}
