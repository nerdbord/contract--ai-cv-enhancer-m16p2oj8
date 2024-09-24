import { LoaderFunction, redirect, ActionFunction } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { useActionData, useLoaderData } from "@remix-run/react";
import { saveCV } from "actions/cv";
import { getUserByClerkId } from "actions/user";

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

  console.log("Form Data Received:");
  console.log("File:", file);
  console.log("UserDBID => ", userId);

  if (!file) {
    return { message: "No file uploaded" };
  }

  if (!userId) {
    return { message: "user ID missing." };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = file.name;
    const mimeType = file.type;

    const savedCV = await saveCV({
      fileBuffer: buffer,
      userId,
      name,
      fileName,
      mimeType,
    });

    return {
      message: `File ${fileName} uploaded and saved to database successfully.`,
      cvId: savedCV.id,
    };
  } catch (error) {
    return { message: "Error uploading file.", error };
  }
};

export default function DashboardRoute() {
  const actionData = useActionData<{ message: string }>();
  const loaderData = useLoaderData<{ userDBId: string }>();

  console.log("Loader Data:", loaderData);

  return (
    <main className="flex flex-col h-screen items-center justify-start gap-16 p-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p>Upload your CV here:</p>
      <form
        className="flex flex-col gap-4"
        method="post"
        encType="multipart/form-data"
      >
        {/* Use the loader data for the hidden input field */}
        <input type="hidden" name="userDBId" value={loaderData.userDBId} />
        <input type="file" name="file" required />
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            id="textInput"
            name="textInput"
            placeholder=" Give your CV a name, eg. 'original CV'"
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
        <p className="mt-4 text-green-500">{actionData.message}</p>
      )}
    </main>
  );
}
