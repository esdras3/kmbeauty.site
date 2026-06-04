# KM Beauty CRM — Checklist de Execução

**Atualizado:** 2026-05-30  
**Responsável:** Esdras (esdras.ego@gmail.com)

---

## Legenda

- ✅ Concluído
- 🔄 Em andamento
- ⬜ Pendente
- ⚠️ Bloqueado / depende de outro item

---

## Fase 1 — Fundação de Dados

- ✅ Analisar planilha Excel histórica (2.663 leads, Abr/2025–Mai/2026)
- ✅ Normalizar procedimentos, status, telefones e datas
- ✅ Gerar `leads_normalizados.json` (2.688 registros)
- ✅ Migrar leads históricos para o **Notion** (`migrate_to_notion.py`)
  - 2.688 leads criados no database `kmbeauty.site — CRM Leads`
  - IDs KM-0001 a KM-1305 (2025) + KM-1306... (2026)
- ✅ Definir schema PostgreSQL (`doc/crm/schema.sql`)
  - Tabelas: `leads`, `interacoes_ia`, `reativacoes`, `webhook_log`
  - Índices, triggers `updated_at`, constraints canônicas
- ✅ Criar script de migração JSON → PostgreSQL (`migrate_to_postgres.py`)

---

## Fase 2 — API & Backend

- ✅ Criar API REST Antigravity (`services/kmbeauty_crm/server.py`)
  - `GET  /health` — público
  - `GET  /api/leads` — filtros status/procedimento/canal/busca, paginação
  - `GET  /api/leads/{id}` — detalhe do lead + histórico de interações
  - `GET  /api/stats` — métricas consolidadas (total, agendados, top procedimento)
  - `POST /api/webhook/luisa` — recebe payload do n8n/Luísa
  - `POST /api/leads` — cria lead manual
  - `POST /api/interacoes` — log de interação da Luísa
  - `PATCH /api/leads/{id}` — atualiza campos do lead
- ✅ Autenticação por `x-api-token` / `Authorization: Bearer`
- ✅ Upsert idempotente por `(telefone, mes_referencia)`
- ✅ Criar artefatos de deploy Ansible
  - `ansible/kmbeauty-crm.yml` — playbook completo
  - `ansible/kmbeauty-crm.env.j2` — template de env
  - `ansible/kmbeauty-crm.service.j2` — unit systemd
  - `ansible/site.kmbeauty-webhooks.custom.example` — nginx
- ✅ Gerar credenciais (`KMBEAUTY_CRM_API_TOKEN`, `KMBEAUTY_DB_PASS`) → salvas em `.env.local`

### Pendente — Deploy na VPS

- ⬜ Copiar `leads_normalizados.json` para a VPS
- ⬜ Rodar playbook Ansible:
  ```bash
  export KMBEAUTY_DB_PASS="vGjjugE2e26BX81661Nh1t8Be6PZmmJg"
  export KMBEAUTY_CRM_API_TOKEN="7flp4PAZEUxAsPS8qvKsdXQsVNha2J-VWAaTWVfrBOI"
  ansible-playbook -i ansible/hosts.ini ansible/kmbeauty-crm.yml -e ansible_ssh_pass=$VPS_PASS
  ```
  - ⬜ Schema aplicado no `paperclip-postgres` (cria role + db `kmbeauty`)
  - ⬜ Serviço `kmbeauty-crm` ativo no systemd (porta 18814)
  - ⬜ UFW liberado para rede Docker do Mailcow (172.22.0.0/16)
  - ⬜ Token injetado no n8n
  - ⬜ nginx Mailcow expondo `/webhooks/kmbeauty/luisa`
- ⬜ Rodar migração histórica de dados:
  ```bash
  KMBEAUTY_DB_PASS="..." python migrate_to_postgres.py
  ```
- ⬜ Validar `GET /health` → `{"ok": true, "leads_total": 2688}`

---

## Fase 3 — Dashboard Admin ✅

> Interface web para a Dra. Kelly e atendentes acompanharem leads.

- ✅ Inicializar projeto Next.js 16 para o CRM, hoje unificado em `/crm`
- ✅ Layout base + design system (Tailwind CSS v4)
- ✅ **Página principal — Tabela de Leads** (`/leads`)
  - ✅ Listagem paginada (50/página)
  - ✅ Filtros: status (pills), procedimento (select), canal (pills)
  - ✅ Busca por nome/telefone (campo de busca com debounce de 400ms)
  - ✅ Botão WhatsApp direto (`https://wa.me/{telefone}`)
  - ✅ Ação rápida: alterar status inline (dropdown com server action)
- ✅ **Cards de métricas** (topo da página — 5 cards)
  - ✅ Total de leads
  - ✅ Agendados
  - ✅ Taxa de conversão (Agendado / total)
  - ✅ Leads para reativar (status "Reativação Pendente")
  - ✅ Top procedimento do mês (mais frequente no banco)
- ✅ **Página de lead** (`/leads/[id]`) — detalhe + histórico de interações
  - ✅ Campos do lead (procedimento, canal, segmento, datas, histórico)
  - ✅ Timeline de interações da Luísa
  - ✅ Alterar status diretamente na página de detalhe
- ✅ Autenticação simples (`DASHBOARD_PASSWORD` em variável de ambiente)
- ⬜ Deploy na Vercel:
  1. `vercel --cwd dashboard` (ou conectar repositório)
  2. Configurar variáveis de ambiente na Vercel:
     - `KMBEAUTY_API_URL=https://mail.personalpay.com.br/kmbeauty-crm` (proxy nginx da API na VPS)
     - `KMBEAUTY_API_TOKEN=7flp4PAZEUxAsPS8qvKsdXQsVNha2J-VWAaTWVfrBOI`
     - `DASHBOARD_PASSWORD=<senha segura>`
     - `SESSION_SECRET=<segredo longo aleatório>`

---

## Fase 4 — Luísa IA & Automação

- ⬜ Configurar persona da Luísa no OpenClaw
  - Nome: Luísa | Clínica: KM Beauty | Dra. Kelly Macedo
  - Procedimentos que ela conhece + preços aproximados
  - Fluxo: triagem → interesse → coleta de telefone → agendamento
  - Guardrail: nunca prometer preço fechado, sempre direcionar para a equipe
- ⬜ Criar workflow n8n **CRM Intake**
  - Trigger: webhook do OpenClaw (lead novo ou mensagem)
  - Normalizar payload
  - `POST https://mail.personalpay.com.br/webhooks/kmbeauty/luisa`
  - Registrar resposta no Notion (opcional)
- ⬜ Criar workflow n8n **Reativação Diária** (cron)
  - Buscar leads com `status = 'Reativação Pendente'` e `proxima_reativacao <= hoje`
  - Enviar mensagem via Luísa
  - `PATCH /api/leads/{id}` → incrementar `tentativas_reativacao`
  - Parar após 3 tentativas sem resposta
- ⬜ Testar fluxo ponta a ponta:
  WhatsApp → Luísa → n8n → API → PostgreSQL → Dashboard

---

## Fase 5 — Site (v2, pós-MVP)

- ⬜ Substituir clone estático do Wix por Next.js/Astro
- ⬜ Formulário de captação de leads integrado ao webhook
- ⬜ SEO básico + meta tags

---

## Dependências e Ordem Recomendada

```
Fase 1 ✅ → Fase 2 (API ✅, Deploy ⬜) → Fase 4 (Luísa/n8n) ← depende do deploy
Fase 3 ✅ (dashboard local/Vercel)
Fase 5 (pós-MVP)
```

O dashboard pode ser usado imediatamente via Vercel apontando para a VPS.

---

## Arquivos-chave

| Arquivo | Descrição |
|---|---|
| `doc/crm/schema.sql` | Schema PostgreSQL completo |
| `migrate_to_notion.py` | Migração Excel → Notion |
| `migrate_to_postgres.py` | Migração JSON → PostgreSQL |
| `services/kmbeauty_crm/server.py` | API REST Antigravity (porta 18814) |
| `ansible/kmbeauty-crm.yml` | Deploy completo na VPS |
| `.env.local` | Credenciais locais (nunca commitar) |
| `leads_normalizados.json` | 2.688 leads normalizados (fonte de verdade) |
| `src/app/crm/` | CRM unificado dentro da app principal |
| `legacy/dashboard_app_referencia/` | referencia tecnica do admin antigo |
