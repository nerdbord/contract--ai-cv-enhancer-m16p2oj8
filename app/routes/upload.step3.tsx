import { LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { CV } from '~/components/CV/CV'
import { Button } from '~/components/ui/button'
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

  // console.log('extractedCV')
  // console.log(extractedCV)
  // console.log('jobData')
  // console.log(jobData)
  // console.log('enhancedCv')
  // console.log(enhancedCv)

  return (
    <>
      {extractedCV && jobData ? (
        <div>
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              {/* <Logo /> */}
              {/* <div className="flex space-x-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${step === 3 ? 'border-blue-600 text-blue-600' : 'border-gray-300 text-gray-300'}`}
                >
                  {step}
                </div>
                {step < 3 && <div className="w-8 h-0.5 bg-gray-300"></div>}
              </div>
            ))}
          </div> */}
              {/* <Stepper /> */}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Link to="/upload/step1">Adjust to next offer</Link>
              </Button>
              <Button>Login to download</Button>
            </div>
          </header>

          <main className="grid md:grid-cols-2 gap-8 mb-4">
            <div>
              <h2 className="text-xl font-semibold mb-4">Before</h2>
              <CV data={enhancedCv} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">After</h2>
              <CV data={enhancedCv} />
            </div>
          </main>
        </div>
      ) : (
        <div>no cookie</div>
      )}
    </>
  )
}

export default step3
