import Image from "next/image";
import { kmbeautyOfficial } from "@/content/kmbeautyOfficial";

export function SpaceGallerySection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-km px-4 md:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-km-gold">
            Nosso espaco
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold text-km-dark md:text-5xl">
            Um ambiente moderno, acolhedor e preparado para cada etapa do atendimento.
          </h2>
          <p className="mt-5 text-sm leading-7 text-km-muted">
            A experiencia da KM Beauty comeca antes do procedimento. O espaco
            reforca conforto, limpeza visual e cuidado em cada detalhe.
          </p>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0 md:pb-0">
          {kmbeautyOfficial.gallery.map((image) => (
            <div
              key={image.alt}
              className="relative min-w-[15rem] flex-none snap-center overflow-hidden rounded-[1.75rem] border border-km-border bg-km-bg shadow-card md:min-w-0"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={1200}
                height={1600}
                className="aspect-[3/4] h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
