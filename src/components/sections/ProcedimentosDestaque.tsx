import Image from "next/image";
import Link from "next/link";

const faciais = [
  { nome: "Harmonização Facial", img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80" },
  { nome: "Toxina Botulínica", img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80" },
  { nome: "Bioestimuladores de Colágeno", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80" },
  { nome: "Preenchimento Labial", img: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=600&q=80" },
  { nome: "Fios de Sustentação", img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80" },
  { nome: "Black Peel", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80" },
  { nome: "Rinomodelação", img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80" },
];

export function ProcedimentosDestaque() {
  return (
    <section id="procedimentos" className="py-20 md:py-28 bg-[#f9f6f0]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <p className="text-km-gold font-body font-semibold text-xs tracking-[0.3em] uppercase mb-3">
            Especialidades
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Procedimentos Faciais
          </h2>
          <p className="text-gray-500 font-body max-w-xl mx-auto">
            Cada tratamento é personalizado para o seu rosto. A Dra. Kelly indica o protocolo ideal após avaliação presencial.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
          {faciais.map((p) => (
            <div key={p.nome} className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.nome}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-heading font-semibold text-gray-900 text-sm leading-snug">{p.nome}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/procedimentos#faciais"
            className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 font-body font-semibold px-8 py-3 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300 text-sm"
          >
            Confira os procedimentos ›
          </Link>
        </div>
      </div>
    </section>
  );
}
