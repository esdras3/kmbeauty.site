import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Hash, MessageCircle, Radio } from "lucide-react";
import { StatusInlineChange } from "@/components/crm/StatusInlineChange";
import { fetchLead } from "@/lib/crm/api";
import { requireAuth } from "@/lib/crm/auth";

export default async function LeadDetailPage({
  params,
}: PageProps<"/crm/leads/[id]">) {
  await requireAuth();
  const { id } = await params;

  let data;
  try {
    data = await fetchLead(Number(id));
  } catch {
    notFound();
  }

  const { lead, interacoes } = data;

  const fields = [
    { label: "Procedimento", value: lead.procedimento ?? "—", icon: Hash },
    { label: "Canal", value: lead.canal, icon: Radio },
    { label: "Segmento", value: lead.segmento, icon: Hash },
    {
      label: "Mês de Referência",
      value: lead.mes_referencia ?? "—",
      icon: Calendar,
    },
    {
      label: "Data de Contato",
      value: lead.data_contato ?? "—",
      icon: Calendar,
    },
    {
      label: "Tentativas Reativação",
      value: String(lead.tentativas_reativacao),
      icon: Hash,
    },
    {
      label: "Próxima Reativação",
      value: lead.proxima_reativacao ?? "—",
      icon: Calendar,
    },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <Link
        href="/crm/leads"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Voltar para Leads
      </Link>

      <div className="bg-km-surface rounded-xl border border-km-border p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{lead.nome}</h1>
            {lead.telefone ? (
              <a
                href={`https://wa.me/${lead.telefone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-green-600 hover:text-green-700 hover:underline mt-1"
              >
                <MessageCircle className="w-4 h-4" />
                {lead.telefone}
              </a>
            ) : (
              <p className="text-sm text-gray-400 mt-1">Sem telefone</p>
            )}
          </div>
          <StatusInlineChange leadId={lead.id} currentStatus={lead.status} />
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 text-sm">
          {fields.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-xs text-gray-400 uppercase tracking-wide">
                {label}
              </dt>
              <dd className="mt-0.5 text-gray-700 font-medium">{value}</dd>
            </div>
          ))}
        </dl>

        {lead.historico && (
          <div className="mt-5 border-t border-gray-50 pt-4">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1.5">
              Histórico
            </p>
            <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 whitespace-pre-wrap">
              {lead.historico}
            </p>
          </div>
        )}
      </div>

      <div className="bg-km-surface rounded-xl border border-km-border p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">
          Interações da Luísa{" "}
          <span className="text-gray-400 font-normal">
            ({interacoes.length})
          </span>
        </h2>

        {interacoes.length === 0 ? (
          <p className="text-sm text-gray-400">Nenhuma interação registrada.</p>
        ) : (
          <ol className="relative border-l border-km-border space-y-4 ml-2">
            {interacoes.map((item) => (
              <li key={item.id} className="pl-5">
                <span className="absolute -left-1.5 w-3 h-3 rounded-full bg-km-gold/50 border-2 border-white" />
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                  <span>
                    {item.direcao === "inbound" ? "↓ recebida" : "↑ enviada"}
                  </span>
                  <span>
                    {new Date(item.created_at).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {item.intencao && (
                    <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                      {item.intencao}
                    </span>
                  )}
                  {item.agendou && (
                    <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">
                      agendou ✓
                    </span>
                  )}
                </div>
                {item.mensagem && (
                  <p className="text-sm text-gray-700 mt-1">{item.mensagem}</p>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
