import { generateObject } from 'ai'
import { classicCVTemplateSchema } from '~/lib/schemas/classicCVTemplateSchema'
import { openai } from '~/openAI.config'
import { cvEnhancePrompt } from '~/prompts/CV'

export const enhance = async (
  resumeText: string,
  jobTitle: string,
  companyName: string,
  jobDescription: string,
) => {
  const PROMPT = cvEnhancePrompt(
    resumeText,
    jobTitle,
    companyName,
    jobDescription,
  )
  const result = await generateObject({
    model: openai('gpt-4o'),
    schema: classicCVTemplateSchema,
    messages: [
      {
        role: 'user',
        content: [{ type: 'text', text: PROMPT }],
      },
    ],
  })

  return { type: 'success', enhancedCv: result.object }
}
