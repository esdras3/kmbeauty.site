import Image from "next/image";
import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFab } from "@/components/sections/WhatsAppFab";
import { kmbeautyOfficial } from "@/content/kmbeautyOfficial";

export const metadata: Metadata = {
  title: "Tecnologias | KM Beauty",
  description:
    "Confira as tecnologias esteticas faciais e corporais que fazem parte dos protocolos da KM Beauty.",
};

export default function TecnologiasPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="section-padding bg-km-dark text-white">
          <div className="container-km max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-km-gold">
              Tecnologias Esteticas
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold md:text-6xl">
              Equipamentos e protocolos de ultima geracao para rosto e corpo.
            </h1>
            <p className="mt-6 text-base leading-8 text-white/[0.84]">
              Cada tecnologia e escolhida pelo que realmente entrega em
              seguranca, conforto e resultado. Na KM Beauty, o equipamento nunca
              trabalha sozinho, ele entra dentro de um plano clinico com
              acompanhamento humano.
            </p>
          </div>
        </section>

        <section className="section-padding bg-km-bg">
          <div className="container-km space-y-16">
            <div>
              <h2 className="text-3xl font-semibold text-km-dark md:text-4xl">
                Tecnologias faciais
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {kmbeautyOfficial.technologies.facial.map((item) => (
                  <article
                    key={item.name}
                    className="overflow-hidden rounded-[2rem] border border-km-border bg-white shadow-card"
                  >
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold text-km-dark">
                        {item.name}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-km-muted">
                        {item.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-km-dark md:text-4xl">
                Tecnologias corporais
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {kmbeautyOfficial.technologies.body.map((item) => (
                  <article
                    key={item.name}
                    className="overflow-hidden rounded-[2rem] border border-km-border bg-white shadow-card"
                  >
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold text-km-dark">
                        {item.name}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-km-muted">
                        {item.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
