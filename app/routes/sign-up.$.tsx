import { SignUp } from '@clerk/remix'

export default function SignUpPage() {
  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center gap-8'>
      <h1>Sign Up route</h1>
      <SignUp />
    </div>
  )
}