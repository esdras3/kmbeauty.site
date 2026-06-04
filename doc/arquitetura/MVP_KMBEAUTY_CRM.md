# KM Beauty CRM — Documento de MVP (Produto Mínimo Viável)

**Data:** 2026-05-30  
**Responsável:** Esdras (esdras.ego@gmail.com)  
**Versão:** 1.0

---

## 1. Resumo Executivo

### O Problema

A KM Beauty (Dra. Kelly Macedo, Curitiba/PR) recebe **~190 leads/mês** via WhatsApp e Instagram, mas converte apenas **5,3%** em agendamentos. **95% dos leads somem após o 1º contato** por falta de follow-up automatizado. Existem **400–500 leads históricos** com potencial de reativação desperdiçado.

### A Solução (MVP)

Um **CRM inteligente com agente IA ("Luísa")** que:
1. Captura leads automaticamente de múltiplos canais
2. Classifica e pontua leads por probabilidade de conversão
3. Realiza follow-up automatizado via WhatsApp
4. Fornece dashboard para a Dra. Kelly acompanhar métricas

### Valor do Negócio

| Métrica | Atual | Com MVP |
|---|---|---|
| Taxa de conversão | 5,3% | **15–20%** (meta) |
| Leads reativados/mês | 0 | **30–50** |
| Tempo de follow-up | 24–72h (manual) | **< 5 min** (automático) |
| Receita potencial recuperada | — | **R$ 14.500–29.000/mês** |

---

## 2. Escopo do MVP

### 2.1 O que está INCLUSO no MVP

#### ✅ Fase 1 — Fundação (Semanas 1–2)

| Componente | Descrição | Status |
|---|---|---|
| PostgreSQL schema | Tabelas leads, interacoes_ia, reativacoes, webhook_log | ✅ Pronto |
| Migração de dados históricos | 2.663 leads do Excel → PostgreSQL + Notion | ✅ Pronto |
| Normalização de dados | Procedimentos, status, telefones, datas | ✅ Pronto |
| Clone estático do site | Backup visual em Vercel | ✅ Pronto |

#### ✅ Fase 2 — API & Webhook (Semanas 3–4)

| Componente | Descrição | Prioridade |
|---|---|---|
| API REST de leads | CRUD completo (GET/POST/PUT/DELETE) | 🔴 Alta |
| Webhook `POST /api/webhook/luisa` | Receber interações da Luísa (n8n → PG) | 🔴 Alta |
| Endpoints de busca | Filtros por status, procedimento, período | 🔴 Alta |
| Autenticação API | Token-based (para n8n e dashboard) | 🟡 Média |

#### ✅ Fase 3 — Dashboard (Semanas 5–6)

| Componente | Descrição | Prioridade |
|---|---|---|
| Tabela de leads | Lista com filtros, busca, paginação | 🔴 Alta |
| Métricas resumo | Total leads, conversão, reativações | 🔴 Alta |
| Gráfico de funil | Leads → Negociando → Agendado | 🟡 Média |
| Botão WhatsApp | Link direto para follow-up manual | 🟡 Média |

#### ✅ Fase 4 — Luísa IA (Semanas 7–8)

| Componente | Descrição | Prioridade |
|---|---|---|
| Configuração OpenClaw | Persona da Luísa + fluxo de triagem | 🔴 Alta |
| Workflow n8n | Webhook → IA → PG + Notion | 🔴 Alta |
| Triagem automática | Classificar intenção do lead | 🔴 Alta |
| Follow-up programado | Reagendamento automático | 🟡 Média |

### 2.2 O que está FORA do MVP (v2+)

- ❌ App mobile nativo
- ❌ Multi-tenant generalizado (OrtoProMax, etc.)
- ❌ Pagamentos/assinatura online
- ❌ Integração com Google Calendar
- ❌ Sistema de telefonia (ligações automatizadas)
- ❌ Machine learning preditivo avançado

---

## 3. Personas do Usuário

### Persona 1: Dra. Kelly Macedo (Dona do negócio)
- **Necessidade:** Ver métricas de conversão, acompanhar performance
- **Acesso:** Dashboard admin, relatórios PDF
- **Frequência:** 1–2x/dia (10 min)

### Persona 2: Atendente (Time de vendas)
- **Necessidade:** Ver leads atribuídos, fazer follow-up, atualizar status
- **Acesso:** Tabela de leads, botão WhatsApp
- **Frequência:** Contínuo durante expediente

### Persona 3: Luísa (Agente IA)
- **Necessidade:** Receber leads, classificar, responder, agendar
- **Acesso:** API (via n8n/OpenClaw)
- **Frequência:** 24/7 (automático)

---

## 4. Fluxos do MVP

### 4.1 Fluxo Principal: Lead Chega

```
WhatsApp/Instagram
       │
       ▼
   Luísa (OpenClaw)
       │
       ├── Classifica intenção (agendamento / dúvida / recusa)
       │
       ├── Cria lead no PG via webhook
       │
       └── Responde automaticamente ou encaminha para humano
              │
              ▼
         Dashboard (atualização em tempo real)
```

### 4.2 Fluxo de Reativação

```
Cron diário (n8n)
       │
       ▼
  Busca leads com:
  - status = "Reativação Pendente"
  - proxima_reativacao <= hoje
  - tentativas_reativacao < 3
       │
       ▼
  Luísa envia mensagem de reativação
       │
       ├── Respondeu → Atualiza status
       └── Não respondeu → Incrementa tentativa
```

### 4.3 Fluxo de Relatório

```
Semanal (automático)
       │
       ▼
  Gera PDF com:
  - Top 20 leads quentes
  - Métricas de conversão
  - Ações recomendadas
       │
       ▼
  Envia para Dra. Kelly (email/WhatsApp)
```

---

## 5. Arquitetura Técnica do MVP

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (Dashboard)                    │
│              Next.js/Astro na Vercel                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ Tabela   │  │ Métricas │  │ Gráficos │  │ Relatório│    │
│  │ de Leads │  │ Resumo   │  │ Funil    │  │ PDF      │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└────────────────────────┬────────────────────────────────────┘
                         │ REST API
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    API (Antigravity/VPS)                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ CRUD     │  │ Webhook  │  │ Busca &  │  │ Auth     │    │
│  │ Leads    │  │ /luisa   │  │ Filtros  │  │ Token    │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   BANCO DE DADOS (VPS)                       │
│              PostgreSQL (paperclip-postgres)                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ leads    │  │interacoes│  │reativacoe│  │webhook_lo│    │
│  │ (2.663)  │  │ _ia      │  │ s        │  │ g        │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└─────────────────────────────────────────────────────────────┘
                         ▲
                         │
┌────────────────────────┴────────────────────────────────────┐
│                  AUTOMAÇÃO (n8n + OpenClaw)                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ Workflow  │  │ Webhook  │  │ Cron de  │  │ Luísa    │    │
│  │ n8n      │  │ Receiver │  │ Reativação│  │ (IA)    │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Dados do MVP

### 6.1 Schema Resumido (PostgreSQL)

```sql
-- Tabela principal
leads (
  id, notion_page_id, nome, telefone, data_contato,
  procedimento, status, segmento, canal, historico,
  tentativas_reativacao, proxima_reativacao,
  mes_referencia, created_at, updated_at
)

-- Log de interações da Luísa
interacoes_ia (
  id, lead_id, sessao_id, direcao, canal,
  mensagem, intencao, agendou, payload_completo, aconteceu_em
)

-- Log de reativações
reativacoes (
  id, lead_id, numero_tentativa, mensagem_enviada,
  respondeu, agendou, tentou_em
)

-- Log de webhooks
webhook_log (
  id, source, event_type, lead_id, payload,
  processado, erro, received_at
)
```

### 6.2 Status Possíveis

| Status | Significado | Ação da Luísa |
|---|---|---|
| Pendente | Novo lead, aguardando contato | Enviar mensagem de boas-vindas |
| Negociando | Em conversa ativa | Continuar follow-up |
| Agendado | Conversão concluída | Confirmar agendamento |
| Sem Resposta | Não respondeu após tentativas | Reagendar para reativação |
| Inelegível | Não pode ser atendido | Ignorar |
| Reativação Pendente | Lead frio com potencial | Enviar reativação |

### 6.3 Procedimentos Canônicos

1. Endolaser
2. Harmonização de Orelhas
3. Black Peel
4. Rinomodelação
5. Toxina Botulínica
6. Preenchimento
7. Tratamento Capilar
8. Harmonização Facial
9. Massagem
10. Mentoria
11. Outros

---

## 7. Métricas de Sucesso do MVP

### 7.1 Métricas de Produto

| Métrica | Target (3 meses) | Target (6 meses) |
|---|---|---|
| Leads processados/mês | 190+ | 250+ |
| Taxa de conversão | 10% | 15–20% |
| Leads reativados/mês | 20 | 50 |
| Tempo médio de follow-up | < 30 min | < 5 min |
| Satisfação da Dra. Kelly | 7/10 | 9/10 |

### 7.2 Métricas Técnicas

| Métrica | Target |
|---|---|
| Uptime da API | 99% |
| Latência do webhook | < 2s |
| Dados migrados com sucesso | 100% |
| Cobertura de testes | 80% |

### 7.3 Métricas de Negócio

| Métrica | Target (6 meses) |
|---|---|
| Receita recuperada (reativações) | R$ 15.000–29.000/mês |
| ROI do projeto | 3–5x investimento |
| Tempo de retorno | < 3 meses |

---

## 8. Stack Tecnológica

| Camada | Tecnologia | Justificativa |
|---|---|---|
| **Frontend** | Next.js ou Astro | SSR, performance, SEO |
| **Estilo** | Tailwind CSS | Velocidade de desenvolvimento |
| **Backend API** | Antigravity (Python/FastAPI) | Já existe na VPS |
| **Banco de dados** | PostgreSQL 15 | Multi-tenant, JSONB, performance |
| **Automação** | n8n | Workflow visual, fácil de manter |
| **IA** | OpenClaw (Luísa) | LLM para triagem e follow-up |
| **CRM externo** | Notion | Backup + visualização para Dra. Kelly |
| **Deploy Frontend** | Vercel | Gratuito para hobby |
| **Deploy Backend** | VPS Docker | Controle total |
| **Monitoramento** | UptimeRobot + Sentry | Básico e gratuito |

---

## 9. Cronograma de Execução

```
Mês 1 (Fundação)
├── Sem 1-2: API REST de leads ✅ (schema + migração prontos)
├── Sem 3: Webhook /luisa
└── Sem 4: Autenticação + testes

Mês 2 (Dashboard + IA)
├── Sem 5-6: Dashboard (tabela + métricas)
├── Sem 7: Configuração Luísa (OpenClaw)
└── Sem 8: Workflow n8n completo

Mês 3 (Otimização)
├── Sem 9-10: Reativação automática
├── Sem 11: Relatórios PDF automáticos
└── Sem 12: Testes + ajustes + lançamento
```

---

## 10. Riscos e Mitigações

| Risco | Impacto | Probabilidade | Mitigação |
|---|---|---|---|
| Luísa responde inadequadamente | Alto | Média | Guardrails + supervisão humana |
| API do Notion muda | Médio | Baixa | Sincronização PG ↔ Notion |
| Leads não respondem reativação | Alto | Alta | Max 3 tentativas + pausa |
| VPS cai | Alto | Baixa | Backup automático + monitoramento |
| Dados históricos corrompidos | Médio | Baixa | Migração com dry-run + validação |

---

## 11. Entregáveis do MVP

| # | Entregável | Formato | Prazo |
|---|---|---|---|
| 1 | Documento de achados | `doc/auditorias/ACHADOS_PROJETO.md` | ✅ Entregue |
| 2 | Documento de MVP | `doc/arquitetura/MVP_KMBEAUTY_CRM.md` | ✅ Entregue |
| 3 | Schema PostgreSQL | `doc/crm/schema.sql` | ✅ Entregue |
| 4 | Script migração Notion | `migrate_to_notion.py` | ✅ Entregue |
| 5 | Script migração PG | `migrate_to_postgres.py` | ✅ Entregue |
| 6 | Relatório PDF | `gerar_pdf_relatorio.py` | ✅ Entregue |
| 7 | API REST de leads | Backend (Antigravity) | Semana 3 |
| 8 | Dashboard web | Frontend (Next.js/Astro) | Semana 6 |
| 9 | Workflow n8n | n8n | Semana 8 |
| 10 | Luísa configurada | OpenClaw | Semana 8 |

---

## 12. Próximos Passos Imediatos

1. **Criar repositório GitHub** para o projeto CRM
2. **Definir stack do frontend** (Next.js vs Astro)
3. **Implementar API REST** (CRUD de leads)
4. **Configurar webhook** `/api/webhook/luisa`
5. **Deploy do PostgreSQL** na VPS (container paperclip-postgres)
6. **Dashboard v1** com tabela de leads + métricas básicas
7. **Configurar Luísa** no OpenClaw com persona da Dra. Kelly
8. **Workflow n8n** de ponta a ponta
9. **Testes de integração** completos
10. **Lançamento beta** para a Dra. Kelly

---

> **Nota:** Este MVP foca em **resolver o problema central** (perda de leads por falta de follow-up) com o mínimo de funcionalidades necessário para gerar valor mensurável. Funcionalidades avançadas (ML, app mobile, multi-tenant) ficam para versões futuras.
