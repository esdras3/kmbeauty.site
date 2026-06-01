import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KM Beauty — Estética Avançada | Dra. Kelly Macedo",
  description:
    "Clínica de estética avançada em Curitiba. Endolaser, harmonização facial, botox e muito mais. Agende sua avaliação com a Dra. Kelly Macedo.",
  keywords: ["estética", "Curitiba", "harmonização facial", "botox", "endolaser", "Dra Kelly Macedo"],
  openGraph: {
    title: "KM Beauty — Estética Avançada",
    description: "Realce sua beleza com a Dra. Kelly Macedo em Curitiba.",
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
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}