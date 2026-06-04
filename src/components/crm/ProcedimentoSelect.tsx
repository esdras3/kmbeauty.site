"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PROCEDIMENTOS = [
  "Endolaser",
  "Harmonização de Orelhas",
  "Black Peel",
  "Rinomodelação",
  "Toxina Botulínica",
  "Preenchimento",
  "Tratamento Capilar",
  "Harmonização Facial",
  "Massagem",
  "Mentoria",
  "Outros",
];

export function ProcedimentoSelect({ value }: { value?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("procedimento", e.target.value);
    } else {
      params.delete("procedimento");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params}`);
  }

  return (
    <select
      className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-km-gold/40"
      value={value ?? ""}
      onChange={handleChange}
    >
      <option value="">Todos</option>
      {PROCEDIMENTOS.map((p) => (
        <option key={p} value={p}>
          {p}
        </option>
      ))}
    </select>
  );
}
