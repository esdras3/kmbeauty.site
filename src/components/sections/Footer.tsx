import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-km-dark text-white/60 py-12 px-4">
      <div className="container-km grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="font-heading font-bold text-lg text-white mb-3">
            <span className="text-km-gold">KM</span> Beauty
          </div>
          <p className="text-sm leading-relaxed">
            Estética avançada com a Dra. Kelly Macedo em Curitiba/PR.
          </p>
        </div>
        <div>
          <div className="font-semibold text-white text-sm mb-3 uppercase tracking-wider">Navegação</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/#procedimentos" className="hover:text-km-gold transition-colors">Procedimentos</Link></li>
            <li><Link href="/#sobre" className="hover:text-km-gold transition-colors">Sobre a Dra. Kelly</Link></li>
            <li><Link href="/contato" className="hover:text-km-gold transition-colors">Contato e agendamento</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white text-sm mb-3 uppercase tracking-wider">Contato</div>
          <ul className="space-y-2 text-sm">
            <li>Curitiba / PR</li>
            <li><Link href="/contato" className="hover:text-km-gold transition-colors">Agendar avaliação</Link></li>
          </ul>
        </div>
      </div>
      <div className="container-km border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <span>© {new Date().getFullYear()} KM Beauty — Dra. Kelly Macedo. Todos os direitos reservados.</span>
        <Link
          href={process.env.NEXT_PUBLIC_ADMIN_URL ?? "https://dashboard-alpha-peach-96.vercel.app"}
          className="text-white/20 hover:text-white/40 transition-colors"
          target="_blank"
          rel="noopener noreferrer noindex"
        >
          Área restrita
        </Link>
      </div>
    </footer>
  );
}
