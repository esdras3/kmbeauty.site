import { fetchStats } from "@/lib/api";

export async function MetricsCards() {
  let stats;
  try {
    stats = await fetchStats();
  } catch {
    return (
      <p className="text-sm text-red-500">
        Não foi possível carregar as métricas.
      </p>
    );
  }

  const items = [
    {
      label: "leads",
      value: stats.total.toLocaleString("pt-BR"),
      accent: false,
    },
    {
      label: "agendados",
      value: stats.agendados.toLocaleString("pt-BR"),
      accent: true,
    },
    {
      label: "conversão",
      value: `${stats.taxa_conversao}%`,
      accent: false,
    },
    {
      label: "para reativar",
      value: stats.reativacao_pendente.toLocaleString("pt-BR"),
      accent: false,
    },
    ...(stats.top_procedimento
      ? [{ label: "top procedimento", value: stats.top_procedimento, accent: false }]
      : []),
  ];

  return (
    <div className="bg-km-surface border border-km-border rounded-xl px-6 py-4 flex flex-wrap gap-x-8 gap-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-baseline gap-2">
          <span
            className={`text-2xl font-semibold tabular-nums ${
              item.accent ? "text-green-700" : "text-gray-900"
            }`}
          >
            {item.value}
          </span>
          <span className="text-sm text-km-muted">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
