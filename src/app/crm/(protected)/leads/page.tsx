import Link from "next/link";
import { Suspense } from "react";
import { MetricsCards } from "@/components/crm/MetricsCards";
import { LeadsTable } from "@/components/crm/LeadsTable";
import { ProcedimentoSelect } from "@/components/crm/ProcedimentoSelect";
import { SearchInput } from "@/components/crm/SearchInput";
import { requireAuth } from "@/lib/crm/auth";

const STATUSES = [
  "Pendente",
  "Negociando",
  "Agendado",
  "Sem Resposta",
  "Inelegível",
  "Reativação Pendente",
];

const CANAIS = ["WhatsApp", "Site Chat", "Instagram", "Indicação", "Outro"];

export default async function LeadsPage({
  searchParams,
}: PageProps<"/crm/leads">) {
  await requireAuth();

  const sp = await searchParams;
  const status = typeof sp.status === "string" ? sp.status : undefined;
  const procedimento =
    typeof sp.procedimento === "string" ? sp.procedimento : undefined;
  const canal = typeof sp.canal === "string" ? sp.canal : undefined;
  const q = typeof sp.q === "string" ? sp.q : undefined;
  const rawPage = typeof sp.page === "string" ? Number(sp.page) : 1;
  const page =
    Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1;

  function filterHref(key: string, value: string | undefined) {
    const params = new URLSearchParams();
    if (key !== "status" && status) params.set("status", status);
    if (key !== "procedimento" && procedimento) {
      params.set("procedimento", procedimento);
    }
    if (key !== "canal" && canal) params.set("canal", canal);
    if (key !== "q" && q) params.set("q", q);
    if (value) params.set(key, value);
    params.set("page", "1");
    return `/crm/leads?${params}`;
  }

  return (
    <div className="space-y-4">
      <Suspense
        fallback={
          <div className="h-14 bg-km-surface border border-km-border rounded-xl animate-pulse" />
        }
      >
        <MetricsCards />
      </Suspense>

      <div className="bg-km-surface rounded-xl border border-km-border p-4 space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <Suspense fallback={null}>
            <SearchInput value={q} />
          </Suspense>
          {q && (
            <Link
              href={filterHref("q", undefined)}
              className="text-sm text-km-muted hover:text-gray-900"
            >
              limpar busca ×
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-km-muted w-24 shrink-0">Status</span>
          <Link
            href={filterHref("status", undefined)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              !status
                ? "bg-km-gold text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Todos
          </Link>
          {STATUSES.map((item) => (
            <Link
              key={item}
              href={filterHref("status", item)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                status === item
                  ? "bg-km-gold text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-km-muted w-24 shrink-0">Canal</span>
          <Link
            href={filterHref("canal", undefined)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              !canal
                ? "bg-km-gold text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Todos
          </Link>
          {CANAIS.map((item) => (
            <Link
              key={item}
              href={filterHref("canal", item)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                canal === item
                  ? "bg-km-gold text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-km-muted w-24 shrink-0">
            Procedimento
          </span>
          <Suspense fallback={null}>
            <ProcedimentoSelect value={procedimento} />
          </Suspense>
          {procedimento && (
            <Link
              href={filterHref("procedimento", undefined)}
              className="text-sm text-km-muted hover:text-gray-900"
            >
              limpar ×
            </Link>
          )}
        </div>
      </div>

      <Suspense
        fallback={
          <div className="h-64 bg-km-surface border border-km-border rounded-xl animate-pulse" />
        }
      >
        <LeadsTable
          status={status}
          procedimento={procedimento}
          canal={canal}
          q={q}
          page={page}
        />
      </Suspense>
    </div>
  );
}
