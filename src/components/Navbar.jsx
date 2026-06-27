import { Link } from "react-router-dom";

export default function Navbar() {
  const links = [
    ["/", "Home"],
    ["/framework", "Framework"],
    ["/whitepaper", "Whitepaper"],
    ["/research", "Research"],
    ["/docs", "Docs"],
    ["/about", "About"],
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-[#05070D]/80 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        <Link
          to="/"
          className="text-3xl font-bold text-sky-400"
        >
          Decision Security Engineering
        </Link>

        <div className="flex items-center gap-8 text-slate-300">
          {links.map(([to, label]) => (
            <Link
              key={to}
              to={to}
              className="transition hover:text-sky-400"
            >
              {label}
            </Link>
          ))}

          <a
            href="https://github.com/LOLA0786/PrivateVault.ai"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-slate-700 px-4 py-2 hover:border-sky-400"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
