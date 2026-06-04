import Image from "next/image";
import Link from "next/link";
import { kmbeautyOfficial } from "@/content/kmbeautyOfficial";

const featuredTechnologies = [
  kmbeautyOfficial.technologies.facial[0],
  kmbeautyOfficial.technologies.body[0],
  kmbeautyOfficial.technologies.body[2],
];

export function TechnologiesShowcaseSection() {
  return (
    <section className="relative overflow-hidden bg-[#0f0f10] py-20 text-white md:py-28">
      <div className="absolute inset-0 opacity-20">
        <Image
          src={kmbeautyOfficial.assets.technologiesBackground}
          alt="Tecnologia estetica em atendimento"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-[#0f0f10]/85" />

      <div className="container-km relative px-4 md:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-km-gold">
            Tecnologias Esteticas
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold md:text-5xl">
            {kmbeautyOfficial.home.technologiesTitle}
          </h2>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-white/[0.84]">
            {kmbeautyOfficial.home.technologiesCopy}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featuredTechnologies.map((tech) => (
            <article
              key={tech.name}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-sm"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={tech.image}
                  alt={tech.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white">
                  {tech.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/[0.78]">
                  {tech.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/tecnologias" className="btn-primary">
            Conferir nossas tecnologias
          </Link>
        </div>
      </div>
    </section>
  );
}
