import { LoaderFunction, redirect, ActionFunction } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { useActionData, useLoaderData } from "@remix-run/react";
import { saveCV, CVSchema } from "actions/cv";
import { getUserByClerkId } from "actions/user";
import { generateObject } from "ai";
import { openai } from "lib/openai";

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  if (!userId) return redirect("/sign-in");

  const user = await getUserByClerkId(userId);
  const userDBId = user?.id;
  if (!userDBId) return redirect("/sign-in");
  return { userDBId };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const name = formData.get("textInput") as string;
  const userId = formData.get("userDBId") as string;

  if (!file) {
    return { message: "No file uploaded" };
  }

  if (!userId) {
    return { message: "User ID is missing." };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = file.name;
    const mimeType = file.type;

    // Hypothetical function - replace with the correct function from the SDK if available
    let structuredCVData = null;
    try {
      structuredCVData = await generateObject({
        model: openai("gpt-4o"),
        schema: CVSchema,
        fileBuffer: buffer,
        fileMimeType: mimeType,
        prompt:
          "Please extract and structure the information from the attached CV.",
      });
    } catch (error) {
      console.error("Error generating structured data from file:", error);
      return { message: "Failed to generate structured data from CV." };
    }

    const savedCV = await saveCV({
      fileBuffer: buffer,
      userId,
      name,
      fileName,
      mimeType,
      extractedText: JSON.stringify(structuredCVData),
    });

    return {
      message: `File ${fileName} uploaded and saved to database successfully.`,
      cvId: savedCV.id,
      structuredData: structuredCVData,
    };
  } catch (error) {
    return { message: "Error uploading file.", error };
  }
};

export default function DashboardRoute() {
  const actionData = useActionData<{
    message: string;
    structuredData?: Record<string, unknown>;
  }>();
  const loaderData = useLoaderData<{ userDBId: string }>();

  return (
    <main className="flex flex-col h-screen items-center justify-start gap-16 p-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p>Upload your CV here:</p>
      <form
        className="flex flex-col gap-4"
        method="post"
        encType="multipart/form-data"
      >
        {/* the hidden input field to pass the userDBId to the action */}
        <input type="hidden" name="userDBId" value={loaderData.userDBId} />
        <input type="file" name="file" required />
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            id="textInput"
            name="textInput"
            placeholder="Give your CV a name, e.g., 'original CV'"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Upload File
        </button>
      </form>
      {actionData && (
        <div className="mt-4 text-green-500">
          <p>{actionData.message}</p>
          {actionData.structuredData && (
            <pre className="bg-gray-100 p-4 rounded-md mt-4">
              <code>{JSON.stringify(actionData.structuredData, null, 2)}</code>
            </pre>
          )}
        </div>
      )}
    </main>
  );
}
