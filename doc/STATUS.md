# Status do Projeto — KM Beauty Site (kmbeauty.com.br)

**Atualizado em:** 2026-06-01 (sessão 2)
**Repo GitHub:** https://github.com/esdras3/kmbeauty.site
**Site (staging):** https://kmbeauty-site.vercel.app
**Admin (dashboard):** https://dashboard-alpha-peach-96.vercel.app

---

## O que está pronto ✅

### Infraestrutura CRM (Fases 1–3 — concluídas antes desta sessão)
- [x] Schema PostgreSQL multi-tenant na VPS (porta 18814, nginx /kmbeauty-crm/)
- [x] 2.661 leads históricos migrados da planilha Excel
- [x] Dashboard admin em https://dashboard-alpha-peach-96.vercel.app
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
- [x] Env vars na Vercel: NEXT_PUBLIC_WHATSAPP_NUMBER, NEXT_PUBLIC_WHATSAPP_MESSAGE, NEXT_PUBLIC_ADMIN_URL

---

## O que falta fazer 🔧

### PRIORIDADE ALTA — Plano B: Luísa Chat Integration

- [x] **`KMBEAUTY_N8N_WEBHOOK_SECRET` gerado** — configurado na Vercel (não registrar o valor aqui)
- [x] **`/api/chat` implementado** — `src/app/api/chat/route.ts` valida secret e encaminha para n8n
- [x] **`LuisaChatWidget` implementado** — widget flutuante 🌸 em `/` e `/contato`
- [x] **`src/lib/luisaChat.ts`** — ações padrão (procedimentos, agendar, preços, WhatsApp)
- [x] **Deploy Vercel** — https://kmbeauty-site.vercel.app com Luísa integrada

- [ ] **Gerar `KMBEAUTY_N8N_WEBHOOK_SECRET` na VPS**
  ```bash
  openssl rand -hex 32
  ```
  Registrar no n8n (VPS) e no Vercel como `KMBEAUTY_N8N_WEBHOOK_SECRET`

- [ ] **Deploy do workspace `luisa-kmbeauty` na VPS**
  ```bash
  # Na VPS, via SSH:
  mkdir -p /opt/openclaw/workspaces/luisa-kmbeauty
  # Copiar arquivos de empresas/kmbeauty/luisa_workspace/ para a VPS
  # Copiar prompt de openclaw_agents_v1/prompts/luisa-kmbeauty.md
  ```

- [ ] **Importar e ativar workflow n8n na VPS**
  - Acessar painel n8n da VPS
  - Importar `n8n_workflows/kmbeauty/kmbeauty_luisa_chat_intake.json`
  - Configurar variável `KMBEAUTY_N8N_WEBHOOK_SECRET` no n8n
  - Ativar o workflow

- [ ] **Implementar `/api/chat` no site (Next.js)**
  - Rota: `src/app/api/chat/route.ts`
  - Recebe: `{ message, session_id, lead_name?, lead_phone?, lead_procedure?, page? }`
  - Valida: envia com header `x-km-webhook-secret`
  - Encaminha para: `KMBEAUTY_N8N_WEBHOOK_URL`
  - Retorna: `{ reply, session_id }`

- [ ] **Implementar `LuisaChatWidget` no site**
  - Copiar visual de `km_app/components/sections/LuisaChatWidget.tsx`
  - Adaptar: texto da boas-vindas (procedimentos, não mentorias)
  - Adaptar: ações padrão (ver procedimentos, agendar, WhatsApp)
  - Adaptar: tokens de cor (km-gold/km-dark em vez de cta/champagne-gold)
  - Adicionar ao `src/app/page.tsx` e `/contato`
  - Adicionar ao `src/lib/luisaChat.ts` (tipos e ações padrão)

- [ ] **Testar fluxo completo**
  - Chat → /api/chat → n8n → OpenClaw → luisa-kmbeauty → resposta
  - Verificar dual write: PostgreSQL + Notion `41630bc1`

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
  └── Footer link → dashboard-alpha-peach-96.vercel.app [Admin]

Separado (não misturar):
  drakellymacedo.com.br → km_app [curso/mentorias]
  agent: luisa (drakellymacedo) ≠ luisa-kmbeauty (clínica)
```
