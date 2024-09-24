import { LoaderFunction, redirect } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  if (!userId) return redirect("/sign-in");
  return { data: { userId } };
};

export default function DashboardRoute() {
  return (
    <main className="flex flex-col h-screen items-center justify-center h-[calc(100vh-80px)]">
      <h1 className="text-3xl font-bold">Dashboard</h1>
    </main>
  );
}
