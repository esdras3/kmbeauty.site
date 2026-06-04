import Link from "next/link";

export function TestimonialsSection() {
  return (
    <section id="mentorias" className="py-20 md:py-28 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-km-gold font-body font-semibold text-xs tracking-[0.3em] uppercase mb-4">
            Conhecimento
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6">
            Mentorias em Estética Avançada
          </h2>
          <div className="w-12 h-0.5 bg-km-gold mx-auto mb-6" />
          <p className="text-white/60 font-body text-lg leading-relaxed mb-10">
            Harmonização Facial e Corporal com quem é referência no assunto.
          </p>
          <p className="text-white/40 font-body text-base leading-relaxed mb-10">
            A Dra. Kelly Macedo compartilha sua expertise em mentorias e cursos exclusivos para profissionais da área estética que desejam elevar seus resultados e expandir sua prática clínica com segurança e técnica avançada.
          </p>
          <Link
            href="/contato"
            className="inline-flex items-center gap-2 bg-km-gold hover:bg-km-gold-hover text-white font-body font-semibold px-8 py-4 rounded-full transition-all duration-300 text-sm"
          >
            Saiba mais! ›
          </Link>
        </div>
      </div>
    </section>
  );
}
