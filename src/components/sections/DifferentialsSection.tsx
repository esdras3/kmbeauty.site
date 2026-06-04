import Link from "next/link";

const tecnologias = [
  {
    titulo: "Ultrassom Microfocado HIFU",
    descricao: "Tratamento não invasivo que estimula a produção de colágeno nas camadas mais profundas da pele, promovendo lifting facial sem cirurgia.",
  },
  {
    titulo: "Radiofrequência",
    descricao: "Aquecimento profundo das fibras colágenas para firmar, tonificar e rejuvenescer a pele do rosto e corpo.",
  },
  {
    titulo: "Bioestimulação com Laser",
    descricao: "Estimulação celular por fototerapia para renovação da pele, redução de manchas e melhora da textura.",
  },
  {
    titulo: "Endolaser",
    descricao: "Tecnologia a laser para lipólise minimamente invasiva, com resultados definitivos na redução de gordura localizada.",
  },
];

export function DifferentialsSection() {
  return (
    <section id="tecnologias" className="py-20 md:py-28 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <p className="text-km-gold font-body font-semibold text-xs tracking-[0.3em] uppercase mb-3">
            Inovação
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
            Tecnologias Estéticas
          </h2>
          <p className="text-white/50 font-body max-w-xl mx-auto">
            Equipamentos de última geração para tratamentos precisos, seguros e com resultados comprovados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {tecnologias.map((t) => (
            <div key={t.titulo} className="border border-white/10 rounded-2xl p-8 hover:border-km-gold/40 transition-all group">
              <div className="w-8 h-0.5 bg-km-gold mb-5" />
              <h3 className="font-heading text-xl font-semibold text-white mb-3 group-hover:text-km-gold transition-colors">
                {t.titulo}
              </h3>
              <p className="text-white/50 font-body text-sm leading-relaxed">{t.descricao}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/procedimentos"
            className="inline-flex items-center gap-2 border-2 border-white/30 text-white/70 font-body font-semibold px-8 py-3 rounded-full hover:border-km-gold hover:text-km-gold transition-all duration-300 text-sm"
          >
            Confira nossas tecnologias ›
          </Link>
        </div>
      </div>
    </section>
  );
}
