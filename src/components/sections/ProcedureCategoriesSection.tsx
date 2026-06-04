import Image from "next/image";
import Link from "next/link";
import { kmbeautyOfficial } from "@/content/kmbeautyOfficial";

const categories = [
  {
    title: "Procedimentos Faciais",
    description:
      "Tratamentos voltados para rejuvenescimento, definicao de contorno, hidratacao profunda e harmonizacao dos traços.",
    href: "/procedimentos-faciais",
    image: kmbeautyOfficial.assets.facialProceduresBackground,
    items: kmbeautyOfficial.facialProcedures.slice(0, 4),
  },
  {
    title: "Harmonizacao Corporal",
    description: kmbeautyOfficial.home.bodyIntroCopy,
    href: "/procedimentos-corporais",
    image: kmbeautyOfficial.assets.bodyProceduresBackground,
    items: kmbeautyOfficial.bodyProcedures.slice(0, 4),
  },
];

export function ProcedureCategoriesSection() {
  return (
    <section className="bg-km-bg py-20 md:py-28">
      <div className="container-km px-4 md:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-km-gold">
            Procedimentos
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold text-km-dark md:text-5xl">
            Protocolos faciais e corporais pensados como cuidado integral.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {categories.map((category) => (
            <article
              key={category.title}
              className="overflow-hidden rounded-[2rem] border border-km-border bg-white shadow-card"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-3xl font-semibold text-white">
                    {category.title}
                  </h3>
                </div>
              </div>
              <div className="space-y-6 p-6 md:p-8">
                <p className="text-sm leading-7 text-km-muted">
                  {category.description}
                </p>
                <ul className="grid gap-3">
                  {category.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-start gap-3 border-b border-km-border/70 pb-3 text-sm text-km-dark last:border-b-0 last:pb-0"
                    >
                      <span className="mt-2 h-2 w-2 rounded-full bg-km-gold" />
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={category.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-km-gold transition-colors hover:text-km-gold-hover"
                >
                  Conferir detalhes
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
