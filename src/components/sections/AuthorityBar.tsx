import Link from "next/link";

const corporais = [
  "Endolaser",
  "Criolipólise",
  "Carboxiterapia",
  "Radiofrequência",
  "Drenagem Linfática",
  "Tratamento Capilar",
];

export function AuthorityBar() {
  return (
    <section id="corporais" className="py-20 md:py-28 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <p className="text-km-gold font-body font-semibold text-xs tracking-[0.3em] uppercase mb-3">
            Corpo
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
            Harmonização Corporal
          </h2>
          <p className="text-white/60 font-body max-w-xl mx-auto">
            Tratamentos corporais de alta performance para modelar, tonificar e renovar.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {corporais.map((nome) => (
            <div
              key={nome}
              className="border border-white/10 rounded-2xl px-6 py-8 text-center hover:border-km-gold/50 hover:bg-white/5 transition-all group"
            >
              <div className="w-8 h-0.5 bg-km-gold mx-auto mb-4" />
              <h3 className="font-heading text-white font-semibold text-lg group-hover:text-km-gold transition-colors">
                {nome}
              </h3>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/procedimentos#corporais"
            className="inline-flex items-center gap-2 border-2 border-km-gold text-km-gold font-body font-semibold px-8 py-3 rounded-full hover:bg-km-gold hover:text-white transition-all duration-300 text-sm"
          >
            Confira os procedimentos ›
          </Link>
        </div>
      </div>
    </section>
  );
}
