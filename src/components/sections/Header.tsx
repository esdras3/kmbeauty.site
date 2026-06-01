"use client";

import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-km-surface/95 backdrop-blur-sm border-b border-km-border shadow-sm">
      <div className="container-km flex items-center justify-between h-16 px-4 md:px-8">
        <Link href="/" className="font-heading font-bold text-xl text-km-dark tracking-tight">
          <span className="text-km-gold">KM</span> Beauty
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-km-muted">
          <Link href="/#procedimentos" className="hover:text-km-gold transition-colors">Procedimentos</Link>
          <Link href="/#sobre" className="hover:text-km-gold transition-colors">Sobre</Link>
          <Link href="/contato" className="hover:text-km-gold transition-colors">Contato</Link>
        </nav>
        <Link href="/contato" className="hidden md:inline-flex btn-primary text-sm">
          Agendar Avaliação
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-km-dark"
          aria-label="Menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            }
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-km-surface border-t border-km-border px-4 py-4 flex flex-col gap-4 text-sm font-medium">
          <Link href="/#procedimentos" onClick={() => setMenuOpen(false)} className="text-km-muted hover:text-km-gold">Procedimentos</Link>
          <Link href="/#sobre" onClick={() => setMenuOpen(false)} className="text-km-muted hover:text-km-gold">Sobre</Link>
          <Link href="/contato" onClick={() => setMenuOpen(false)} className="text-km-muted hover:text-km-gold">Contato</Link>
          <Link href="/contato" onClick={() => setMenuOpen(false)} className="btn-primary text-center">Agendar Avaliação</Link>
        </div>
      )}
    </header>
  );
}
