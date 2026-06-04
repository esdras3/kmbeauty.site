import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { AboutSection } from "@/components/sections/AboutSection";
import { SpaceGallerySection } from "@/components/sections/SpaceGallerySection";
import { ContactDetailsSection } from "@/components/sections/ContactDetailsSection";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFab } from "@/components/sections/WhatsAppFab";

export const metadata: Metadata = {
  title: "Sobre nos | KM Beauty",
  description:
    "Conheca a historia da KM Beauty, o posicionamento da Dra. Kelly Macedo e o espaco oficial da clinica.",
};

export default function SobreNosPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <AboutSection />
        <SpaceGallerySection />
        <ContactDetailsSection />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
