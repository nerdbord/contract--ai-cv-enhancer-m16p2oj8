import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import CVDisplay from '~/components/CVDisplay'
import { cvCookie, enhancedCvCookie, jobDetailsCookie } from '~/lib/cookies'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookieHeader = request.headers.get('Cookie')

  const extractedCV = await cvCookie.parse(cookieHeader)
  const jobData = await jobDetailsCookie.parse(cookieHeader)
  const enhancedCv = await enhancedCvCookie.parse(cookieHeader)

  return { extractedCV, jobData, enhancedCv }
}

const step3 = () => {
  // @ts-ignore
  const { extractedCV, jobData, enhancedCv } = useLoaderData()

  return (
    <>
      {extractedCV && jobData ? (
        <div>
          ImproveResume
          <h6>jobTitle</h6>
          <p className="text-green-600">{jobData.jobTitle}</p>
          <h6>companyName</h6>
          <p className="text-green-600">{jobData.companyName}</p>
          <h6>jobDescription</h6>
          <p className="text-green-600">{jobData.jobDescription}</p>
          <h6>CV</h6>
          <p className="text-green-600">{extractedCV}</p>
          <hr />
          <CVDisplay data={enhancedCv} />
        </div>
      ) : (
        <div>no cookie</div>
      )}
    </>
  )
}

export default step3
