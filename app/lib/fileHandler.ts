import { v4 as uuidv4 } from 'uuid'
import { supabase } from '~/supabaseClient'

export const validateFile = (file: File | null) => {
  if (!file) throw new Error('File is required.')
  if (
    ![
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ].includes(file.type)
  ) {
    throw new Error('Only PDF and DOCX files are allowed.')
  }
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
