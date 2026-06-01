import Link from "next/link";

export function FinalCtaSection() {
  return (
    <section className="section-padding bg-km-gold">
      <div className="container-km text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
          Sua beleza merece cuidado especializado
        </h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">
          Dê o primeiro passo. Agende sua avaliação gratuita com a Dra. Kelly
          e descubra o protocolo ideal para você.
        </p>
        <Link
          href="/contato"
          className="inline-block bg-white text-km-gold font-bold px-8 py-4 rounded-btn hover:bg-km-bg transition-colors shadow-card"
        >
          Agendar agora — é gratuito
        </Link>
      </div>
    </section>
  );
}
