import { ActionFunctionArgs } from '@remix-run/node'
import { redirect, useNavigation } from '@remix-run/react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { formCookie } from '~/lib/cookies'

export const action = async ({ request }: ActionFunctionArgs) => {
  // Step 1: Get form data
  const formData = await request.formData()
  const jobTitle = formData.get('jobTitle') as string
  const companyName = formData.get('companyName') as string
  const jobDescription = formData.get('jobDescription') as string

  // Step 2: Retrieve the current cookie value
  const cookieHeader = request.headers.get('Cookie')
  const existingData = (await formCookie.parse(cookieHeader)) || {}
  console.log(existingData)

  // Step 3: Update the cookie with new data
  const updatedData = {
    resumeText: existingData, // Keep existing extractedText
    jobTitle, // Add new data
    companyName,
    jobDescription,
  }

  // Step 4: Serialize and set the updated cookie
  const updatedCookieHeader = await formCookie.serialize(updatedData)

  // Step 5: Redirect to the next step, with the updated cookie
  return redirect('/upload/step3', {
    headers: {
      'Set-Cookie': updatedCookieHeader,
    },
  })
}

const step2 = () => {
  const [jobTitle, setJobTitle] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [jobDescription, setJobDescription] = useState('')

  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <form method="post" className="w-full max-w-md space-y-4">
      <div>
        <label
          htmlFor="jobTitle"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Job title
        </label>
        <Input
          id="jobTitle"
          name="jobTitle"
          placeholder="Position you apply for. Eg. Senior product designer."
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label
          htmlFor="companyName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Company name
        </label>
        <Input
          id="companyName"
          name="companyName"
          placeholder="Name of the company you apply to."
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
      </div>

      <div>
        <label
          htmlFor="jobDescription"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Job description
        </label>
        <Textarea
          id="jobDescription"
          name="jobDescription"
          placeholder="Paste the text of job offer description."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          required
        />
      </div>

      <Button
        disabled={!jobTitle || !jobDescription || !companyName || isSubmitting}
        type="submit"
        className="w-full"
      >
        Start enhancing my resume
      </Button>
    </form>
  )
}

export default step2
