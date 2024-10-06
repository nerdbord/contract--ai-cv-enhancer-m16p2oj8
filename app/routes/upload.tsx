import { Button } from '~/components/ui/button'
import Logo from '~/components/ui/Logo'

const upload = () => {
  return (
    <div className="max-w-screen-lg min-h-screen mx-auto">
      <header className="w-full pt-16">
        <Logo />
      </header>

      <div className="flex items-center justify-center flex-col">
        <div>
          <div className="bg-white shadow-[0_0_100px_100px_rgba(255,255,255,1)] rounded-lg p-6 my-5 w-[566px] border">
            <h3>Upload your resume</h3>
            <span className="text-xs">Accepted types: PDF, docx</span>
            <div className="w-full py-9 border border-dashed rounded-[10px] text-center mt-4">
              Drop file
            </div>
            <span className="w-full text-center block text-xs mt-4">or</span>
            <div className="flex justify-center">
              <Button variant={'outline'} className="mt-4 bg-transparent">
                Choose file
              </Button>
            </div>
          </div>
          <Button className="w-full">Go to adding a job</Button>
        </div>
      </div>
    </div>
  )
}

export default upload
