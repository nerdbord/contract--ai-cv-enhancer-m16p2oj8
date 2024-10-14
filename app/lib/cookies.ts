import { createCookie } from '@remix-run/node'

export const cvCookie = createCookie('cv-data', {
  maxAge: 60 * 60, // 1 hour expiration
})

export const jobDetailsCookie = createCookie('job-data', {
  maxAge: 60 * 60, // 1 hour expiration
})

export const enhancedCvCookie = createCookie('enhanced-cv-data', {
  maxAge: 60 * 60, // 1 hour expiration
})
