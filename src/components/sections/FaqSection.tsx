"use client";

import { useState } from "react";

const faqs = [
  {
    pergunta: "Qual é o primeiro passo para fazer um procedimento?",
    resposta: "O primeiro passo é uma avaliação presencial com a Dra. Kelly. Nessa consulta, ela analisa a sua pele, entende seus objetivos e indica o protocolo mais adequado para o seu caso.",
  },
  {
    pergunta: "Quanto tempo dura a recuperação dos procedimentos?",
    resposta: "Depende do procedimento. Botox e preenchimento têm recuperação mínima (1–3 dias). Endolaser e peelings mais profundos podem exigir de 5 a 14 dias. A Dra. Kelly orienta cada caso individualmente.",
  },
  {
    pergunta: "Os resultados são permanentes?",
    resposta: "A duração varia por procedimento. Botox dura em média 4–6 meses, preenchimento 12–18 meses, e procedimentos como Endolaser têm resultados mais duradouros. Manutenções periódicas potencializam os resultados.",
  },
  {
    pergunta: "Como sei qual procedimento é indicado para mim?",
    resposta: "Só uma avaliação presencial pode indicar o protocolo correto. Cada pele e cada objetivo é único — nunca indicamos procedimentos sem avaliação.",
  },
  {
    pergunta: "Como é feito o agendamento?",
    resposta: "Você pode agendar pelo nosso site (formulário de contato), pelo WhatsApp ou conversar com a Luísa, nossa assistente virtual, que te orienta e agenda.",
  },
];

export function FaqSection() {
  const [aberto, setAberto] = useState<number | null>(null);

  return (
    <section className="section-padding bg-km-bg">
      <div className="container-km max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-km-gold font-semibold text-sm tracking-widest uppercase mb-3">
            Dúvidas frequentes
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-km-dark">
            Perguntas frequentes
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-km-surface rounded-card shadow-card overflow-hidden">
              <button
                onClick={() => setAberto(aberto === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-semibold text-km-dark hover:text-km-gold transition-colors"
              >
                <span>{faq.pergunta}</span>
                <span className={`text-km-gold transition-transform ${aberto === i ? "rotate-180" : ""}`}>▼</span>
              </button>
              {aberto === i && (
                <div className="px-6 pb-5 text-km-muted text-sm leading-relaxed">
                  {faq.resposta}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
