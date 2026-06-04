import { Lead, fetchLeads } from "@/lib/crm/api";
import { MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { StatusInlineChange } from "./StatusInlineChange";

const PAGE_SIZE = 50;

interface Props {
  status?: string;
  procedimento?: string;
  canal?: string;
  q?: string;
  page: number;
}

export async function LeadsTable({
  status,
  procedimento,
  canal,
  q,
  page,
}: Props) {
  const offset = (page - 1) * PAGE_SIZE;

  let data;
  try {
    data = await fetchLeads({
      status,
      procedimento,
      canal,
      q,
      limit: PAGE_SIZE,
      offset,
    });
  } catch {
    return (
      <p className="text-sm text-red-500 py-8 text-center">
        Não foi possível carregar os leads. API indisponível.
      </p>
    );
  }

  const totalPages = Math.ceil(data.total / PAGE_SIZE);

  function pageHref(nextPage: number) {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (procedimento) params.set("procedimento", procedimento);
    if (canal) params.set("canal", canal);
    if (q) params.set("q", q);
    params.set("page", String(nextPage));
    return `/crm/leads?${params}`;
  }

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-km-border">
        <table className="min-w-full text-sm">
          <thead className="bg-km-bg text-xs text-km-muted">
            <tr>
              <th className="px-4 py-3 text-left">Nome</th>
              <th className="px-4 py-3 text-left">Procedimento</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Canal</th>
              <th className="px-4 py-3 text-left">Mês</th>
              <th className="px-4 py-3 text-left">Contato</th>
              <th className="px-4 py-3 text-left">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-km-border bg-km-surface">
            {data.leads.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                  Nenhum lead encontrado com esses filtros.
                </td>
              </tr>
            )}
            {data.leads.map((lead: Lead) => (
              <tr key={lead.id} className="hover:bg-km-gold/5 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-800">
                  <Link
                    href={`/crm/leads/${lead.id}`}
                    className="hover:text-km-gold hover:underline"
                  >
                    {lead.nome}
                  </Link>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {lead.procedimento ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <StatusInlineChange
                    leadId={lead.id}
                    currentStatus={lead.status}
                  />
                </td>
                <td className="px-4 py-3 text-gray-500">{lead.canal}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {lead.mes_referencia ?? "—"}
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {lead.data_contato ?? "—"}
                </td>
                <td className="px-4 py-3">
                  {lead.telefone ? (
                    <a
                      href={`https://wa.me/${lead.telefone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-green-600 hover:text-green-700"
                      title="Abrir WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>
          {data.total === 0
            ? "Nenhum resultado"
            : `${offset + 1}–${Math.min(offset + PAGE_SIZE, data.total)} de ${data.total.toLocaleString("pt-BR")} leads`}
        </span>
        <div className="flex items-center gap-1">
          {page > 1 && (
            <Link href={pageHref(page - 1)} className="p-1.5 rounded hover:bg-gray-100">
              <ChevronLeft className="w-4 h-4" />
            </Link>
          )}
          <span className="px-2">
            {page} / {totalPages || 1}
          </span>
          {page < totalPages && (
            <Link href={pageHref(page + 1)} className="p-1.5 rounded hover:bg-gray-100">
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
