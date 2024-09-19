import type { MetaFunction } from '@remix-run/node'
import { Button } from '~/components/ui/button'

export const meta: MetaFunction = () => {
  return [
    { title: 'AI CV Enhancer' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center flex-col gap-2">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        AI CV Enhancer
      </h1>
      <Button>Click me</Button>
    </div>
  )
}
