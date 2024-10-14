import { v4 as uuidv4 } from 'uuid'
import { supabase } from '~/supabaseClient'

const allowedFileTypes = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
const maxFileSize = 2 * 1024 * 1024 // 2MB

export const validateFile = (file: File | null) => {
  if (!file) {
    return 'File is required.'
  }

  if (!allowedFileTypes.includes(file.type)) {
    return 'Invalid file type. Only PDF and DOCX files are allowed.'
  }

  if (file.size > maxFileSize) {
    return `File size exceeds the ${maxFileSize / 1024 / 1024}MB limit.`
  }

  return null
}

export const uploadFile = async (file: File) => {
  const uniqueFileName = `${uuidv4()}-${file.name}`
  const { data, error } = await supabase.storage
    .from('resumes')
    .upload(`public/${uniqueFileName}`, file)
  if (error) {
    throw new Error(error.message || 'File upload failed.')
  }
  return uniqueFileName
}

export const downloadFile = async (fileName: string) => {
  const { data, error } = await supabase.storage
    .from('resumes')
    .download(`public/${fileName}`)
  if (error) {
    throw new Error(error.message || 'File download failed.')
  }
  const arrayBuffer = await data.arrayBuffer()
  return Buffer.from(arrayBuffer)
}
