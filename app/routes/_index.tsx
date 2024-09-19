import type { MetaFunction } from "@remix-run/node";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/remix";
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
      <h1>Index Route</h1>
      <Button>Testowy button</Button>
      <SignedIn>
        <p>You are signed in!</p>
        <div>
          <p>View your profile here</p>
          <UserButton />
        </div>
        <div>
          <SignOutButton />
        </div>
      </SignedIn>
      <SignedOut>
        <p>You are signed out</p>
        <div>
          <SignInButton />
        </div>
        <div>
          <SignUpButton />
        </div>
      </SignedOut>
    </div>
  );
}
