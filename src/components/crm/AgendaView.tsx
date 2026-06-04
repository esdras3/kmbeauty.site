"use client";

import React, { useState, useEffect, useCallback } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

interface Agendamento {
  id: number;
  nome_cliente: string;
  telefone_cliente: string | null;
  procedimento: string | null;
  data_hora_inicio: string;
  data_hora_fim: string;
  status: "pendente" | "confirmado" | "cancelado" | "realizado" | "no_show";
  origem: string;
  observacoes: string | null;
  google_event_id: string | null;
}

interface Bloqueio {
  id: number;
  titulo: string;
  data_inicio: string;
  data_fim: string;
  dia_inteiro: boolean;
}

interface ConfigAgenda {
  dia_semana: number;
  hora_inicio: string;
  hora_fim: string;
  duracao_slot: number;
  ativo: boolean;
}

type Tab = "calendario" | "bloqueios" | "metricas" | "config";

// ── Constants ────────────────────────────────────────────────────────────────

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const DIAS_SEMANA_FULL = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const HORAS = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);

const STATUS_COLORS: Record<string, string> = {
  pendente:   "bg-yellow-100 text-yellow-800 border-yellow-300",
  confirmado: "bg-blue-100 text-blue-800 border-blue-300",
  realizado:  "bg-green-100 text-green-800 border-green-300",
  cancelado:  "bg-red-100 text-red-800 border-red-300",
  no_show:    "bg-gray-100 text-gray-700 border-gray-300",
};

const STATUS_LABELS: Record<string, string> = {
  pendente: "Pendente", confirmado: "Confirmado",
  realizado: "Realizado", cancelado: "Cancelado", no_show: "Não compareceu",
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function fmt(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function fmtHour(iso: string): string {
  return new Date(iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

// ── Component ────────────────────────────────────────────────────────────────

export function AgendaView() {
  const [tab, setTab] = useState<Tab>("calendario");
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [bloqueios, setBloqueios] = useState<Bloqueio[]>([]);
  const [config, setConfig] = useState<ConfigAgenda[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Agendamento | null>(null);
  const [showBloqueioForm, setShowBloqueioForm] = useState(false);
  const [newBloqueio, setNewBloqueio] = useState({ titulo: "", data_inicio: "", data_fim: "", dia_inteiro: true });

  // ── Fetch data ──────────────────────────────────────────────────────────────

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const from = fmt(weekStart);
      const to = fmt(addDays(weekStart, 6));
      const [agRes, blRes, cfRes] = await Promise.all([
        fetch(`/api/agenda/agendamentos?from=${from}&to=${to}`),
        fetch("/api/agenda/bloqueios"),
        fetch("/api/agenda/config"),
      ]);
      if (agRes.ok) setAgendamentos(await agRes.json());
      if (blRes.ok) setBloqueios(await blRes.json());
      if (cfRes.ok) setConfig(await cfRes.json());
    } catch {/* silencioso */} finally {
      setLoading(false);
    }
  }, [weekStart]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  async function updateStatus(id: number, status: string) {
    await fetch(`/api/agenda/agendamentos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setAgendamentos(prev => prev.map(a => a.id === id ? { ...a, status: status as Agendamento["status"] } : a));
    if (selected?.id === id) setSelected(s => s ? { ...s, status: status as Agendamento["status"] } : null);
  }

  async function deleteBloqueio(id: number) {
    await fetch(`/api/agenda/bloqueios/${id}`, { method: "DELETE" });
    setBloqueios(prev => prev.filter(b => b.id !== id));
  }

  async function saveBloqueio() {
    const res = await fetch("/api/agenda/bloqueios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBloqueio),
    });
    if (res.ok) {
      const b = await res.json();
      setBloqueios(prev => [b, ...prev]);
      setShowBloqueioForm(false);
      setNewBloqueio({ titulo: "", data_inicio: "", data_fim: "", dia_inteiro: true });
    }
  }

  async function saveConfig(cfg: ConfigAgenda) {
    await fetch(`/api/agenda/config/${cfg.dia_semana}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cfg),
    });
    setConfig(prev => prev.map(c => c.dia_semana === cfg.dia_semana ? cfg : c));
  }

  // ── Calendar helpers ─────────────────────────────────────────────────────────

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  function agendamentosForDay(date: Date): Agendamento[] {
    const d = fmt(date);
    return agendamentos.filter(a => a.data_hora_inicio.startsWith(d));
  }

  function isBloqueado(date: Date): boolean {
    return bloqueios.some(b => {
      const s = new Date(b.data_inicio);
      const e = new Date(b.data_fim);
      return date >= s && date <= e;
    });
  }

  // ── Metrics ──────────────────────────────────────────────────────────────────

  const totalSemana = agendamentos.length;
  const confirmados = agendamentos.filter(a => a.status === "confirmado" || a.status === "realizado").length;
  const cancelados = agendamentos.filter(a => a.status === "cancelado" || a.status === "no_show").length;
  const procedimentoCount = agendamentos.reduce<Record<string, number>>((acc, a) => {
    if (a.procedimento) acc[a.procedimento] = (acc[a.procedimento] ?? 0) + 1;
    return acc;
  }, {});
  const topProcedimento = Object.entries(procedimentoCount).sort((a, b) => b[1] - a[1])[0];

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-km-dark">Agenda</h1>
        <div className="flex gap-1 bg-km-bg border border-km-border rounded-lg p-1">
          {(["calendario", "bloqueios", "metricas", "config"] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors capitalize ${
                tab === t
                  ? "bg-white text-km-dark shadow-sm"
                  : "text-km-muted hover:text-km-dark"
              }`}
            >
              {t === "calendario" ? "Calendário" : t === "metricas" ? "Métricas" : t === "config" ? "Configurações" : "Bloqueios"}
            </button>
          ))}
        </div>
      </div>

      {/* ── TAB: CALENDÁRIO ─────────────────────────────────────────────────── */}
      {tab === "calendario" && (
        <div className="space-y-3">
          {/* Navegação de semana */}
          <div className="flex items-center justify-between bg-white border border-km-border rounded-lg px-4 py-2">
            <button onClick={() => setWeekStart(w => addDays(w, -7))} className="text-km-muted hover:text-km-dark px-2">‹</button>
            <span className="text-sm font-medium text-km-dark">
              {weekDays[0].toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
              {" — "}
              {weekDays[6].toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
            </span>
            <button onClick={() => setWeekStart(w => addDays(w, 7))} className="text-km-muted hover:text-km-dark px-2">›</button>
          </div>

          {loading ? (
            <div className="text-center py-12 text-km-muted text-sm">Carregando...</div>
          ) : (
            <div className="grid grid-cols-7 gap-1">
              {/* Cabeçalhos */}
              {weekDays.map((d, i) => (
                <div key={i} className={`text-center py-2 rounded-lg text-xs font-medium ${
                  fmt(d) === fmt(new Date()) ? "bg-km-gold text-white" : "bg-white border border-km-border text-km-muted"
                }`}>
                  <div>{DIAS_SEMANA[d.getDay()]}</div>
                  <div className="text-base font-bold">{d.getDate()}</div>
                </div>
              ))}

              {/* Células dos dias */}
              {weekDays.map((d, i) => {
                const ags = agendamentosForDay(d);
                const bloqueado = isBloqueado(d);
                return (
                  <div key={i} className={`min-h-32 rounded-lg border p-1.5 space-y-1 ${
                    bloqueado ? "bg-red-50 border-red-200" : "bg-white border-km-border"
                  }`}>
                    {bloqueado && (
                      <div className="text-xs text-red-500 font-medium text-center py-1">Bloqueado</div>
                    )}
                    {ags.map(a => (
                      <button
                        key={a.id}
                        onClick={() => setSelected(a)}
                        className={`w-full text-left text-xs px-1.5 py-1 rounded border ${STATUS_COLORS[a.status]} hover:opacity-80 transition-opacity`}
                      >
                        <div className="font-medium truncate">{fmtHour(a.data_hora_inicio)}</div>
                        <div className="truncate">{a.nome_cliente}</div>
                        {a.procedimento && <div className="truncate opacity-70">{a.procedimento}</div>}
                      </button>
                    ))}
                    {ags.length === 0 && !bloqueado && (
                      <div className="text-xs text-km-muted text-center py-4 opacity-40">—</div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Legenda */}
          <div className="flex gap-3 flex-wrap">
            {Object.entries(STATUS_LABELS).map(([k, v]) => (
              <div key={k} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-sm border ${STATUS_COLORS[k]}`} />
                <span className="text-xs text-km-muted">{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB: BLOQUEIOS ──────────────────────────────────────────────────── */}
      {tab === "bloqueios" && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm text-km-muted">Feriados, folgas e intervalos bloqueados</p>
            <button
              onClick={() => setShowBloqueioForm(true)}
              className="text-xs bg-km-gold text-white px-3 py-1.5 rounded-btn hover:bg-km-gold-hover transition-colors"
            >
              + Novo bloqueio
            </button>
          </div>

          {showBloqueioForm && (
            <div className="bg-white border border-km-border rounded-lg p-4 space-y-3">
              <h3 className="text-sm font-semibold text-km-dark">Novo bloqueio</h3>
              <input
                type="text"
                placeholder="Título (ex: Feriado, Almoço...)"
                value={newBloqueio.titulo}
                onChange={e => setNewBloqueio(p => ({ ...p, titulo: e.target.value }))}
                className="w-full border border-km-border rounded-btn px-3 py-2 text-sm focus:outline-none focus:border-km-gold"
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-km-muted mb-1 block">Início</label>
                  <input
                    type="datetime-local"
                    value={newBloqueio.data_inicio}
                    onChange={e => setNewBloqueio(p => ({ ...p, data_inicio: e.target.value }))}
                    className="w-full border border-km-border rounded-btn px-3 py-2 text-sm focus:outline-none focus:border-km-gold"
                  />
                </div>
                <div>
                  <label className="text-xs text-km-muted mb-1 block">Fim</label>
                  <input
                    type="datetime-local"
                    value={newBloqueio.data_fim}
                    onChange={e => setNewBloqueio(p => ({ ...p, data_fim: e.target.value }))}
                    className="w-full border border-km-border rounded-btn px-3 py-2 text-sm focus:outline-none focus:border-km-gold"
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm text-km-dark cursor-pointer">
                <input
                  type="checkbox"
                  checked={newBloqueio.dia_inteiro}
                  onChange={e => setNewBloqueio(p => ({ ...p, dia_inteiro: e.target.checked }))}
                  className="accent-km-gold"
                />
                Dia inteiro
              </label>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowBloqueioForm(false)} className="text-xs text-km-muted px-3 py-1.5 hover:text-km-dark">Cancelar</button>
                <button onClick={saveBloqueio} className="text-xs bg-km-gold text-white px-3 py-1.5 rounded-btn hover:bg-km-gold-hover">Salvar</button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {bloqueios.length === 0 && (
              <div className="text-center py-8 text-km-muted text-sm">Nenhum bloqueio cadastrado</div>
            )}
            {bloqueios.map(b => (
              <div key={b.id} className="bg-white border border-km-border rounded-lg px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-km-dark">{b.titulo}</div>
                  <div className="text-xs text-km-muted mt-0.5">
                    {fmtDate(b.data_inicio)}
                    {b.dia_inteiro ? " (dia inteiro)" : ` ${fmtHour(b.data_inicio)} – ${fmtHour(b.data_fim)}`}
                    {b.data_inicio.slice(0, 10) !== b.data_fim.slice(0, 10) && ` até ${fmtDate(b.data_fim)}`}
                  </div>
                </div>
                <button onClick={() => deleteBloqueio(b.id)} className="text-xs text-red-400 hover:text-red-600 transition-colors">Remover</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB: MÉTRICAS ───────────────────────────────────────────────────── */}
      {tab === "metricas" && (
        <div className="space-y-4">
          {/* Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Agendamentos na semana", value: totalSemana, color: "text-km-dark" },
              { label: "Confirmados / Realizados", value: confirmados, color: "text-blue-600" },
              { label: "Cancelados / No-show", value: cancelados, color: "text-red-500" },
              { label: "Taxa de confirmação", value: totalSemana ? `${Math.round((confirmados / totalSemana) * 100)}%` : "—", color: "text-green-600" },
            ].map((c, i) => (
              <div key={i} className="bg-white border border-km-border rounded-lg p-4">
                <div className={`text-2xl font-bold ${c.color}`}>{c.value}</div>
                <div className="text-xs text-km-muted mt-1">{c.label}</div>
              </div>
            ))}
          </div>

          {/* Procedimentos */}
          <div className="bg-white border border-km-border rounded-lg p-4">
            <h3 className="text-sm font-semibold text-km-dark mb-3">Procedimentos na semana</h3>
            {Object.keys(procedimentoCount).length === 0 ? (
              <div className="text-sm text-km-muted">Nenhum dado ainda</div>
            ) : (
              <div className="space-y-2">
                {Object.entries(procedimentoCount).sort((a, b) => b[1] - a[1]).map(([proc, count]) => (
                  <div key={proc} className="flex items-center gap-3">
                    <div className="text-xs text-km-dark w-40 truncate">{proc}</div>
                    <div className="flex-1 bg-km-bg rounded-full h-2">
                      <div
                        className="bg-km-gold h-2 rounded-full"
                        style={{ width: `${(count / totalSemana) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-km-muted w-8 text-right">{count}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Origem dos agendamentos */}
          <div className="bg-white border border-km-border rounded-lg p-4">
            <h3 className="text-sm font-semibold text-km-dark mb-3">Origem dos agendamentos</h3>
            {(() => {
              const origemCount = agendamentos.reduce<Record<string, number>>((acc, a) => {
                acc[a.origem] = (acc[a.origem] ?? 0) + 1;
                return acc;
              }, {});
              return Object.keys(origemCount).length === 0 ? (
                <div className="text-sm text-km-muted">Nenhum dado ainda</div>
              ) : (
                <div className="flex gap-4 flex-wrap">
                  {Object.entries(origemCount).map(([origem, count]) => (
                    <div key={origem} className="text-center">
                      <div className="text-2xl font-bold text-km-dark">{count}</div>
                      <div className="text-xs text-km-muted capitalize">{origem === "luisa" ? "Luísa (IA)" : origem}</div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ── TAB: CONFIGURAÇÕES ──────────────────────────────────────────────── */}
      {tab === "config" && (
        <div className="space-y-3">
          <p className="text-sm text-km-muted">Horários de atendimento por dia da semana</p>
          <div className="space-y-2">
            {DIAS_SEMANA_FULL.map((dia, i) => {
              const cfg = config.find(c => c.dia_semana === i);
              if (!cfg) return (
                <div key={i} className="bg-white border border-km-border rounded-lg px-4 py-3 flex items-center justify-between opacity-50">
                  <span className="text-sm text-km-muted">{dia}</span>
                  <span className="text-xs text-km-muted">Não configurado</span>
                </div>
              );
              return (
                <div key={i} className="bg-white border border-km-border rounded-lg px-4 py-3 flex items-center gap-4">
                  <div className="w-24 text-sm font-medium text-km-dark">{dia}</div>
                  <label className="flex items-center gap-1.5 text-xs text-km-muted cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cfg.ativo}
                      onChange={e => saveConfig({ ...cfg, ativo: e.target.checked })}
                      className="accent-km-gold"
                    />
                    Ativo
                  </label>
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="time"
                      value={cfg.hora_inicio}
                      disabled={!cfg.ativo}
                      onChange={e => saveConfig({ ...cfg, hora_inicio: e.target.value })}
                      className="border border-km-border rounded px-2 py-1 text-xs disabled:opacity-40 focus:outline-none focus:border-km-gold"
                    />
                    <span className="text-xs text-km-muted">até</span>
                    <input
                      type="time"
                      value={cfg.hora_fim}
                      disabled={!cfg.ativo}
                      onChange={e => saveConfig({ ...cfg, hora_fim: e.target.value })}
                      className="border border-km-border rounded px-2 py-1 text-xs disabled:opacity-40 focus:outline-none focus:border-km-gold"
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <label className="text-xs text-km-muted">Slot:</label>
                    <select
                      value={cfg.duracao_slot}
                      disabled={!cfg.ativo}
                      onChange={e => saveConfig({ ...cfg, duracao_slot: Number(e.target.value) })}
                      className="border border-km-border rounded px-2 py-1 text-xs disabled:opacity-40 focus:outline-none focus:border-km-gold"
                    >
                      {[30, 45, 60, 90, 120].map(v => (
                        <option key={v} value={v}>{v}min</option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Modal detalhe agendamento ────────────────────────────────────────── */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-card border border-km-border shadow-soft w-full max-w-md mx-4 p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-base font-bold text-km-dark">{selected.nome_cliente}</h2>
              <button onClick={() => setSelected(null)} className="text-km-muted hover:text-km-dark text-lg leading-none">×</button>
            </div>
            <div className="space-y-2 text-sm text-km-dark">
              {selected.procedimento && (
                <div><span className="text-km-muted">Procedimento: </span>{selected.procedimento}</div>
              )}
              <div>
                <span className="text-km-muted">Horário: </span>
                {new Date(selected.data_hora_inicio).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
                {" – "}
                {fmtHour(selected.data_hora_fim)}
              </div>
              {selected.telefone_cliente && (
                <div><span className="text-km-muted">Telefone: </span>
                  <a href={`https://wa.me/${selected.telefone_cliente}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                    {selected.telefone_cliente}
                  </a>
                </div>
              )}
              {selected.observacoes && (
                <div><span className="text-km-muted">Obs: </span>{selected.observacoes}</div>
              )}
              <div className="flex items-center gap-1.5">
                <span className="text-km-muted">Status: </span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_COLORS[selected.status]}`}>
                  {STATUS_LABELS[selected.status]}
                </span>
              </div>
              <div><span className="text-km-muted">Origem: </span>{selected.origem === "luisa" ? "Luísa (IA)" : selected.origem}</div>
              {selected.google_event_id && (
                <div className="text-xs text-km-muted">✓ Sincronizado com Google Calendar</div>
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-km-border">
              <p className="text-xs text-km-muted mb-2">Atualizar status:</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(STATUS_LABELS).map(([k, v]) => (
                  <button
                    key={k}
                    onClick={() => updateStatus(selected.id, k)}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-opacity ${STATUS_COLORS[k]} ${selected.status === k ? "opacity-100 ring-2 ring-offset-1 ring-km-gold" : "opacity-60 hover:opacity-100"}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
