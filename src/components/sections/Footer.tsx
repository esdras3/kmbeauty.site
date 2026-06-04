import Link from "next/link";
import { SiteLogo } from "@/components/ui/SiteLogo";
import { kmbeautyOfficial } from "@/content/kmbeautyOfficial";

export function Footer() {
  return (
    <footer className="bg-black pb-8 pt-16 text-white/[0.74]">
      <div className="container-km px-4 md:px-8">
        <div className="mb-12 grid gap-10 md:grid-cols-3">
          <div>
            <SiteLogo variant="footer" />
            <p className="mb-5 mt-4 text-sm leading-7">
              {kmbeautyOfficial.brand.description}
            </p>
            <div className="flex gap-3">
              <a
                href={kmbeautyOfficial.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-km-gold hover:text-km-gold"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={kmbeautyOfficial.contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-km-gold hover:text-km-gold"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Navegacao
            </div>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Inicio", href: "/" },
                { label: "Sobre nos", href: "/sobre-nos" },
                { label: "Procedimentos Faciais", href: "/procedimentos-faciais" },
                { label: "Procedimentos Corporais", href: "/procedimentos-corporais" },
                { label: "Tecnologias", href: "/tecnologias" },
                { label: "Contato", href: "/contato" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-km-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={kmbeautyOfficial.links.mentorships}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-km-gold"
                >
                  Mentorias
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Contato
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-km-gold">📞</span>
                <a
                  href={`tel:+${kmbeautyOfficial.contact.whatsappNumber}`}
                  className="transition-colors hover:text-km-gold"
                >
                  {kmbeautyOfficial.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-km-gold">📍</span>
                <span>
                  {kmbeautyOfficial.contact.addressLine1}
                  <br />
                  {kmbeautyOfficial.contact.addressLine2}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-km-gold">🕐</span>
                <span>
                  {kmbeautyOfficial.contact.schedule[0]}
                  <br />
                  {kmbeautyOfficial.contact.schedule[1]}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs md:flex-row">
          <span>
            © {new Date().getFullYear()} KM Beauty — Dra. Kelly Macedo. Todos os
            direitos reservados.
          </span>
          <Link href="/crm" className="text-white/45 transition-colors hover:text-white/75">
            Área restrita
          </Link>
        </div>
      </div>
    </footer>
  );
}
