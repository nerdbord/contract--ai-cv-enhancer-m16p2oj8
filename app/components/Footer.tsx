import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <footer className="text-xs text-muted-foreground flex items-center justify-center gap-3 py-4">
      <span>Made by</span>
      <Link to="https://github.com/AniaPiWo">
        <span className="underline hover:text-slate-800">Ania</span>
      </Link>
      <Link to="https://www.linkedin.com/in/ppuzuk/">
        <span className="underline hover:text-slate-800">Paula</span>
      </Link>
      <Link to="https://www.linkedin.com/in/ma%C5%82gorzata-krawczuk/">
        <span className="underline hover:text-slate-800">Gosia</span>
      </Link>
    </footer>
  );
}
