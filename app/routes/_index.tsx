import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "AI cv enhancer app." },
    { name: "description", content: "Welcome to AI CV enhancer app!" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>Hello from index page Hello</h1>
      <Button>testowy button</Button>
    </div>
    
  );
}

