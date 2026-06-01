import Link from "next/link";

const procedimentos = [
  {
    slug: "endolaser",
    nome: "Endolaser",
    descricao: "Lipólise a laser minimamente invasiva para papada, abdômen e flancos. Resultados definitivos com recuperação rápida.",
    icone: "✦",
    destaque: true,
  },
  {
    slug: "harmonizacao-facial",
    nome: "Harmonização Facial",
    descricao: "Reequilíbrio dos traços do rosto com ácido hialurônico. Resultado natural que respeita sua identidade.",
    icone: "✦",
    destaque: false,
  },
  {
    slug: "botox",
    nome: "Toxina Botulínica",
    descricao: "Suavização de rugas dinâmicas para um olhar mais descansado e jovial, com naturalidade garantida.",
    icone: "✦",
    destaque: false,
  },
  {
    slug: "preenchimento",
    nome: "Preenchimento Labial",
    descricao: "Definição e volume nos lábios com ácido hialurônico. Resultado harmonioso e personalizado.",
    icone: "✦",
    destaque: false,
  },
];

export function ProcedimentosDestaque() {
  return (
    <section id="procedimentos" className="section-padding bg-km-surface">
      <div className="container-km">
        <div className="text-center mb-12">
          <p className="text-km-gold font-semibold text-sm tracking-widest uppercase mb-3">
            Especialidades
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-km-dark font-bold mb-4">
            Procedimentos em destaque
          </h2>
          <p className="text-km-muted max-w-xl mx-auto">
            Cada tratamento é personalizado para o seu caso. A Dra. Kelly indica
            o protocolo ideal após avaliação presencial.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {procedimentos.map((p) => (
            <div
              key={p.slug}
              className={`rounded-card p-6 flex flex-col gap-4 shadow-card border transition-shadow hover:shadow-gold ${
                p.destaque
                  ? "bg-km-dark text-white border-km-gold"
                  : "bg-km-bg text-km-dark border-km-border"
              }`}
            >
              <span className="text-2xl text-km-gold">{p.icone}</span>
              <h3 className={`font-heading font-bold text-xl ${p.destaque ? "text-white" : "text-km-dark"}`}>
                {p.nome}
              </h3>
              <p className={`text-sm leading-relaxed flex-1 ${p.destaque ? "text-white/75" : "text-km-muted"}`}>
                {p.descricao}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/procedimentos" className="btn-outline">
            Ver todos os procedimentos →
          </Link>
        </div>
      </div>
    </section>
  );
}
