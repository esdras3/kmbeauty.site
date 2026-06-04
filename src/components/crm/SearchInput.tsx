"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export function SearchInput({ value }: { value?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.trim();
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (val) {
        params.set("q", val);
      } else {
        params.delete("q");
      }
      params.set("page", "1");
      router.push(`${pathname}?${params}`);
    }, 400);
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
      <input
        type="search"
        defaultValue={value}
        onChange={handleChange}
        placeholder="Buscar nome ou telefone…"
        className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg w-60 focus:outline-none focus:ring-2 focus:ring-km-gold/40"
      />
    </div>
  );
}
