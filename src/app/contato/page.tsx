import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFab } from "@/components/sections/WhatsAppFab";
import { LuisaChatWidget } from "@/components/sections/LuisaChatWidget";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato e Agendamento | KM Beauty",
  description: "Agende sua avaliação gratuita com a Dra. Kelly Macedo. Entre em contato pelo WhatsApp ou formulário.",
};

export default function ContatoPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <LeadFormSection />
        <section className="section-padding bg-km-bg text-center">
          <div className="container-km max-w-xl">
            <h2 className="font-heading text-2xl font-bold text-km-dark mb-4">
              Prefere falar agora?
            </h2>
            <p className="text-km-muted mb-6">
              Clique no botão verde e converse diretamente pelo WhatsApp.
              A nossa assistente Luísa também está disponível no chat — clique no botão 🌸.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
      <LuisaChatWidget />
    </>
  );
}
