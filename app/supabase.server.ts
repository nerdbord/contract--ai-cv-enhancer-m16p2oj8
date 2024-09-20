import { UploadHandler } from "@remix-run/node";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4} from "uuid"; 

export const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_TOKEN!
  );

  export const supabaseBucket = supabase.storage.from(
    process.env.SUPABASE_BUCKET!
  );

  export const supabaseUploadHandler =
  (): UploadHandler =>
  async ({ data, filename }) => {
    if(!filename) return null;
    const chunks = [];
    for await (const chunk of data) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    const folder = "user-uploads";
    // Create a unique file name with UUID to avoid special characters:
    const uniqueFilename = `${folder}/${uuidv4()}.${filename.split(".").pop()}`
    // If there's no filename, it's a text field and we can return the value directly
    if (!filename) {
      const textDecoder = new TextDecoder();
      return textDecoder.decode(buffer);
    }
    // Otherwise, it's an image and we'll save it to Supabase
    const { data: fileData, error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET!)
      .upload(uniqueFilename, buffer, { upsert: true });
    if (error) {
      // TODO Add error handling
      console.log("Supabase upload error: ", error);
      return null;
    }
    return fileData?.path || null;
  };

// Used to retrieve the image public url from Supabase
export const getImageUrl = (path: string) => {
  return supabaseBucket.getPublicUrl(path).data.publicUrl;
};