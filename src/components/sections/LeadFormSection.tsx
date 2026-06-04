"use client";

import { useState } from "react";
import { kmbeautyOfficial } from "@/content/kmbeautyOfficial";

const procedimentos = [
  ...kmbeautyOfficial.facialProcedures.map((item) => item.name),
  ...kmbeautyOfficial.bodyProcedures.map((item) => item.name),
  "Outro",
];

export function LeadFormSection() {
  const [enviado, setEnviado] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCarregando(true);
    setErro("");
    const form = e.currentTarget;
    const dados = {
      nome: (form.elements.namedItem("nome") as HTMLInputElement).value.trim(),
      telefone: (form.elements.namedItem("telefone") as HTMLInputElement).value.trim(),
      procedimento: (
        form.elements.namedItem("procedimento") as HTMLSelectElement
      ).value,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (!res.ok) {
        const response = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(
          response?.error ?? "Não foi possível enviar sua solicitação."
        );
      }

      form.reset();
      setEnviado(true);
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar sua solicitação."
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section id="agendar" className="section-padding bg-km-dark">
      <div className="mx-auto w-full max-w-4xl px-4 text-center">
        <p className="text-km-gold font-semibold text-sm tracking-widest uppercase mb-3">
          Primeiro passo
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
          Agende sua avaliacao
        </h2>
        <p className="mb-10 text-white/[0.82]">
          Preencha o formulario e entraremos em contato para confirmar o horario.
        </p>
        {enviado ? (
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-km-gold/50 bg-km-gold/10 p-8 text-white shadow-soft">
            <div className="text-4xl mb-3">🌸</div>
            <h3 className="font-heading text-xl font-bold mb-2">Solicitacao recebida!</h3>
            <p className="text-sm text-white/[0.82]">
              Em breve entraremos em contato para confirmar sua avaliacao com a Dra. Kelly.
            </p>
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 text-left shadow-soft backdrop-blur-sm md:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {erro && (
                <p className="rounded-btn border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {erro}
                </p>
              )}
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-wider text-white/[0.78]">Nome</label>
                <input
                  name="nome"
                  type="text"
                  required
                  placeholder="Seu nome completo"
                  className="w-full rounded-btn border border-white/[0.24] bg-white/[0.07] px-4 py-3 text-sm text-white placeholder:text-white/[0.48] transition-colors focus:border-km-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-wider text-white/[0.78]">WhatsApp</label>
                <input
                  name="telefone"
                  type="tel"
                  required
                  placeholder={kmbeautyOfficial.contact.phoneDisplay}
                  className="w-full rounded-btn border border-white/[0.24] bg-white/[0.07] px-4 py-3 text-sm text-white placeholder:text-white/[0.48] transition-colors focus:border-km-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-wider text-white/[0.78]">Procedimento de interesse</label>
                <select
                  name="procedimento"
                  required
                  className="w-full rounded-btn border border-white/[0.24] bg-white/[0.07] px-4 py-3 text-sm text-white transition-colors focus:border-km-gold focus:outline-none"
                >
                  <option value="" className="text-black">Selecione...</option>
                  {procedimentos.map((p) => (
                    <option key={p} value={p} className="text-black">{p}</option>
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
          </div>
        )}
      </div>
    </section>
  );
}
