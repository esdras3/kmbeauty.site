"use client";

import { useState } from "react";
import Link from "next/link";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { SiteLogo } from "@/components/ui/SiteLogo";
import { kmbeautyOfficial } from "@/content/kmbeautyOfficial";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [procOpen, setProcOpen] = useState(false);
  const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Sobre nos", href: "/sobre-nos" },
    { label: "Mentorias", href: kmbeautyOfficial.links.mentorships, external: true },
    { label: "Tecnologias", href: "/tecnologias" },
  ];
  const procedureItems = [
    { label: "Procedimentos Faciais", href: "/procedimentos-faciais" },
    { label: "Procedimentos Corporais", href: "/procedimentos-corporais" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.12] bg-black/[0.96] backdrop-blur-md">
      <div className="container-km flex h-20 items-center justify-between px-4 md:px-8">
        <SiteLogo />

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm font-medium text-white/[0.92] transition-colors hover:text-km-gold"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/[0.92] transition-colors hover:text-km-gold"
              >
                {item.label}
              </Link>
            )
          )}

          <div
            className="relative"
            onMouseEnter={() => setProcOpen(true)}
            onMouseLeave={() => setProcOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-white/[0.92] transition-colors hover:text-km-gold">
              Procedimentos
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {procOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-white/[0.12] bg-black/[0.98] shadow-2xl">
                {procedureItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-3 text-sm text-white/90 transition-colors hover:bg-white/5 hover:text-km-gold"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/contato"
            className="text-sm font-medium text-white/[0.92] transition-colors hover:text-km-gold"
          >
            Contato
          </Link>
        </nav>

        <a
          href={getWhatsAppUrl(kmbeautyOfficial.contact.whatsappText)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full bg-km-gold px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-km-gold-hover md:flex"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </a>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-full text-white/[0.94] transition-colors hover:bg-white/5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-black px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => setMenuOpen(false)}
                  className="py-1 text-sm font-medium text-white/90 transition-colors hover:text-km-gold"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-1 text-sm font-medium text-white/90 transition-colors hover:text-km-gold"
                >
                  {item.label}
                </Link>
              )
            )}
            {procedureItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="py-1 text-sm font-medium text-white/90 transition-colors hover:text-km-gold"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contato"
              onClick={() => setMenuOpen(false)}
              className="py-1 text-sm font-medium text-white/90 transition-colors hover:text-km-gold"
            >
              Contato
            </Link>
          </div>
          <a
            href={getWhatsAppUrl(kmbeautyOfficial.contact.whatsappText)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-full bg-km-gold py-3 text-sm font-semibold text-white"
          >
            WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
