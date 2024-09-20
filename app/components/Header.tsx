import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/remix";

export default function Header() {
  return (
    <header className="w-full h-32 px-4 py-6 border-b-2 shadow-sm">
      <nav className="flex justify-end items-center gap-4">
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
      </nav>
    </header>
  );
}
