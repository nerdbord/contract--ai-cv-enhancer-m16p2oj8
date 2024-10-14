import { createCookie } from '@remix-run/node'

export const formCookie = createCookie('form-data', {
  maxAge: 60 * 60, // 1 hour expiration
})
