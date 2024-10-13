import { Outlet } from '@remix-run/react'
import Logo from '~/components/Logo'
import Stepper from '~/components/Stepper'

const upload = () => {
  return (
    <div className="max-w-screen-lg min-h-screen mx-auto">
      <header className="w-full pt-16">
        <Logo />
      </header>

      <div className="flex items-center justify-center flex-col">
        <Stepper />

        <Outlet />
      </div>
    </div>
  )
}

export default upload
