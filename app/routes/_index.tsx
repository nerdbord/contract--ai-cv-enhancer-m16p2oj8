import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";
import { ImageUploader } from "~/components/ImageUploader";

import {
  ActionFunctionArgs,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { useLoaderData, useActionData } from "@remix-run/react";
import { getImageUrl, supabaseUploadHandler } from "~/supabase.server";

export const meta: MetaFunction = () => {
  return [
    { title: "AI cv enhancer app." },
    { name: "description", content: "Welcome to AI CV enhancer app!" },
  ];
};

// We just retrieve the image by providing the same path as below,
// obviously this is for demo purposes and this would be smarter
// in your application
export const loader = () => {
  // Gets the public image url so we can show it To tylko do testowania!
  return { imageUrl: getImageUrl("portfolio-01.jpg") };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await unstable_parseMultipartFormData(
    request,
    supabaseUploadHandler()
  );
  console.log(formData.get("file"));
  const filePath = formData.get("file");
  if (!filePath) {
    return { succes: false, error: "File upload failed!" };
  }
  return { succes: true, fileUrl: getImageUrl(filePath as string) };
};

type ActionData = {
  success: boolean;
  error?: string;
  fileUrl?: string;
};
export default function Index() {
  const actionData = useActionData<ActionData>();
  const { imageUrl } = useLoaderData<typeof loader>();
  return (
    <div className="min-h-screen m-auto">
      <Header />
      <h1>Index Route</h1>
      {actionData?.success ? (
        <div className="success-message">Plik został przesłany!</div>
      ) : actionData?.error ? (
        <div className="error-message">{actionData.error}</div>
      ) : null}
      <img src={imageUrl} alt="" />
      <ImageUploader />
    </div>
  );
}
