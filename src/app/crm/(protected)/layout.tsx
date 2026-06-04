import type { Metadata } from "next";
import Link from "next/link";
import { KmLogo } from "@/components/crm/KmLogo";
import { logout } from "@/lib/crm/auth";

export const metadata: Metadata = {
  title: "KM Beauty | CRM",
  description: "Painel interno de leads da KM Beauty",
};

export default function CrmProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-km-bg text-km-text">
      <header className="bg-km-surface border-b border-km-border px-4 py-3 md:px-6 flex items-center justify-between gap-4">
        <Link href="/crm/leads" className="shrink-0">
          <KmLogo />
        </Link>
        <nav className="flex items-center gap-1">
          <Link href="/crm/leads" className="text-sm text-km-muted hover:text-km-dark px-3 py-1.5 rounded-md hover:bg-km-bg transition-colors">Leads</Link>
          <Link href="/crm/agenda" className="text-sm text-km-muted hover:text-km-dark px-3 py-1.5 rounded-md hover:bg-km-bg transition-colors">Agenda</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm text-km-muted hover:text-km-dark transition-colors"
          >
            Ver site
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-km-muted hover:text-km-dark transition-colors"
            >
              Sair
            </button>
          </form>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6 md:px-6">{children}</main>
    </div>
  );
}
