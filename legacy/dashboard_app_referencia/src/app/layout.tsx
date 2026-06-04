import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { logout } from "@/lib/auth";
import { KmLogo } from "@/components/KmLogo";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "KM Beauty — Painel de Leads",
  description: "CRM interno da KM Beauty Estética Avançada",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${geist.variable} h-full`}>
      <body className="h-full bg-km-bg antialiased">
        <header className="bg-km-surface border-b border-km-border px-6 py-2 flex items-center justify-between">
          <Link href="/leads">
            <KmLogo height={44} />
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-km-muted hover:text-gray-900 transition-colors"
            >
              Sair
            </button>
          </form>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
