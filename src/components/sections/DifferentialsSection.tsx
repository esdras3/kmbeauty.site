const diferenciais = [
  {
    icone: "🔬",
    titulo: "Tecnologia de ponta",
    descricao: "Equipamentos certificados e técnicas atualizadas com as últimas evidências da medicina estética.",
  },
  {
    icone: "👩‍⚕️",
    titulo: "Atendimento médico exclusivo",
    descricao: "Todos os procedimentos realizados pela própria Dra. Kelly — sem delegação para técnicos.",
  },
  {
    icone: "✨",
    titulo: "Resultado natural",
    descricao: "A nossa filosofia é realçar a sua beleza, não transformar você em outra pessoa.",
  },
  {
    icone: "🤝",
    titulo: "Avaliação personalizada",
    descricao: "Cada paciente recebe um protocolo exclusivo, pensado para o seu caso e seu momento de vida.",
  },
];

export function DifferentialsSection() {
  return (
    <section className="section-padding bg-km-surface">
      <div className="container-km">
        <div className="text-center mb-12">
          <p className="text-km-gold font-semibold text-sm tracking-widest uppercase mb-3">
            Por que nos escolher
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-km-dark">
            Nossos diferenciais
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {diferenciais.map((d) => (
            <div key={d.titulo} className="text-center p-6 rounded-card bg-km-bg shadow-card">
              <div className="text-4xl mb-4">{d.icone}</div>
              <h3 className="font-heading font-bold text-lg text-km-dark mb-3">{d.titulo}</h3>
              <p className="text-km-muted text-sm leading-relaxed">{d.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
