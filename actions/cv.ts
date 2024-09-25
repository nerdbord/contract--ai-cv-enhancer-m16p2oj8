import { z } from "zod";
import { prisma } from "lib/prisma";

export const CVSchema = z.object({
  name: z.string(),
  contact: z.object({
    email: z.string().email(),
    phone: z.string(),
    portfolio: z.string().optional(),
    linkedin: z.string().optional(),
  }),
  skills: z.array(z.string()),
  technologies: z.array(z.string()),
  experience: z.array(
    z.object({
      company: z.string(),
      position: z.string(),
      duration: z.string(),
      description: z.string(),
    })
  ),
  education: z.array(
    z.object({
      institution: z.string(),
      degree: z.string(),
      duration: z.string(),
    })
  ),
});

type SaveCVParams = {
  fileBuffer: Buffer;
  name: string;
  fileName: string;
  mimeType: string;
  userId: string;
  extractedText: string;
};

// Function to save the CV to the database
export async function saveCV({
  fileBuffer,
  name,
  fileName,
  mimeType,
  userId,
  extractedText,
}: SaveCVParams) {
  try {
    const savedCV = await prisma.cV.create({
      data: {
        cv: fileBuffer,
        name: name,
        fileName: fileName,
        mimeType: mimeType,
        userId: userId,
        extractedText: extractedText,
      },
    });
    return savedCV;
  } catch (error) {
    console.error("Error saving CV:", error);
    throw new Error("Failed to save CV");
  }
}
