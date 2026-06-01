const depoimentos = [
  {
    nome: "Ana Paula S.",
    procedimento: "Harmonização Facial",
    texto: "Resultado incrível e muito natural. A Dra. Kelly entendeu exatamente o que eu queria e superou minhas expectativas.",
  },
  {
    nome: "Mariana C.",
    procedimento: "Endolaser",
    texto: "Fiz o Endolaser para papada e fiquei encantada. Recuperação rápida e resultado que eu não esperava tão bom.",
  },
  {
    nome: "Fernanda R.",
    procedimento: "Botox",
    texto: "Já é minha terceira vez com a Dra. Kelly. Resultado sempre natural, nunca aquela cara de frozen. Super indico!",
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-km-dark">
      <div className="container-km">
        <div className="text-center mb-12">
          <p className="text-km-gold font-semibold text-sm tracking-widest uppercase mb-3">
            Depoimentos
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
            O que dizem nossas pacientes
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {depoimentos.map((d) => (
            <div key={d.nome} className="bg-white/5 border border-white/10 rounded-card p-6 flex flex-col gap-4">
              <p className="text-km-gold text-xl font-heading">"</p>
              <p className="text-white/80 text-sm leading-relaxed flex-1">{d.texto}</p>
              <div>
                <div className="font-semibold text-white text-sm">{d.nome}</div>
                <div className="text-km-gold text-xs mt-0.5">{d.procedimento}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
