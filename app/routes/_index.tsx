import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/remix";

export const meta: MetaFunction = () => {
  return [
    { title: "AI CV Enhancer" },
    {
      name: "description",
      content:
        "AI CV Enhancer is a tool that improves and optimizes your CV using artificial intelligence.",
    },
    {
      name: "keywords",
      content:
        "AI CV Enhancer, CV optimization, resume improvement, artificial intelligence, job application, CV builder",
    },
    { name: "author", content: "PA DreamTeam" },
  ];
};

export default function Index() {
  return (
    <main className="flex flex-col h-screen items-center justify-center">
      <div>
        <h1>Index Route</h1>
        <div className="flex gap-4">
          {" "}
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
      </div>
      app
      <Link to="/dashboard">dashboard</Link>
    </main>
  );
}

//const resources = [];
