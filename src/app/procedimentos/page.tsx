import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFab } from "@/components/sections/WhatsAppFab";
import Link from "next/link";
import type { Metadata } from "next";
import { kmbeautyOfficial } from "@/content/kmbeautyOfficial";

export const metadata: Metadata = {
  title: "Procedimentos | KM Beauty — Dra. Kelly Macedo",
  description:
    "Conheca os procedimentos faciais e corporais da KM Beauty e encontre o melhor caminho para sua avaliacao.",
};

export default function ProcedimentosPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="section-padding bg-km-dark text-center text-white">
          <div className="container-km max-w-3xl">
            <h1 className="text-4xl font-semibold md:text-5xl">
              Procedimentos
            </h1>
            <p className="mt-4 text-lg text-white/[0.84]">
              Um panorama completo dos tratamentos faciais e corporais que fazem
              parte da experiencia da KM Beauty.
            </p>
          </div>
        </section>
        <section className="section-padding bg-km-bg">
          <div className="container-km grid gap-8 md:grid-cols-2">
            <article className="rounded-[2rem] border border-km-border bg-white p-8 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-km-gold">
                Rosto
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-km-dark">
                Procedimentos Faciais
              </h2>
              <p className="mt-4 text-sm leading-7 text-km-muted">
                Harmonizacao, rejuvenescimento, hidratacao profunda e contorno
                com foco em naturalidade e criterio tecnico.
              </p>
              <ul className="mt-6 grid gap-3 text-sm text-km-dark">
                {kmbeautyOfficial.facialProcedures.map((item) => (
                  <li key={item.name} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-km-gold" />
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
              <Link href="/procedimentos-faciais" className="mt-8 inline-flex text-sm font-semibold text-km-gold">
                Ver detalhes
              </Link>
            </article>

            <article className="rounded-[2rem] border border-km-border bg-white p-8 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-km-gold">
                Corpo
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-km-dark">
                Procedimentos Corporais
              </h2>
              <p className="mt-4 text-sm leading-7 text-km-muted">
                Remodelamento, firmeza, reducao de medidas e protocolos
                exclusivos adaptados a cada objetivo corporal.
              </p>
              <ul className="mt-6 grid gap-3 text-sm text-km-dark">
                {kmbeautyOfficial.bodyProcedures.map((item) => (
                  <li key={item.name} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-km-gold" />
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
              <Link href="/procedimentos-corporais" className="mt-8 inline-flex text-sm font-semibold text-km-gold">
                Ver detalhes
              </Link>
            </article>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
