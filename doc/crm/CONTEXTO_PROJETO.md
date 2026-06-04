# KM Beauty — Documentação do Projeto CRM

**Data:** 2026-05-28  
**Responsável:** Esdras (esdras.ego@gmail.com)  
**Workspace Notion:** PersonalPay

---

## Visão Geral

CRM para a **KM Beauty Estética Avançada** (Dra. Kelly Macedo, Curitiba/PR).  
Site atual: https://www.kmbeauty.com.br (Wix) | Clone estático: https://kmbeautysite.vercel.app

**Problema central:** 190+ leads/mês chegam via WhatsApp/Instagram, mas apenas **5,3% são convertidos** porque não há follow-up automatizado. 95% dos leads some após o 1º contato.

**Solução:** CRM multi-tenant + agente IA "Luísa" para follow-up automatizado.

---

## Números da Planilha Histórica

| Métrica | Valor |
|---|---|
| Total de leads (Abr/2025–Mai/2026) | 2.663 |
| Leads agendados (convertidos) | ~143 |
| Taxa de conversão | **5,3%** |
| Média mensal de leads | ~190/mês |
| Pico (Abr/2026) | 263 leads no mês |
| Leads com potencial de reativação | ~400–500 |

**Top procedimentos:**
1. Endolaser — 1.602 leads (60%)
2. Harmonização de Orelhas — ~579 leads (22%)
3. Black Peel — 71 leads (3%)
4. Rinomodelação — 54 leads (2%)
5. Mentoria — 25 leads (segmento B2B)

---

## Arquitetura

```
Site (Vercel)           VPS (Docker)              Notion (PersonalPay)
┌──────────────┐        ┌────────────────────┐     ┌────────────────────────┐
│ Clone Wix /  │ leads  │  n8n (automação)   │────▶│ Leads — Chat Luísa     │
│ Futuro Next  │───────▶│  OpenClaw (Luísa)  │     │ kmbeauty.site — CRM    │
│              │        │  PostgreSQL (PG)   │     └────────────────────────┘
└──────────────┘        │  Antigravity (API) │
                        └────────────────────┘
```

**Fluxo de lead:**  
WhatsApp/Site → Luísa (triagem) → n8n (estrutura payload) → webhook API → PostgreSQL + Notion

---

## Infraestrutura Existente (VPS)

- **Docker** rodando com PostgreSQL multi-tenant
- **Outros tenants no mesmo banco:** OrtoProMax, Oliveira e Ferrari
- **Regra inviolável:** todas as queries filtram por `tenant_id`
- **Referência de env:** `servidor_email_openclaw/servidor_email_openclaw_app`

---

## Notion — IDs dos Databases

| Recurso | ID | URL |
|---|---|---|
| Hub KM Beauty | `36b06acd-3e9e-81a8-847e-c03a0758b4d4` | [Abrir](https://www.notion.so/36b06acd3e9e81a8847ec03a0758b4d4) |
| Leads — Chat Luísa (log de sessões) | `415c466a-6365-485a-96d7-2ee5ec1b7eeb` | [Abrir](https://www.notion.so/415c466a6365485a96d72ee5ec1b7eeb) |
| kmbeauty.site — CRM Leads | `41630bc177ef46deacaee4a7a58046c1` | [Abrir](https://www.notion.so/41630bc177ef46deacaee4a7a58046c1) |

**Collection ID do CRM Leads:** `27c641a5-001a-4a16-a7b5-20fd187cf377`

---

## Schema do CRM Leads (Notion + PostgreSQL)

| Campo | Tipo Notion | Tipo PG | Valores/Notas |
|---|---|---|---|
| Lead | TITLE | TEXT | Nome do cliente |
| ID Lead | UNIQUE_ID (KM-) | SERIAL | KM-001, KM-002... |
| Telefone | PHONE_NUMBER | TEXT | Normalizado: `5541999999999` |
| Data de Contato | DATE | DATE | — |
| Procedimento | SELECT | TEXT/ENUM | Ver tabela abaixo |
| Status | SELECT | TEXT/ENUM | Pendente / Negociando / Agendado / Sem Resposta / Inelegível / Reativação Pendente |
| Segmento | SELECT | TEXT | Estética / Mentoria |
| Canal | SELECT | TEXT | WhatsApp / Site Chat / Instagram / Indicação / Outro |
| Histórico | RICH_TEXT | TEXT | Resposta do cliente (da planilha) |
| Tentativas Reativação | NUMBER | INT | Quantidade de tentativas de reativação |
| Próxima Reativação | DATE | TIMESTAMP | Calculado pela Luísa |
| Mês Referência | RICH_TEXT | TEXT | Ex: "MAIO 2025" |

### Procedimentos Canônicos e Aliases (para normalização)

| Nome Canônico | Aliases na planilha |
|---|---|
| Endolaser | endolaser, endoalser, enddolaser, enndolaser, endoalaser |
| Harmonização de Orelhas | harmonização de orelhas, harmonização de orelha, orelha, paciente modelo-orelha |
| Black Peel | black peel, black pell |
| Rinomodelação | rinomodela ção, rinomodelação |
| Toxina Botulínica | toxina botulínica, botox |
| Preenchimento | preenchimento, preenchimento labial |
| Tratamento Capilar | tratamento capilar, capilar |
| Harmonização Facial | harmonização facial |
| Massagem | massagem |
| Mentoria | mentoria, mentorias, mentoria no geral |
| Outros | ?, não informado, s/l, NaN |

---

## Próximos Passos (Roadmap)

| # | Tarefa | Arquivo | Status |
|---|---|---|---|
| 1 | Script de migração Excel → Notion | `migrate_to_notion.py` | ✅ Concluído (2.688 leads) |
| 2 | Schema PostgreSQL completo | `doc/crm/schema.sql` | ✅ Criado |
| 3 | Script de migração JSON → PostgreSQL | `migrate_to_postgres.py` | ✅ Criado |
| 4 | Webhook n8n `POST /api/webhook/luisa` | Antigravity | ✅ Criado |
| 5 | API CRUD de leads (Antigravity) | Antigravity | ✅ Criado |
| 6 | Painel Admin (dashboard + tabela) | Antigravity | ⬜ |
| 7 | Substituir clone Wix por Next.js/Astro | a criar | ⬜ |
| 8 | Configurar Luísa no OpenClaw | OpenClaw | ⬜ |
| 9 | Workflow n8n completo | n8n | ⬜ |

---

## Problemas de Dados Conhecidos (planilha)

1. **Status** tem 8 variantes textuais para 2 valores booleanos
2. **Telefone** tem 4 formatos diferentes (normalizar para E.164: `+5541...`)
3. **ABRIL/2025** e **MAIO/2025** têm colunas em ordem diferente das demais abas
4. **~110 leads** sem procedimento informado (campo `s/l`, `?` ou vazio)
5. **"Leads Mentoria"** tem schema diferente (campo `Fechou` em vez de `Agendado`)
