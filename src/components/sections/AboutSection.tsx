import Image from "next/image";
import { SiteLogo } from "@/components/ui/SiteLogo";
import { kmbeautyOfficial } from "@/content/kmbeautyOfficial";

export function AboutSection() {
  return (
    <section id="sobre" className="bg-black py-20 text-white md:py-28">
      <div className="container-km px-4 md:px-8">
        <div className="grid items-center gap-10 md:grid-cols-[1.05fr_minmax(0,0.95fr)]">
          <div className="order-2 rounded-[2rem] border border-white/8 bg-white/[0.03] p-6 shadow-2xl md:order-1 md:p-10">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-km-gold">
              {kmbeautyOfficial.home.storyEyebrow}
            </p>
            <h2 className="text-balance text-3xl font-semibold leading-tight md:text-5xl">
              {kmbeautyOfficial.home.storyTitle}
            </h2>
            <div className="mt-6 space-y-4 text-pretty text-base leading-8 text-white/[0.84]">
              {kmbeautyOfficial.home.storyBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="rounded-2xl border border-km-gold/25 bg-km-gold/10 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-km-gold">
                  Referencia em harmonizacao de orelhas
                </p>
                <p className="mt-3 text-sm leading-7 text-white/80">
                  Um procedimento minimamente invasivo que nao exige cirurgia e
                  reforca o posicionamento autoral da Dra. Kelly dentro da
                  estetica facial.
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              {[
                { value: "8+", label: "Anos de experiencia" },
                { value: "Humanizado", label: "Atendimento de ponta a ponta" },
                { value: "Natural", label: "Resultado como principio" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                >
                  <div className="text-lg font-semibold text-km-gold">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/[0.68]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="overflow-hidden rounded-[2rem] border border-white/8 shadow-2xl">
              <Image
                src={kmbeautyOfficial.assets.storyRoom}
                alt="Espaco interno da KM Beauty"
                width={980}
                height={777}
                className="h-auto w-full object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="-mt-24 ml-auto mr-6 max-w-[17rem] rounded-[2rem] border border-white/8 bg-black/70 p-4 shadow-2xl backdrop-blur-md md:mr-10">
              <div className="mb-4 overflow-hidden rounded-[1.5rem] border border-white/8">
                <Image
                  src={kmbeautyOfficial.assets.heroPortrait}
                  alt="Retrato oficial da Dra. Kelly Macedo"
                  width={438}
                  height={547}
                  className="h-auto w-full object-cover"
                  sizes="17rem"
                />
              </div>
              <SiteLogo variant="badge" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
