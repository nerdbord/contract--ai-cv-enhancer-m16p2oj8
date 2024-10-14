import { ActionFunctionArgs } from '@remix-run/node'
import { Form, redirect, useNavigation, useRouteError } from '@remix-run/react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { downloadFile, uploadFile } from '~/lib/fileHandler'
import { extractTextFromPDF } from '~/lib/textExtractor'
import { cn } from '~/lib/utils'

// Validate file type and existence
const validateFile = (file: File | null) => {
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

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    // Step 1: Retrieve file from the form data
    const body = await request.formData()
    const file = body.get('cv-file') as File | null

    // Validate the file before proceeding
    validateFile(file)

    // Step 2: Upload the file to Supabase
    const uniqueFileName = await uploadFile(file!)

    // Step 3: Download the file from Supabase
    const pdfBuffer = await downloadFile(uniqueFileName)

    // Step 4: Extract text from the PDF
    const extractedText = await extractTextFromPDF(pdfBuffer)
    console.log('Extracted text:', extractedText)

    // Step 5: Redirect to the next step
    return redirect('/upload/step2')
  } catch (err: any) {
    console.error('Error during file processing:', err.message || err)
    throw new Error('File processing failed. Please try again.')
  }
}

export function ErrorBoundary() {
  // @ts-ignore
  const { message } = useRouteError()
  return (
    <div className="text-red-500 flex flex-col gap-4">
      <h1>Unexpected Error</h1>
      <p>{message || 'Something went wrong'}</p>
      <Button>
        <a href="/upload/step1">Try again</a>
      </Button>
    </div>
  )
}

const step1 = () => {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] || null

    if (uploadedFile && uploadedFile.size > 2 * 1024 * 1024) {
      // 2MB limit
      setError('File size exceeds the 2MB limit.')
      return
    }

    if (
      uploadedFile &&
      ![
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ].includes(uploadedFile.type)
    ) {
      setError('Only PDF and DOCX files are allowed.')
      return
    }
    setError(null)
    setFile(uploadedFile)
  }

  return (
    <Form method="post" encType="multipart/form-data">
      <div className="bg-white shadow-[0_0_100px_100px_rgba(255,255,255,1)] rounded-lg p-6 my-5 w-[566px] border">
        <h3>Upload your resume</h3>
        <span className="text-xs">Accepted types: PDF, docx</span>
        <div
          className={cn(
            'relative w-full py-9 border border-dashed rounded-[10px] text-center mt-4',
            error && 'border-red-200',
          )}
        >
          {(file?.name && !error) || 'Drop file'}
          {error && (
            <span className="block w-full text-red-500 text-xs absolute bottom-2">
              {error}
            </span>
          )}
        </div>
        <span className="w-full text-center block text-xs mt-4">or</span>
        <div className="flex justify-center">
          <input
            type="file"
            id="file-upload"
            name="cv-file"
            className="hidden"
            onChange={handleFileChange}
            required
            aria-label="Upload your resume"
          />
          <Button
            disabled={isSubmitting}
            asChild
            variant={'outline'}
            className="mt-4 bg-transparent cursor-pointer h-auto"
          >
            <label htmlFor="file-upload" className="h-full">
              Choose file
            </label>
          </Button>
        </div>
      </div>
      <Button disabled={!file || isSubmitting} type="submit" className="w-full">
        {!isSubmitting ? 'Go to adding a job' : 'Loading...'}
      </Button>
    </Form>
  )
}

export default step1