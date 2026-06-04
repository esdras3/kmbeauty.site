import Image from "next/image";
import Link from "next/link";
import { kmbeautyOfficial } from "@/content/kmbeautyOfficial";

export function MentorshipSection() {
  return (
    <section className="bg-km-bg py-20 md:py-28">
      <div className="container-km px-4 md:px-8">
        <div className="grid items-center gap-10 overflow-hidden rounded-[2rem] border border-km-border bg-black md:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[24rem]">
            <Image
              src={kmbeautyOfficial.assets.mentorshipPortrait}
              alt="Dra. Kelly Macedo em material de mentorias"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <div className="p-8 text-white md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-km-gold">
              Mentorias
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold md:text-5xl">
              {kmbeautyOfficial.home.mentorshipTitle}
            </h2>
            <p className="mt-6 max-w-xl text-pretty text-sm leading-8 text-white/[0.82]">
              {kmbeautyOfficial.home.mentorshipCopy}
            </p>
            <div className="mt-8">
              <Link
                href={kmbeautyOfficial.links.mentorships}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-primary"
              >
                Ir para o site do curso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
