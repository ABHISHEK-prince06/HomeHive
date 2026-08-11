import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const logoImage = new URL('../../../Home Hive.png', import.meta.url).href;

const navItems = [
  { label: 'Services', to: '/search?service=All' },
  { label: 'How it works', to: '/#how-it-works' },
  { label: 'Nearby', to: '/search?service=Electrician' },
  { label: 'Saved', to: '/search?service=Plumber' },
  { label: 'Pricing', to: '/pricing' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    const term = query.trim() || 'Electrician';
    navigate(`/search?service=${encodeURIComponent(term)}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold tracking-tight text-slate-900">
          <img src={logoImage} alt="HomeHive" className="h-9 w-9 rounded-2xl object-cover shadow-sm ring-1 ring-emerald-100" />
          <span>HomeHive</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `transition-colors ${isActive ? 'text-slate-900' : 'hover:text-slate-900'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden flex-1 justify-center px-3 xl:flex">
          <div className="flex w-full max-w-md items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20L16.65 16.65" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
              placeholder="Search for a service"
              className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-slate-800"
            >
              Search
            </button>
          </div>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <Link to="/join-provider" className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100">
            Become a Professional
          </Link>
          <Link to="/login" className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">
            Log in
          </Link>
          <Link to="/register" className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(16,185,129,0.28)] transition hover:bg-emerald-500">
            Get Started
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:hidden">
          <Link to="/login" className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">Log in</Link>
          <Link to="/register" className="rounded-full bg-emerald-600 px-3 py-2 text-xs font-semibold text-white">Start</Link>
        </div>
      </div>
    </header>
  );
}
