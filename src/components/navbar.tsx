"use client";

import { useState } from "react";
import { Menu, X, Calculator } from "lucide-react";

const links = [
  { href: "#sluzby", label: "Služby" },
  { href: "#o-mne", label: "O mně" },
  { href: "#cenik", label: "Ceník" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-primary font-bold text-lg">
            <Calculator className="h-6 w-6 text-accent" />
            <span>Účetnictví Kotmanová</span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-muted hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#kontakt"
              className="rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-accent-light transition-colors"
            >
              Nezávazná konzultace
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-text-muted"
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 space-y-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-text-muted hover:text-primary hover:bg-bg-soft rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="block mx-3 text-center rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-accent-light transition-colors"
            >
              Nezávazná konzultace
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
