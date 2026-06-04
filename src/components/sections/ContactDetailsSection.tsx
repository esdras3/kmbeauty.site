import Link from "next/link";
import { kmbeautyOfficial } from "@/content/kmbeautyOfficial";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function ContactDetailsSection() {
  return (
    <section className="bg-[#121212] py-20 text-white md:py-24">
      <div className="container-km grid gap-8 px-4 md:grid-cols-[0.95fr_1.05fr] md:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-km-gold">
            Contato
          </p>
          <h2 className="mt-4 max-w-[20rem] text-balance text-3xl font-semibold md:max-w-none md:text-5xl">
            Fale com a KM Beauty do jeito que for mais facil para voce.
          </h2>
          <p className="mt-5 max-w-[21rem] text-sm leading-8 text-white/[0.82] md:max-w-xl">
            WhatsApp, rota no mapa e formulario seguem como os caminhos mais
            curtos para iniciar uma avaliacao e tirar duvidas sobre os
            procedimentos.
          </p>
        </div>

        <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <a
            href={getWhatsAppUrl(kmbeautyOfficial.contact.whatsappText)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-km-gold/40"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-km-gold">
              WhatsApp
            </p>
            <p className="mt-2 max-w-[16rem] break-words text-lg font-semibold sm:max-w-none sm:text-xl">
              {kmbeautyOfficial.contact.phoneDisplay}
            </p>
          </a>

          <a
            href={kmbeautyOfficial.contact.maps}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-km-gold/40"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-km-gold">
              Endereco
            </p>
            <p className="mt-2 max-w-[16rem] break-words text-sm font-medium leading-7 sm:max-w-none sm:text-base">
              {kmbeautyOfficial.contact.addressLine1}
            </p>
            <p className="mt-1 text-sm text-white/[0.78]">
              {kmbeautyOfficial.contact.addressLine2}
            </p>
          </a>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-km-gold">
              Horarios
            </p>
            <div className="mt-2 space-y-2 text-sm text-white/[0.82]">
              {kmbeautyOfficial.contact.schedule.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <Link href="/contato" className="btn-primary text-center">
            Abrir formulario completo
          </Link>
        </div>
      </div>
    </section>
  );
}
