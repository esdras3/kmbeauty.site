"use client";

import { useTransition } from "react";
import { updateLeadStatus } from "@/actions/leads";

const STATUSES = [
  "Pendente",
  "Negociando",
  "Agendado",
  "Sem Resposta",
  "Inelegível",
  "Reativação Pendente",
];

const COLORS: Record<string, string> = {
  Pendente: "bg-yellow-50 text-yellow-800 border-yellow-200",
  Negociando: "bg-blue-50 text-blue-800 border-blue-200",
  Agendado: "bg-green-50 text-green-800 border-green-200",
  "Sem Resposta": "bg-gray-50 text-gray-600 border-gray-200",
  Inelegível: "bg-red-50 text-red-700 border-red-200",
  "Reativação Pendente": "bg-purple-50 text-purple-800 border-purple-200",
};

export function StatusInlineChange({
  leadId,
  currentStatus,
}: {
  leadId: number;
  currentStatus: string;
}) {
  const [isPending, startTransition] = useTransition();
  const cls = COLORS[currentStatus] ?? "bg-gray-50 text-gray-600 border-gray-200";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    startTransition(() => updateLeadStatus(leadId, newStatus));
  }

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      disabled={isPending}
      className={`text-xs font-medium rounded-full px-2 py-0.5 border cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-km-gold/40 transition-opacity
        ${cls} ${isPending ? "opacity-50" : ""}`}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
