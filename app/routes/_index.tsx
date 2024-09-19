import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";

import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "AI cv enhancer app." },
    { name: "description", content: "Welcome to AI CV enhancer app!" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen max-w-[1100px] m-auto">
      <Header />
      <h1>Index Route</h1>
      <Button>Testowy button</Button>
    </div>
  );
}
