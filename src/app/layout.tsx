import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { WhatsAppFab } from "@/components/sections/WhatsAppFab";
import { LuisaChatWidget } from "@/components/sections/LuisaChatWidget";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "KM Beauty — Estética Avançada | Dra. Kelly Macedo",
  description:
    "Clinica de estetica avancada em Curitiba. Endolaser, harmonizacao facial, protocolos corporais e tecnologias de ultima geracao com a Dra. Kelly Macedo.",
  keywords: [
    "estetica",
    "Curitiba",
    "harmonizacao facial",
    "endolaser",
    "Dra Kelly Macedo",
    "KM Beauty",
  ],
  openGraph: {
    title: "KM Beauty — Estetica Avancada",
    description: "Tecnologia, acolhimento e beleza com resultado natural.",
    url: "https://kmbeauty.com.br",
    siteName: "KM Beauty",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body>
        {children}
        <WhatsAppFab />
        <LuisaChatWidget />
      </body>
    </html>
  );
}
