import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'

const step2 = () => {
  const [jobTitle, setJobTitle] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [jobDescription, setJobDescription] = useState('')

  return (
    <form className="w-full max-w-md space-y-4">
      <div>
        <label
          htmlFor="jobTitle"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Job title
        </label>
        <Input
          id="jobTitle"
          placeholder="Position you apply for. Eg. Senior product designer."
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
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
          placeholder="Name of the company you apply to."
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
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
          placeholder="Paste the text of job offer description."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full">
        Start enhancing my resume
      </Button>
    </form>
  )
}

export default step2
