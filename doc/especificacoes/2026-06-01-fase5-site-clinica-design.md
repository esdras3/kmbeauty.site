# Spec — Fase 5: Site da Clínica KM Beauty (kmbeauty.com.br)

**Data:** 2026-06-01
**Status:** Design aprovado — aguardando implementação
**Responsável:** Esdras (orquestrador) + Claude Code

---

## Contexto

Substituir o clone estático do Wix (`doc/legado/clone_estatico/index.html`) por um site Next.js funcional para **clientes da clínica KM Beauty** (kmbeauty.com.br). Público: pessoas interessadas em procedimentos estéticos — **não** alunos do curso (esse é o tenant `drakellymacedo` em km_app).

---

## O que NÃO é este projeto

- **km_app** (`drakellymacedo.com.br`) — site do curso/mentorias para profissionais. Não tocamos.
- **admin separado na Vercel** — decisão antiga, hoje supersedida pelo CRM unificado em `/crm`.

---

## Decisões de design aprovadas

### Estrutura de páginas (Híbrido)

| Rota | Conteúdo |
|------|---------|
| `/` | Landing page completa (home) |
| `/procedimentos` | Lista detalhada de procedimentos |
| `/contato` | Formulário de lead + seção Luísa |

### Seções da home (em ordem)

1. **Header** — logo KM Beauty, nav (Procedimentos / Sobre / Contato), CTA "Agendar Avaliação"
2. **HeroSection** — headline principal, subheadline, CTA primário
3. **AuthorityBar** — anos de experiência, pacientes atendidos, procedimentos realizados
4. **ProcedimentosDestaque** ⭐ _Seção nova_ — 4 cards (Endolaser, Harmonização Facial, Botox, Preenchimento) + "Ver todos"
5. **AboutSection** — Dra. Kelly Macedo, formação, credenciais
6. **TestimonialsSection** — depoimentos de clientes
7. **DifferentialsSection** — diferenciais da clínica
8. **FaqSection** — dúvidas frequentes sobre procedimentos e preços
9. **LeadFormSection** ⭐ — formulário (nome, telefone, procedimento de interesse)
10. **FinalCtaSection** — CTA final "Agende sua avaliação gratuita"
11. **Footer** — links, contato, link admin discreto → `/crm`
12. **WhatsAppFab** — botão verde fixo (canto inferior esquerdo)
13. **LuisaChatWidget** — widget flutuante (canto inferior direito)

### Luísa no site

- **Widget flutuante** em todas as páginas (botão 🌸 com ponto dourado pulsante)
- **Seção dedicada** em `/contato` com chat embutido + opção WhatsApp
- **Chat embutido** no site — não redireciona para WhatsApp diretamente na primeira interação
- **Transbordo** para WhatsApp quando cliente solicitar humano

---

## Stack técnica

| Componente | Escolha |
|-----------|---------|
| Framework | Next.js 16 (App Router) — mesmo do km_app |
| Estilo | Tailwind CSS v4 |
| Localização | Raiz de `kmbeauty.site_app/` |
| Deploy | Vercel — projeto `kmbeauty.site` |
| Repositório | GitHub — `kmbeauty.site` (criar) |

### Brand colors (consistentes com dashboard)

| Token | Valor | Uso |
|-------|-------|-----|
| km-gold | `#C49030` | Accent primário, CTAs |
| km-dark | `#1A1A1A` | Fundo header/hero, textos escuros |
| white | `#FFFFFF` | Surface principal |
| near-white | `#F6F6F6` | Background geral |

---

## O que copiamos do km_app (só visual)

| Componente | Origem | Adaptação |
|-----------|--------|-----------|
| `LuisaChatWidget.tsx` | `km_app/components/sections/` | Texto: mentorias → procedimentos/agendamento |
| `WhatsAppFab.tsx` | `km_app/components/sections/` | Mensagem inicial da clínica |
| `lib/luisaChat.ts` | `km_app/lib/` | Ações padrão: procedimentos, não checkout |
| `lib/whatsapp.ts` | `km_app/lib/` | Número da clínica (a definir) |
| Estrutura de seções | `km_app/app/page.tsx` | Remover MentorshipsSection, ExperienceSection (mentorias) |

**Não copiamos:** checkout, membros, Prisma, Asaas, CourseBuilder, StudentTable, ThemeContext.

---

## Fluxo de dados — Luísa

```
Visitante do site
  → LuisaChatWidget (Next.js)
    → POST /api/chat (x-km-webhook-secret)
      → n8n webhook: https://personalpay.com.br/webhook/kmbeauty/chat
        → OpenClaw Bridge (172.22.1.1:18811)
          → agent_id: luisa-kmbeauty
            → Resposta ao chat (texto)
        → [paralelo] PostgreSQL CRM (172.22.1.1:18814) — lead salvo
        → [paralelo] Notion CRM DB: 41630bc177ef46deacaee4a7a58046c1 — lead salvo
```

> ⚠️ O DB `415c466a` ("Leads — Chat Luísa") pertence ao **drakellymacedo/curso** (km_app). Nunca usar neste workflow.

### Dual write Notion + PostgreSQL

**Ambos são escritos em paralelo via n8n.** Não se excluem:
- **PostgreSQL** → alimenta o dashboard admin e operações automatizadas
- **Notion CRM Leads** (`41630bc1...` — `kmbeauty.site — CRM Leads`) → visão visual/manual da equipe da clínica

---

## Infraestrutura criada (2026-05-31)

### Tenant kmbeauty na VPS (OpenClaw/n8n)

| Item | Status |
|------|--------|
| `empresas/kmbeauty/` no repo | ✅ Criado |
| `luisa_workspace/` (6 arquivos) | ✅ Criado |
| `prompts/luisa-kmbeauty.md` | ✅ Criado |
| `manifest.tsv` atualizado | ✅ |
| `NOMES_CANONICOS.md` atualizado | ✅ |
| `env/local/20-tenants/kmbeauty/` (3 arquivos) | ✅ Criado |
| Workflow n8n `kmbeauty_luisa_chat_intake.json` | ✅ Criado (dual write) |
| Deploy workspace na VPS | ⏳ Pendente |
| Ativar workflow n8n na VPS | ⏳ Pendente |
| Número WhatsApp para luisa-kmbeauty | ⏳ **Dependência aberta** |

---

## Variáveis de ambiente necessárias no site (Vercel)

| Variável | Descrição |
|---------|-----------|
| `KMBEAUTY_N8N_WEBHOOK_URL` | `https://personalpay.com.br/webhook/kmbeauty/chat` |
| `KMBEAUTY_N8N_WEBHOOK_SECRET` | Secret compartilhado com o n8n (gerar com `openssl rand -hex 32`) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número da clínica (a definir) |

---

## Repositório e deploy

| Item | Valor |
|------|-------|
| GitHub repo | `kmbeauty.site` (criar) |
| Vercel project | `kmbeauty.site` |
| Root directory | `/` (raiz do repo) |
| Framework preset | Next.js |
| Branch de produção | `main` |

---

## Pendências antes de ir a produção

- [ ] Criar repositório GitHub `kmbeauty.site`
- [ ] Criar projeto Vercel `kmbeauty.site` apontando para o repo
- [ ] Criar projeto Next.js na raiz de `kmbeauty.site_app/`
- [ ] Implementar seções (copiar de km_app e adaptar)
- [ ] Implementar `/api/chat` que encaminha para n8n
- [ ] Preencher `knowledge/procedimentos.md` com Dra. Kelly
- [ ] Preencher `knowledge/precos.md` com Dra. Kelly
- [ ] Provisionar número WhatsApp para `luisa-kmbeauty`
- [ ] Deploy workspace `luisa-kmbeauty` na VPS
- [ ] Importar e ativar workflow n8n na VPS
- [ ] Apontar domínio `kmbeauty.com.br` para o Vercel (após validar)
