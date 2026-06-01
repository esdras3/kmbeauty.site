import Link from "next/link";

export function HeroSection() {
  return (
    <section className="min-h-screen bg-km-dark flex items-center pt-16">
      <div className="container-km section-padding text-center md:text-left">
        <div className="max-w-2xl">
          <p className="text-km-gold font-semibold text-sm tracking-widest uppercase mb-4">
            Dra. Kelly Macedo — Curitiba/PR
          </p>
          <h1 className="font-heading text-4xl md:text-6xl text-white leading-tight mb-6">
            Realce sua <span className="text-km-gold">beleza</span>{" "}
            com quem entende
          </h1>
          <p className="text-white/70 text-lg md:text-xl mb-10 leading-relaxed">
            Estética avançada com tecnologia de ponta e cuidado personalizado.
            Do Endolaser à harmonização facial — resultados naturais e duradouros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/contato" className="btn-primary text-base px-8 py-4">
              Agendar Avaliação Gratuita
            </Link>
            <Link href="/#procedimentos" className="btn-outline text-base px-8 py-4 border-white text-white hover:bg-white hover:text-km-dark">
              Ver Procedimentos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
