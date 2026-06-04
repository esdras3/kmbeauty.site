const COLORS: Record<string, string> = {
  Pendente: "bg-yellow-100 text-yellow-800",
  Negociando: "bg-blue-100 text-blue-800",
  Agendado: "bg-green-100 text-green-800",
  "Sem Resposta": "bg-gray-100 text-gray-600",
  Inelegível: "bg-red-100 text-red-700",
  "Reativação Pendente": "bg-purple-100 text-purple-800",
};

export function StatusBadge({ status }: { status: string }) {
  const cls = COLORS[status] ?? "bg-gray-100 text-gray-600";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {status}
    </span>
  );
}
