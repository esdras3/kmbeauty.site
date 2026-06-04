import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFab } from "@/components/sections/WhatsAppFab";
import { kmbeautyOfficial } from "@/content/kmbeautyOfficial";

export const metadata: Metadata = {
  title: "Procedimentos Corporais | KM Beauty",
  description:
    "Conheca os protocolos corporais da KM Beauty para firmeza, contorno e remodelamento.",
};

export default function ProcedimentosCorporaisPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="section-padding bg-km-dark text-white">
          <div className="container-km max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-km-gold">
              Procedimentos Corporais
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold md:text-6xl">
              Remodelamento corporal com tecnologia, estrategia e acompanhamento.
            </h1>
            <p className="mt-6 text-base leading-8 text-white/[0.84]">
              A harmonizacao corporal da KM Beauty parte de protocolos
              personalizados, com combinacao inteligente de ativos, tecnologias e
              leitura clinica de cada corpo.
            </p>
          </div>
        </section>

        <section className="section-padding bg-km-bg">
          <div className="container-km grid gap-6 md:grid-cols-2">
            {kmbeautyOfficial.bodyProcedures.map((item) => (
              <article
                key={item.name}
                className="rounded-[2rem] border border-km-border bg-white p-8 shadow-card"
              >
                <h2 className="text-2xl font-semibold text-km-dark">
                  {item.name}
                </h2>
                <p className="mt-4 text-sm leading-7 text-km-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
