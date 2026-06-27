import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#03050A] py-16">
      <div className="mx-auto max-w-7xl px-8 text-center">

        <h2 className="text-3xl font-bold">
          Decision Security Engineering
        </h2>

        <p className="mt-4 text-slate-400">
          Engineering Trust Before Execution
        </p>

        <div className="mt-8 flex justify-center gap-8 text-slate-400">

          <Link to="/">Home</Link>
          <Link to="/framework">Framework</Link>
          <Link to="/whitepaper">Whitepaper</Link>
          <Link to="/research">Research</Link>
          <Link to="/docs">Docs</Link>

        </div>

        <p className="mt-10 text-sm text-slate-500">
          © 2026 Decision Security Engineering
        </p>

      </div>
    </footer>
  );
}
