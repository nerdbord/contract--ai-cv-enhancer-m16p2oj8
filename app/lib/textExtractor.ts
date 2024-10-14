import officeparser from 'officeparser'

export const extractTextFromPDF = async (pdfBuffer: Buffer) => {
  const extractedText = await officeparser.parseOfficeAsync(pdfBuffer)
  if (!extractedText) {
    throw new Error('Failed to extract text from the PDF.')
  }
  return extractedText
}
