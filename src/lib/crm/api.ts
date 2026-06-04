const API_URL = process.env.KMBEAUTY_API_URL ?? "http://127.0.0.1:18814";
const API_TOKEN =
  process.env.KMBEAUTY_API_TOKEN ?? process.env.KMBEAUTY_CRM_API_TOKEN ?? "";

async function apiFetch(path: string, init?: RequestInit) {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "x-api-token": API_TOKEN,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`API ${path} → ${res.status}`);
  }

  return res.json();
}

export interface Lead {
  id: number;
  nome: string;
  telefone: string | null;
  data_contato: string | null;
  procedimento: string | null;
  status: string;
  segmento: string;
  canal: string;
  mes_referencia: string | null;
  tentativas_reativacao: number;
  proxima_reativacao: string | null;
  created_at: string;
  updated_at: string;
}

export interface LeadDetail extends Lead {
  historico: string | null;
}

export interface Interacao {
  id: number;
  sessao_id: string | null;
  direcao: string;
  canal: string;
  mensagem: string | null;
  intencao: string | null;
  agendou: boolean;
  created_at: string;
}

export interface LeadsResponse {
  ok: boolean;
  total: number;
  limit: number;
  offset: number;
  leads: Lead[];
}

export interface StatsResponse {
  total: number;
  agendados: number;
  pendentes: number;
  reativacao_pendente: number;
  taxa_conversao: string;
  top_procedimento: string | null;
  top_procedimento_n: number;
}

export async function fetchLeads(params: {
  status?: string;
  procedimento?: string;
  canal?: string;
  q?: string;
  limit?: number;
  offset?: number;
}): Promise<LeadsResponse> {
  const qs = new URLSearchParams();
  if (params.status) qs.set("status", params.status);
  if (params.procedimento) qs.set("procedimento", params.procedimento);
  if (params.canal) qs.set("canal", params.canal);
  if (params.q) qs.set("q", params.q);
  qs.set("limit", String(params.limit ?? 100));
  qs.set("offset", String(params.offset ?? 0));
  return apiFetch(`/api/leads?${qs}`);
}

export async function fetchStats(): Promise<StatsResponse> {
  return apiFetch("/api/stats");
}

export async function fetchLead(
  id: number
): Promise<{ lead: LeadDetail; interacoes: Interacao[] }> {
  return apiFetch(`/api/leads/${id}`);
}

export async function patchLead(id: number, data: Record<string, unknown>) {
  return apiFetch(`/api/leads/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
