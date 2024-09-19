import { SignIn } from '@clerk/remix'

export default function SignInPage() {
  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center gap-8'>
      <h1>Sign In route</h1>
      <SignIn />
    </div>
  )
}