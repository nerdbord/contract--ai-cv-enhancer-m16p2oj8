import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { formCookie } from '~/lib/cookies'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookieHeader = request.headers.get('Cookie')
  const cookieData = await formCookie.parse(cookieHeader)

  return { cookieData }
}

const step3 = () => {
  // @ts-ignore
  const { cookieData } = useLoaderData()

  return (
    <>
      {cookieData ? (
        <div>
          ImproveResume
          <h6>jobTitle</h6>
          <p className="text-green-600">{cookieData.jobTitle}</p>
          <h6>companyName</h6>
          <p className="text-green-600">{cookieData.companyName}</p>
          <h6>jobDescription</h6>
          <p className="text-green-600">{cookieData.jobDescription}</p>
          <h6>CV</h6>
          <p className="text-green-600">{cookieData.resumeText}</p>
        </div>
      ) : (
        <div>no cookie</div>
      )}
    </>
  )
}

export default step3
