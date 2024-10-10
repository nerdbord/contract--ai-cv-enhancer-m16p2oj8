import type { MetaFunction } from '@remix-run/node'
import hero from '~/assets/hero.png'
import Logo from '~/components/Logo'
import { Button } from '~/components/ui/button'

export const meta: MetaFunction = () => {
  return [
    { title: 'AI CV Enhancer' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  return (
    <div className="max-w-screen-lg min-h-screen mx-auto my-24">
      {/* header */}
      <header className="w-full flex justify-between items-center z-10 mb-20 p-5">
        <Logo className="z-10" />
        <div className="space-x-3">
          <Button variant="outline" className="bg-white">
            Login
          </Button>
          <Button variant="outline" className="border-slate-400 bg-white">
            Register
          </Button>
        </div>
      </header>

      <div className="flex justify-between">
        {/* left */}
        <div>
          <div className="bg-white shadow-[0_0_100px_100px_rgba(255,255,255,1)] rounded-lg p-5 w-[566px]">
            <h1>
              Improve your resume to<span className="block">fit the offer</span>
            </h1>
            <p>
              Upload your resume and job offer to see how we improved it.
              <span className="block">
                Boost your chances on getting a job.
              </span>
            </p>
            <div className="flex items-center justify-between gap-5 my-8 font-medium text-xs">
              <span>Check the improvements</span>
              <span className="size-[10px] bg-slate-800 rotate-45"></span>
              <span>Scan for ATS</span>
              <span className="size-[10px] bg-slate-800 rotate-45"></span>
              <span>Get personalized design</span>
              <span className="size-[10px] bg-slate-800 rotate-45"></span>
              <span>Simple editing</span>
            </div>

            <Button>Improve my resume</Button>
          </div>
        </div>
        {/* right */}
        <img src={hero} />
        <div></div>
      </div>
    </div>
  )
}
