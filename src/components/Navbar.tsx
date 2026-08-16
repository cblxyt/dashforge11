import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Compatibility', to: '/vehicles' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-neutral-800/70 bg-[#08080f]/80 backdrop-blur-xl dark:border-neutral-800/70 dark:bg-[#08080f]/80 light:border-neutral-200 light:bg-neutral-50/80' : 'border-b border-transparent bg-transparent'}`}>
      <nav className="container-edge section-pad-x flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Link to="/" aria-label="DashForge home" className="shrink-0"><Logo /></Link>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${isActive ? 'text-accent-400' : 'text-neutral-400 hover:bg-neutral-800/40 hover:text-white'}`}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />
          <Link to="/#contact" className="btn-primary hidden sm:inline-flex !px-5 !py-2.5 text-[13px]">Book Install</Link>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={open} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-neutral-200 lg:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${open ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="container-edge section-pad-x border-t border-neutral-800/70 bg-[#08080f]/95 py-4 backdrop-blur-xl">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `rounded-xl px-3 py-3 text-base font-medium ${isActive ? 'text-accent-400' : 'text-neutral-200 hover:bg-neutral-800/60'}`}>{l.label}</NavLink>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <ThemeToggle />
            <Link to="/#contact" className="btn-primary flex-1 !py-3">Book Install</Link>
            <a href="tel:+14045676287" className="btn-secondary !px-4 !py-3" aria-label="Call"><Phone className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </header>
  );
}
