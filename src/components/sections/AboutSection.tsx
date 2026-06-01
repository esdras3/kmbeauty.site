export function AboutSection() {
  return (
    <section id="sobre" className="section-padding bg-km-bg">
      <div className="container-km">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-card bg-km-border aspect-[4/5] flex items-center justify-center">
            <span className="text-km-muted text-sm">Foto Dra. Kelly Macedo</span>
          </div>
          <div>
            <p className="text-km-gold font-semibold text-sm tracking-widest uppercase mb-4">
              Sobre a médica
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-km-dark mb-6">
              Dra. Kelly Macedo
            </h2>
            <div className="space-y-4 text-km-muted leading-relaxed">
              <p>
                Médica especialista em estética avançada, com mais de 10 anos dedicados
                a transformar a autoestima das suas pacientes em Curitiba.
              </p>
              <p>
                Formada em medicina com especialização em dermatologia estética,
                a Dra. Kelly combina técnica apurada e sensibilidade artística
                para resultados naturais e duradouros.
              </p>
              <p>
                Cada procedimento é precedido de uma avaliação personalizada,
                garantindo que o tratamento escolhido seja o mais adequado
                para a sua pele e o seu momento de vida.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="bg-km-surface rounded-card px-5 py-3 text-center shadow-card">
                <div className="font-heading font-bold text-xl text-km-gold">CRM/PR</div>
                <div className="text-xs text-km-muted mt-1">Registro ativo</div>
              </div>
              <div className="bg-km-surface rounded-card px-5 py-3 text-center shadow-card">
                <div className="font-heading font-bold text-xl text-km-gold">10+</div>
                <div className="text-xs text-km-muted mt-1">Anos de prática</div>
              </div>
              <div className="bg-km-surface rounded-card px-5 py-3 text-center shadow-card">
                <div className="font-heading font-bold text-xl text-km-gold">15+</div>
                <div className="text-xs text-km-muted mt-1">Especializações</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
