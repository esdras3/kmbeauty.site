# KM Beauty — Achados da Análise do Projeto

**Data:** 2026-05-30  
**Responsável:** Esdras (esdras.ego@gmail.com)

---

## 1. Visão Geral do Projeto

O projeto KM Beauty é um **CRM inteligente** para a clínica de estética avançada **KM Beauty** (Dra. Kelly Macedo, Curitiba/PR). O sistema completa o ciclo de captação e retenção de leads via WhatsApp/Instagram, com uma IA (Luísa) para follow-up automatizado.

---

## 2. Achados Principais

### 2.1 Pipeline de Dados Completo

O projeto implementa um pipeline ETL completo:

| Etapa | Ferramenta | Arquivo |
|---|---|---|
| **Scraping** do site Wix | Playwright + BeautifulSoup | `scraper.py` |
| **Extração** de dados da planilha Excel | pandas + openpyxl | `migrate_to_notion.py` |
| **Normalização** de dados | Python (regex + mapping) | `migrate_to_notion.py` |
| **Migração → Notion** CRM | notion-client | `migrate_to_notion.py` |
| **Migração → PostgreSQL** | psycopg2 | `migrate_to_postgres.py` |
| **Geração de relatório PDF** | Playwright (HTML→PDF) | `gerar_pdf_relatorio.py` |

### 2.2 Métricas Críticas Descobertas

| Métrica | Valor |
|---|---|
| Total de leads históricos (Abr/2025–Mai/2026) | **2.663** |
| Leads agendados (convertidos) | ~143 |
| **Taxa de conversão** | **5,3%** |
| Média mensal de leads | ~190/mês |
| Pico de leads (Abr/2026) | 263 leads |
| Leads com potencial de reativação | ~400–500 |

### 2.3 Procedimentos Mais Procurados

1. **Endolaser** — 1.602 leads (60%)
2. **Harmonização de Orelhas** — ~579 leads (22%)
3. **Black Peel** — 71 leads (3%)
4. **Rinomodelação** — 54 leads (2%)
5. **Mentoria** — 25 leads (segmento B2B)

### 2.4 Problemas de Dados Identificados

1. **Status ambíguos**: 8 variantes textuais para 2 valores booleanos (sim/não)
2. **Telefones inconsistentes**: 4 formatos diferentes → normalização E.164 necessária
3. **Abas desalinhadas**: ABRIL/2025 e MAIO/2025 têm colunas em ordem diferente
4. **~110 leads** sem procedimento informado (`s/l`, `?` ou vazio)
5. **"Leads Mentoria"** usa schema diferente (campo `Fechou` em vez de `Agendado`)

---

## 3. Normalizações Implementadas

### 3.1 Procedimentos (Aliases → Nome Canônico)

O sistema normaliza **40+ variantes** para **11 procedimentos canônicos**:

| Nome Canônico | Exemplos de aliases detectados |
|---|---|
| Endolaser | endoalser, enddolaser, enndolaser, endoalaser |
| Harmonização de Orelhas | harmonização de orelha, orelha, paciente modelo-orelha, harmonizaçao |
| Black Peel | black pell |
| Rinomodelação | rinomodelacao |
| Toxina Botulínica | botox, toxina botulinica |
| Preenchimento | preenchimento labial, preenchedores, bioestimulador/preenchedores |
| Mentoria | mentorias, mentoria no geral, mentoria (microagulhamento) |

### 3.2 Status (Mapeamento Complexo)

```
sim/sim.                    → Agendado
nao/não/naoo/nnao/nso       → Sem Resposta
ainda não/ainda nao         → Pendente
em conversa                 → Negociando
+ detecção por regex no histórico → Inelegível ou Reativação Pendente
```

### 3.3 Detecção de Inelegíveis (Regex)

Padrões no histórico que marcam lead como **Inelegível**:
- Menor de idade / idade / criança / bebê
- Já fez cirurgia/operação
- Fora de Curitiba / Não é de Florianópolis

### 3.4 Detecção de Reativação Pendente

Padrões que indicam lead pode ser reativado:
- "mais para frente", "final do ano"
- "quando tiver/puder", "vai se organizar"
- "estava a viajar"

### 3.5 Normalização de Telefone

```
41 9999-9999     → 5541999999999
99999-9999       → 5541999999999 (assume DDD 41 - Curitiba)
+55 41 9...      → 5541999999999
```

---

## 4. Algoritmo de Scoring de Leads Quentes

O `gerar_pdf_relatorio.py` implementa um sistema de pontuação:

| Fator | Pontos |
|---|---|
| Padrão de alto interesse (match) | +5 por match |
| Lead de 2026 | +4 |
| Lead de Abril/Maio 2026 | +3 extra |
| Status "Negociando" | +5 |
| Status "Reativação Pendente" | +2 |
| Histórico > 25 chars | +2 |
| Histórico > 50 chars | +2 |
| Menção a "medo" | -2 |
| "Outro momento" / "mais para frente" | -1 |

**Ações recomendadas** são geradas automaticamente baseadas no contexto do histórico:
- Reagendamento
- Cobrança de horário
- Facilitação comercial
- Gancho de férias
- Resgate de decisão compartilhada
- Follow-up geral

---

## 5. Arquitetura Técnica

```
Site (Vercel)           VPS (Docker)              Notion (PersonalPay)
┌──────────────┐        ┌────────────────────┐     ┌────────────────────────┐
│ Clone Wix /  │ leads  │  n8n (automação)   │────▶│ Leads — Chat Luísa     │
│ Futuro Next  │───────▶│  OpenClaw (Luísa)  │     │ kmbeauty.site — CRM    │
│              │        │  PostgreSQL (PG)   │     └────────────────────────┘
└──────────────┘        │  Antigravity (API) │
                        └────────────────────┘
```

### 5.1 PostgreSQL Schema (4 tabelas)

1. **leads** — Tabela principal (2.663 registros)
2. **interacoes_ia** — Log de interações da Luísa (OpenClaw)
3. **reativacoes** — Log de tentativas de reativação
4. **webhook_log** — Payloads recebidos do n8n

### 5.2 IDs dos Databases Notion

| Recurso | ID |
|---|---|
| Hub KM Beauty | `36b06acd-3e9e-81a8-847e-c03a0758b4d4` |
| Leads — Chat Luísa | `415c466a-6365-485a-96d7-2ee5ec1b7eeb` |
| kmbeauty.site — CRM Leads | `41630bc177ef46deacaee4a7a58046c1` |

---

## 6. Infraestrutura

- **Container PostgreSQL**: `paperclip-postgres` (127.0.0.1:5433)
- **Banco dedicado**: `kmbeauty`
- **Multi-tenant**: Mesmo PG com OrtoProMax, Oliveira e Ferrari
- **Regra**: Todas as queries filtram por `tenant_id`
- **Clone estático**: https://kmbeautysite.vercel.app (Vercel)

---

## 7. Roadmap (Próximos Passos)

| # | Tarefa | Status |
|---|---|---|
| 1 | Migração Excel → Notion (2.688 leads) | ✅ Concluído |
| 2 | Schema PostgreSQL completo | ✅ Criado |
| 3 | Migração JSON → PostgreSQL | ✅ Criado |
| 4 | Webhook n8n `POST /api/webhook/luisa` | ⬜ Pendente |
| 5 | API CRUD de leads (Antigravity) | ⬜ Pendente |
| 6 | Painel Admin (dashboard + tabela) | ⬜ Pendente |
| 7 | Substituir clone Wix por Next.js/Astro | ⬜ Pendente |
| 8 | Configurar Luísa no OpenClaw | ⬜ Pendente |
| 9 | Workflow n8n completo | ⬜ Pendente |