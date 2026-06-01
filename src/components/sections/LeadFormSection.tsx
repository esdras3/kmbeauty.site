"use client";

import { useState } from "react";

const procedimentos = [
  "Endolaser",
  "Harmonização Facial",
  "Toxina Botulínica (Botox)",
  "Preenchimento Labial",
  "Preenchimento Facial",
  "Bioestimulador de Colágeno",
  "Peeling Químico",
  "Microagulhamento",
  "Limpeza de Pele Premium",
  "Outro",
];

export function LeadFormSection() {
  const [enviado, setEnviado] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCarregando(true);
    const form = e.currentTarget;
    const dados = {
      nome: (form.elements.namedItem("nome") as HTMLInputElement).value,
      telefone: (form.elements.namedItem("telefone") as HTMLInputElement).value,
      procedimento: (form.elements.namedItem("procedimento") as HTMLSelectElement).value,
    };
    await new Promise((r) => setTimeout(r, 800));
    console.log("Lead capturado:", dados);
    setEnviado(true);
    setCarregando(false);
  }

  return (
    <section id="agendar" className="section-padding bg-km-dark">
      <div className="container-km max-w-xl text-center">
        <p className="text-km-gold font-semibold text-sm tracking-widest uppercase mb-3">
          Primeiro passo
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
          Agende sua avaliação
        </h2>
        <p className="text-white/70 mb-10">
          Preencha o formulário e entraremos em contato para confirmar o horário.
        </p>
        {enviado ? (
          <div className="bg-km-gold/10 border border-km-gold rounded-card p-8 text-white">
            <div className="text-4xl mb-3">🌸</div>
            <h3 className="font-heading text-xl font-bold mb-2">Solicitação recebida!</h3>
            <p className="text-white/70 text-sm">
              Em breve entraremos em contato para confirmar sua avaliação com a Dra. Kelly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            <div>
              <label className="block text-white/60 text-xs uppercase tracking-wider mb-1.5">Nome</label>
              <input
                name="nome"
                type="text"
                required
                placeholder="Seu nome completo"
                className="w-full bg-white/5 border border-white/20 text-white placeholder:text-white/30 rounded-btn px-4 py-3 text-sm focus:outline-none focus:border-km-gold transition-colors"
              />
            </div>
            <div>
              <label className="block text-white/60 text-xs uppercase tracking-wider mb-1.5">WhatsApp</label>
              <input
                name="telefone"
                type="tel"
                required
                placeholder="(41) 99999-9999"
                className="w-full bg-white/5 border border-white/20 text-white placeholder:text-white/30 rounded-btn px-4 py-3 text-sm focus:outline-none focus:border-km-gold transition-colors"
              />
            </div>
            <div>
              <label className="block text-white/60 text-xs uppercase tracking-wider mb-1.5">Procedimento de interesse</label>
              <select
                name="procedimento"
                required
                className="w-full bg-white/5 border border-white/20 text-white rounded-btn px-4 py-3 text-sm focus:outline-none focus:border-km-gold transition-colors"
              >
                <option value="">Selecione...</option>
                {procedimentos.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={carregando}
              className="btn-primary mt-2 py-4 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {carregando ? "Enviando..." : "Quero agendar minha avaliação →"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
