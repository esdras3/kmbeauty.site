# Status do Projeto — KM Beauty Site (kmbeauty.com.br)

**Atualizado em:** 2026-06-01 (sessão 3 — deploy Luísa concluído)
**Repo GitHub:** https://github.com/esdras3/kmbeauty.site
**Site (staging):** https://kmbeauty-site.vercel.app
**Admin (CRM):** `/crm` na mesma aplicação Next.js do site

---

## O que está pronto ✅

### Infraestrutura CRM (Fases 1–3 — concluídas antes desta sessão)
- [x] Schema PostgreSQL multi-tenant na VPS (porta 18814, nginx /kmbeauty-crm/)
- [x] 2.661 leads históricos migrados da planilha Excel
- [x] CRM admin unificado em `/crm` dentro da mesma aplicação
  - Auth por cookie, tabela de leads com filtros, métricas, mudança inline de status
  - Brand colors km-gold #C49030, km-dark #1A1A1A

### OpenClaw / n8n / Paperclip (criado nesta sessão)
- [x] Tenant `kmbeauty` criado no hub (separado de `drakellymacedo`)
- [x] Agente `luisa-kmbeauty` registrado em `manifest.tsv` e `NOMES_CANONICOS.md`
- [x] Workspace completo em `empresas/kmbeauty/luisa_workspace/` (IDENTITY, SOUL, USER, AGENTS, HEARTBEAT, MAPA)
- [x] Prompt canônico em `openclaw_agents_v1/prompts/luisa-kmbeauty.md`
- [x] Env files em `env/local/20-tenants/kmbeauty/` (automation, core, crm)
- [x] Workflow n8n `kmbeauty_luisa_chat_intake.json` — dual write: PostgreSQL + Notion `41630bc1`

### Site Next.js — Plano A (concluído nesta sessão)
- [x] Next.js 16.2.6, Tailwind v3, TypeScript — build limpo, 4 rotas estáticas
- [x] Raiz do repo `kmbeauty.site_app/` — repositório separado do dashboard
- [x] Seções da home: Header, Hero, AuthorityBar, ProcedimentosDestaque, About, Testimonials, Differentials, FAQ, LeadForm, FinalCTA, Footer
- [x] Páginas: `/` (home), `/procedimentos` (10 cards), `/contato` (formulário)
- [x] WhatsAppFab fixo + link "Área restrita" no footer → dashboard
- [x] Deploy Vercel: https://kmbeauty-site.vercel.app
- [x] GitHub: https://github.com/esdras3/kmbeauty.site
- [x] Env vars na Vercel: NEXT_PUBLIC_WHATSAPP_NUMBER, NEXT_PUBLIC_WHATSAPP_MESSAGE

---

## O que falta fazer 🔧

### PRIORIDADE ALTA — Deploy VPS Luísa (próximo passo imediato)

- [x] **`KMBEAUTY_N8N_WEBHOOK_SECRET` gerado** — valor em `.env.local` e na Vercel
- [x] **`/api/chat` implementado** — `src/app/api/chat/route.ts` valida secret e encaminha para n8n
- [x] **`LuisaChatWidget` implementado** — widget flutuante 🌸 em `/` e `/contato`
- [x] **`src/lib/luisaChat.ts`** — ações padrão (procedimentos, agendar, preços, WhatsApp)
- [x] **Deploy Vercel** — https://kmbeauty-site.vercel.app com Luísa integrada
- [x] **Playbook Ansible criado** — `ansible/kmbeauty-luisa-agent.yml` (completo, idempotente)
- [x] **Script de deploy criado** — `scripts/deploy_luisa_kmbeauty.sh`

- [x] **Deploy executado e validado em 2026-06-01** — fluxo completo funcionando
  - Workspace `luisa-kmbeauty` já existia na VPS
  - `luisa-kmbeauty` adicionado ao `ALLOWED_AGENTS` do openclaw-bridge
  - Modelo trocado de `groq/llama-3.3-70b-versatile` → `google/gemini-2.5-flash` (workspace era 49k tokens, limite Groq é 12k)
  - Auth-profiles (Google API key) copiado de clark-of para luisa-kmbeauty
  - Workflow importado, corrigido (connections, webhookId, responseMode, continueOnFail) e ativado
  - `KMBEAUTY_N8N_WEBHOOK_SECRET` e `KMBEAUTY_NOTION_TOKEN` injetados no docker-compose do n8n
  - Bug ON CONFLICT do CRM PostgreSQL corrigido (índice parcial precisava do WHERE clause)
  - Nginx configurado com proxy correto para `/webhook/kmbeauty/chat`
  - URL webhook corrigida: `mail.personalpay.com.br` (não `personalpay.com.br`)
  - Env var `KMBEAUTY_N8N_WEBHOOK_URL` atualizada na Vercel via API REST
  - Redeploy feito: https://kmbeauty-site.vercel.app

- [x] **Fluxo end-to-end validado:**
  ```
  kmbeauty-site.vercel.app/api/chat → nginx → n8n → OpenClaw → luisa-kmbeauty (Gemini 2.5 Flash) → reply ✅
  ```
  HTTP 200 com `{reply, session_id}` corretos. CRM PostgreSQL grava leads. Notion pendente (schema fix).

### PRIORIDADE MÉDIA — Conteúdo real (com Dra. Kelly)

- [ ] **Foto real da Dra. Kelly Macedo**
  - Substituir placeholder na `AboutSection`
  - Adicionar à pasta `public/` do site

- [ ] **Depoimentos reais de pacientes**
  - Substituir os 3 placeholders em `TestimonialsSection.tsx`

- [ ] **Bio real da Dra. Kelly**
  - Atualizar texto em `AboutSection.tsx` e `src/lib/` se necessário

- [ ] **Preços dos procedimentos** (para a Luísa responder)
  - Preencher `empresas/kmbeauty/knowledge/precos.md` no OpenClaw
  - Definir com a Dra. Kelly quais preços divulgar publicamente

- [ ] **Número real de WhatsApp da clínica**
  - Atualizar `NEXT_PUBLIC_WHATSAPP_NUMBER` na Vercel
  - Atualizar `KMBEAUTY_WHATSAPP_NUMBER` no env da VPS

### PRIORIDADE MÉDIA — Domínios

- [ ] **`kmbeauty.com.br` → Vercel**
  - Após validar o site com a Dra. Kelly
  - Adicionar domínio no projeto Vercel `kmbeauty-site`
  - Configurar DNS: CNAME `@` → `cname.vercel-dns.com` (ou A record)

- [ ] **`crm.kmbeauty.com.br` → Dashboard admin**
  - Adicionar domínio no projeto Vercel do dashboard
  - Configurar DNS

### PRIORIDADE BAIXA — Melhorias futuras

- [ ] **Fase 4: Luísa via WhatsApp**
  - Depende de: número WhatsApp provisionado para `luisa-kmbeauty` no OpenClaw
  - Fluxo: mensagem WhatsApp → OpenClaw → luisa-kmbeauty → resposta
  - Usuário avisará quando o número estiver disponível

- [ ] **SEO e Analytics**
  - Google Analytics / PostHog para tracking de leads
  - Sitemap.xml e robots.txt
  - Meta tags Open Graph com imagem real

- [ ] **Formulário de lead → CRM direto**
  - Atualmente o LeadFormSection.tsx simula sucesso (console.log)
  - Plano B integra via Luísa; alternativa: POST direto para `/kmbeauty-crm/leads`

- [ ] **Imagens reais dos procedimentos**
  - Substituir cards de texto por cards com imagens em `ProcedimentosDestaque`

---

## Dependências abertas 🔑

| Dependência | Quem resolve | Impacto |
|-------------|-------------|---------|
| Número WhatsApp `luisa-kmbeauty` | Esdras / Dra. Kelly | Fase 4 bloqueada |
| `KMBEAUTY_N8N_WEBHOOK_SECRET` (gerar) | Esdras | Plano B bloqueado |
| Foto real Dra. Kelly | Dra. Kelly | Placeholder no site |
| Depoimentos reais | Dra. Kelly | Placeholders no site |
| Preços dos procedimentos | Dra. Kelly | Luísa não responde preços |
| Validação do site pela Dra. Kelly | Dra. Kelly | Domínio não pode ser apontado ainda |

---

## Arquitetura atual (referência rápida)

```
kmbeauty.com.br (site clínica)
  ↓
Vercel: kmbeauty-site.vercel.app [Next.js 16]
  ├── /api/chat (Plano B — não implementado)
  │     ↓
  │   n8n: personalpay.com.br/webhook/kmbeauty/chat
  │     ↓
  │   OpenClaw Bridge: 172.22.1.1:18811
  │     ↓ agent_id: luisa-kmbeauty
  │   Dual write: PostgreSQL (18814) + Notion (41630bc1)
  │
  └── Footer link → `/crm` [Admin]

Separado (não misturar):
  drakellymacedo.com.br → km_app [curso/mentorias]
  agent: luisa (drakellymacedo) ≠ luisa-kmbeauty (clínica)
```
