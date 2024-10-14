// /app/lib/schemas/classicCVTemplateSchema.ts
import { z } from 'zod'

// ContactType schema
export const contactSchema = z.object({
  phone: z.string(),
  email: z.string().email(),
  linkedin: z.string().optional(),
})

// ExperienceType schema
export const experienceSchema = z.object({
  company: z.string(),
  sector: z.string(),
  companyType: z.string(),
  position: z.string(),
  duration: z.string(),
  description: z.string(),
})

// EducationType schema
export const educationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  fieldOfStudy: z.string(),
  duration: z.string(),
})

// CertificateType schema
export const certificateSchema = z.object({
  certTitle: z.string(),
  certDate: z.string(),
})

// ClassicCVTemplate schema
export const classicCVTemplateSchema = z.object({
  name: z.string(),
  positionTitle: z.string(),
  portfolio: z.string().optional(),
  contact: contactSchema,
  technologies: z.array(z.string()),
  summary: z.string(),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(z.string()),
  certificates: z.array(certificateSchema),
  company: z.string(),
})

export type CVData = z.infer<typeof classicCVTemplateSchema>
