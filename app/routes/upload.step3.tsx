import { LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
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

  const downloadCV = async () => {
    const element = document.getElementById('cv-to-download')

    if (element) {
      // Capture the content of the CV
      const canvas = await html2canvas(element, { scale: 1.5 }) // Use scale 1 for normal size
      const pdf = new jsPDF('p', 'mm', 'a4') // 'p' for portrait, 'mm' for mm, 'a4' for A4 size

      const imgData = canvas.toDataURL('image/png')
      const imgWidth = pdf.internal.pageSize.getWidth() // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width // Maintain aspect ratio
      const pageHeight = pdf.internal.pageSize.getHeight() // A4 height in mm
      let heightLeft = imgHeight

      let position = 0

      // Add the first image to the PDF
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // If the image height exceeds one page, add more pages
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Save the PDF with a specified filename
      pdf.save('cv.pdf')
    }
  }

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
              <Button onClick={downloadCV}>Download CV</Button>
            </div>
          </header>

          <main className="grid md:grid-cols-2 gap-8 mb-4">
            {/* <div>
              <h2 className="text-xl font-semibold mb-4">Before</h2>
              <CV data={enhancedCv} />
            </div> */}
            <div>
              <h2 className="text-xl font-semibold mb-4">After</h2>
              <div
                id="cv-to-download"
                className="w-[210mm] h-[296mm] box-border"
              >
                <CV data={enhancedCv} />
              </div>
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
