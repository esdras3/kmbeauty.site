import Image from "next/image";
import Link from "next/link";
import { SiteLogo } from "@/components/ui/SiteLogo";
import { kmbeautyOfficial } from "@/content/kmbeautyOfficial";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-x-clip bg-black pt-20">
      <Image
        src={kmbeautyOfficial.assets.heroBackground}
        alt="Fachada e ambientacao visual da KM Beauty"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/[0.96] via-black/[0.84] to-black/[0.52]" />
      <div className="absolute inset-y-0 left-0 w-full bg-[radial-gradient(circle_at_top_left,rgba(162,119,13,0.24),transparent_38%)]" />

      <div className="container-km relative grid min-h-[calc(100vh-5rem)] grid-cols-1 items-center gap-6 px-4 py-10 sm:gap-8 sm:py-14 md:grid-cols-[minmax(0,1fr)_30rem] md:gap-10 md:px-8 md:py-16">
        <div className="max-w-2xl">
          <p className="mb-4 max-w-[19rem] text-[11px] font-medium uppercase tracking-[0.18em] text-km-gold sm:max-w-none sm:text-sm sm:tracking-[0.28em]">
            KM Beauty Estetica Avancada, Curitiba
          </p>
          <div className="mb-6 max-w-[16rem] sm:max-w-[20rem] md:max-w-[28rem]">
            <SiteLogo variant="hero" />
          </div>
          <h1 className="max-w-[20rem] text-balance text-[2.75rem] font-semibold leading-[0.92] text-white sm:max-w-[24rem] sm:text-4xl md:max-w-2xl md:text-6xl">
            {kmbeautyOfficial.home.heroTitle}
          </h1>
          <p className="mt-5 max-w-[21rem] text-pretty text-[15px] leading-7 text-white/[0.86] sm:max-w-xl sm:text-base sm:leading-8 md:text-lg">
            {kmbeautyOfficial.home.heroCopy}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <a
              href={getWhatsAppUrl(kmbeautyOfficial.contact.whatsappText)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-km-gold px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-km-gold-hover sm:px-7"
            >
              Agende um horario
            </a>
            <Link
              href="/procedimentos"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-km-gold hover:text-km-gold sm:px-7"
            >
              Ver procedimentos
            </Link>
          </div>
        </div>

        <div className="relative mx-auto mt-2 flex w-full max-w-[18rem] items-end justify-center self-end sm:max-w-[22rem] md:mt-0 md:max-w-[30rem]">
          <div className="absolute inset-x-6 bottom-6 h-20 rounded-full bg-km-gold/25 blur-3xl sm:inset-x-8 sm:bottom-8 sm:h-24" />
          <Image
            src={kmbeautyOfficial.assets.heroPortrait}
            alt="Dra. Kelly Macedo em retrato oficial da KM Beauty"
            width={528}
            height={663}
            priority
            className="relative h-auto w-full object-contain"
            sizes="(max-width: 768px) 80vw, 30rem"
          />
        </div>
      </div>
    </section>
  );
}
