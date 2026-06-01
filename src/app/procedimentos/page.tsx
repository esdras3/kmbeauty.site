import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFab } from "@/components/sections/WhatsAppFab";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Procedimentos | KM Beauty — Dra. Kelly Macedo",
  description: "Conheça todos os procedimentos estéticos da clínica KM Beauty: Endolaser, harmonização facial, botox, preenchimento e muito mais.",
};

const todos = [
  { nome: "Endolaser", descricao: "Lipólise a laser minimamente invasiva para papada, abdômen e flancos. Resultados definitivos com mínima recuperação." },
  { nome: "Harmonização Facial", descricao: "Reequilíbrio dos traços com ácido hialurônico. Preenchimento de olheiras, malar, mandíbula e queixo." },
  { nome: "Toxina Botulínica (Botox)", descricao: "Suavização de rugas dinâmicas. Olhar descansado e natural, com duração de 4–6 meses." },
  { nome: "Preenchimento Labial", descricao: "Volume e definição nos lábios com ácido hialurônico. Resultado harmonioso e personalizado." },
  { nome: "Preenchimento Facial", descricao: "Restauração de volumes perdidos no rosto. Tratamento de olheiras, bochechas e mandíbula." },
  { nome: "Harmonização de Orelhas", descricao: "Procedimento estético para correção da proporção e formato das orelhas." },
  { nome: "Bioestimulador de Colágeno", descricao: "Sculptra e Radiesse para tratar flacidez facial e corporal, estimulando colágeno natural." },
  { nome: "Peelings Químicos", descricao: "Renovação celular, melhora da textura, controle de oleosidade e clareamento de manchas." },
  { nome: "Microagulhamento", descricao: "Estímulo de colágeno para poros dilatados, cicatrizes e melhora geral da textura da pele." },
  { nome: "Limpeza de Pele Premium", descricao: "Higienização profunda, remoção de impurezas e cravos com hidratação e nutrição intensiva." },
];

export default function ProcedimentosPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="section-padding bg-km-dark text-center">
          <div className="container-km max-w-2xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Procedimentos
            </h1>
            <p className="text-white/70 text-lg">
              Cada tratamento é personalizado para o seu caso após avaliação presencial com a Dra. Kelly.
            </p>
          </div>
        </section>
        <section className="section-padding bg-km-bg">
          <div className="container-km grid grid-cols-1 md:grid-cols-2 gap-6">
            {todos.map((p) => (
              <div key={p.nome} className="bg-km-surface rounded-card p-6 shadow-card">
                <h3 className="font-heading font-bold text-xl text-km-dark mb-3">{p.nome}</h3>
                <p className="text-km-muted text-sm leading-relaxed mb-4">{p.descricao}</p>
                <Link href="/contato" className="text-km-gold text-sm font-semibold hover:underline">
                  Agendar avaliação →
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
