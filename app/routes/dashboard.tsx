import { LoaderFunction, redirect, ActionFunction } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { useActionData } from "@remix-run/react";

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  if (!userId) return redirect("/sign-in");
  return { data: { userId } };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return { message: "No file uploaded." };
  }

  console.log("Uploaded file:", {
    name: file.name,
    size: file.size,
    type: file.type,
  });

  return { message: `File ${file.name} uploaded successfully.` };
};

export default function DashboardRoute() {
  const actionData = useActionData<{ message: string }>();

  return (
    <main className="flex flex-col h-screen items-center justify-center h-[calc(100vh-80px)]">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <form method="post" encType="multipart/form-data">
        <input type="file" name="file" />
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
