import { ActionFunctionArgs } from '@remix-run/node'
import { Form, redirect, useNavigation } from '@remix-run/react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '~/components/ui/button'
import { supabase } from '~/supabaseClient'

// Action to handle form submission
export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData()

  const file = body.get('cv-file') as File | null

  if (file) {
    const uniqueFileName = `${uuidv4()}-${file.name}`
    const { data, error } = await supabase.storage
      .from('resumes')
      .upload(`public/${uniqueFileName}`, file) // this is just for testing now. will be secured later

    if (error) {
      console.error(error)
    } else {
      console.log('File uploaded successfully', data)
    }
  }
  return redirect('/upload/step2')
}

const step1 = () => {
  const [file, setFile] = useState<File | null>(null)

  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] || null

    if (uploadedFile && uploadedFile.size > 2 * 1024 * 1024) {
      // 2MB limit
      alert('File size exceeds the 2MB limit.') // TODO handle error display
      return
    }

    if (
      uploadedFile &&
      ![
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ].includes(uploadedFile.type)
    ) {
      alert('Only PDF and DOCX files are allowed.') // TODO handle error display
      return
    }

    setFile(uploadedFile)
  }

  return (
    <Form method="post" encType="multipart/form-data">
      <div className="bg-white shadow-[0_0_100px_100px_rgba(255,255,255,1)] rounded-lg p-6 my-5 w-[566px] border">
        <h3>Upload your resume</h3>
        <span className="text-xs">Accepted types: PDF, docx</span>
        <div className="w-full py-9 border border-dashed rounded-[10px] text-center mt-4">
          {file?.name || 'Drop file'}
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
