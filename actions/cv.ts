import { prisma } from "lib/prisma";

type SaveCVParams = {
  fileBuffer: Buffer;
  name: string;
  fileName: string;
  mimeType: string;
  userId: string;
};

export async function saveCV({
  fileBuffer,
  name,
  fileName,
  mimeType,
  userId,
}: SaveCVParams) {
  try {
    const savedCV = await prisma.cV.create({
      data: {
        cv: fileBuffer, // Store the file buffer as bytes
        name: name,
        fileName: fileName,
        mimeType: mimeType,
        userId: userId, // Reference to the user in the User model
      },
    });
    return savedCV;
  } catch (error) {
    console.error("Error saving CV:", error);
    throw new Error("Failed to save CV");
  }
}
