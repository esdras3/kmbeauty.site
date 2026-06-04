# Plano de Finalização — KM Beauty Clínica
**Data:** 2026-06-01  
**Projeto:** kmbeauty.site_app (clínica) — distinto de km_app (curso)  
**Responsável:** Esdras  

---

## Contexto — Dois projetos, uma VPS

| | **Clínica** | **Curso** |
|---|---|---|
| Site | kmbeauty.com.br → `kmbeauty.site_app` | drakellymacedo.com.br → `km_app` |
| Agente IA | `luisa-kmbeauty` | `luisa` (drakellymacedo) |
| Tenant OpenClaw | `kmbeauty` | `drakellymacedo` |
| Notion hub | `36b06acd-...` | separado |
| CRM Leads Notion | `41630bc1-...` | separado |
| n8n workflow | `kmbeauty_luisa_chat_intake.json` | workflow próprio |
| VPS compartilhada | `servidor_email_openclaw_app` | idem |
| **Regra:** | `tenant_id = 'kmbeauty'` em toda query | `tenant_id = 'drakellymacedo'` |

---

## Etapa 1 — Ativar Luísa na VPS (BLOQUEANTE)

> Sem isso, o chat no site não funciona. É o gargalo de tudo.

### 1.1 — Gerar e registrar o webhook secret

```bash
# Na VPS (SSH):
openssl rand -hex 32
# Copiar o valor gerado
```

Registrar em dois lugares:
- **Vercel** → projeto `kmbeauty-site` → Settings → Env Vars → `KMBEAUTY_N8N_WEBHOOK_SECRET`
- **n8n** → Credentials ou variável de ambiente do workflow

### 1.2 — Deploy do workspace luisa-kmbeauty na VPS

```bash
# Na VPS (SSH):
mkdir -p /opt/openclaw/workspaces/luisa-kmbeauty
mkdir -p /opt/openclaw/prompts

# Do repo local, copiar via scp ou rsync:
# scp -r empresas/kmbeauty/luisa_workspace/* user@vps:/opt/openclaw/workspaces/luisa-kmbeauty/
# scp openclaw_agents_v1/prompts/luisa-kmbeauty.md user@vps:/opt/openclaw/prompts/

# Verificar se o OpenClaw reconhece o agente:
curl http://172.22.1.1:18811/agents | grep luisa-kmbeauty
```

Arquivos que devem estar na VPS:
- `IDENTITY.md` — quem é a Luísa da clínica
- `SOUL.md` — tom de voz (clínica, não curso)
- `USER.md` — perfil da Dra. Kelly
- `AGENTS.md` — agentes que a Luísa pode chamar
- `HEARTBEAT.md` — contexto vivo
- `MAPA.md` — mapa de intenções
- `prompts/luisa-kmbeauty.md` — prompt canônico

### 1.3 — Importar e ativar workflow n8n

1. Acessar painel n8n da VPS: `https://personalpay.com.br/n8n` (ou porta configurada)
2. **Import from file:** `n8n_workflows/kmbeauty/kmbeauty_luisa_chat_intake.json`
3. Configurar no workflow:
   - Variável `KMBEAUTY_N8N_WEBHOOK_SECRET` (gerada no passo 1.1)
   - Credencial PostgreSQL apontando para `tenant_id = 'kmbeauty'`
   - Credencial Notion apontando para database `41630bc1-...`
4. **Ativar** o workflow
5. Anotar a webhook URL gerada: `https://personalpay.com.br/webhook/kmbeauty/chat`

### 1.4 — Registrar a webhook URL na Vercel

Vercel → projeto `kmbeauty-site` → Env Vars:
- `KMBEAUTY_N8N_WEBHOOK_URL` = URL do passo 1.3

### 1.5 — Testar fluxo completo

```bash
# Teste direto na VPS (bypass do site):
curl -X POST https://personalpay.com.br/webhook/kmbeauty/chat \
  -H "x-km-webhook-secret: SEU_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"message": "Olá, quero saber sobre o Endolaser", "session_id": "test-001"}'

# Resposta esperada: { "reply": "...", "session_id": "test-001" }
```

Verificar dual write:
- [ ] PostgreSQL: `SELECT * FROM interacoes_ia WHERE tenant_id = 'kmbeauty' ORDER BY created_at DESC LIMIT 3`
- [ ] Notion: abrir database `415c466a-...` (Leads — Chat Luísa) e confirmar nova entrada

---

## Etapa 2 — Conteúdo Real (depende da Dra. Kelly)

> Pode ser feito em paralelo à Etapa 1. Não bloqueia o go-live técnico.

### 2.1 — Foto da Dra. Kelly

- Receber foto em alta resolução (JPG/PNG, mínimo 800×800px)
- Salvar em `public/dra-kelly.jpg`
- Atualizar `src/components/sections/AboutSection.tsx`:
  ```tsx
  // Substituir o placeholder:
  <Image src="/dra-kelly.jpg" alt="Dra. Kelly Macedo" ... />
  ```

### 2.2 — Depoimentos reais

- Receber 3 depoimentos reais de pacientes (nome + procedimento + texto)
- Atualizar `src/components/sections/TestimonialsSection.tsx`
- Opcional: foto de cada paciente (com autorização)

### 2.3 — Preços dos procedimentos

- Definir com a Dra. Kelly quais preços divulgar publicamente
- Criar arquivo `empresas/kmbeauty/knowledge/precos.md` na VPS:
  ```markdown
  # Preços KM Beauty (referência para a Luísa)
  - Endolaser: a partir de R$ X
  - Harmonização de Orelhas: R$ X
  ...
  ```
- Registrar no workspace da Luísa para ela poder responder

### 2.4 — Número de WhatsApp real

Atualizar na Vercel:
- `NEXT_PUBLIC_WHATSAPP_NUMBER` = número real (ex: `554199999999`)
- `NEXT_PUBLIC_WHATSAPP_MESSAGE` = mensagem padrão de contato

Atualizar na VPS (env do tenant kmbeauty):
- `KMBEAUTY_WHATSAPP_NUMBER`

### 2.5 — Bio real da Dra. Kelly

- Atualizar texto em `src/components/sections/AboutSection.tsx`
- Atualizar `USER.md` no workspace da Luísa na VPS

---

## Etapa 3 — Domínios (após validação com a Dra. Kelly)

> Só executar depois que a Dra. Kelly ver e aprovar o site.

### 3.1 — `kmbeauty.com.br` → Site Next.js

1. Vercel → projeto `kmbeauty-site` → Settings → Domains → Add `kmbeauty.com.br`
2. No registrador de domínio (Locaweb/GoDaddy/etc):
   ```
   Tipo: CNAME
   Host: @  (ou www)
   Valor: cname.vercel-dns.com
   TTL: 3600
   ```
   *Se o registrador não aceita CNAME na raiz, usar o A record que a Vercel fornece.*
3. Aguardar propagação (5min–48h)
4. Vercel emite SSL automaticamente via Let's Encrypt

### 3.2 — `crm.kmbeauty.com.br` → CRM unificado

1. Vercel → projeto `kmbeauty-site` → Settings → Domains → Add `crm.kmbeauty.com.br`
2. No registrador:
   ```
   Tipo: CNAME
   Host: crm
   Valor: cname.vercel-dns.com
   TTL: 3600
   ```

---

## Etapa 4 — Melhorias pós go-live (Baixa prioridade)

### 4.1 — Formulário de Lead → CRM direto

Atualmente `LeadFormSection.tsx` só faz `console.log`. Conectar ao CRM:

```typescript
// src/components/sections/LeadFormSection.tsx
const handleSubmit = async (data: LeadFormData) => {
  await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: data.name,
      telefone: data.phone,
      procedimento: data.procedure,
      canal: 'Site Chat',
      tenant_id: 'kmbeauty'
    })
  })
}
```

Criar rota `src/app/api/leads/route.ts` que faz POST para `VPS_CRM_URL/api/leads`.

### 4.2 — SEO e Analytics

- `src/app/layout.tsx`: adicionar meta tags Open Graph com imagem real
- Criar `public/sitemap.xml` e `public/robots.txt`
- Adicionar Google Analytics ou PostHog

### 4.3 — Imagens nos cards de procedimentos

- Criar pasta `public/procedimentos/`
- Adicionar imagem para cada procedimento (WebP, 600×400px)
- Atualizar `src/components/sections/ProcedimentosDestaque.tsx` e `src/app/procedimentos/page.tsx`

### 4.4 — Luísa via WhatsApp (Fase 4)

> Bloqueado até o número WhatsApp ser provisionado para `luisa-kmbeauty` no OpenClaw.

Fluxo quando disponível:
```
WhatsApp → OpenClaw Bridge (18811) → agent_id: luisa-kmbeauty → resposta
```

---

## Ordem de execução recomendada

```
Semana 1:
  [ ] 1.1 Gerar secret (5min, VPS)
  [ ] 1.2 Deploy workspace luisa-kmbeauty na VPS (30min)
  [ ] 1.3 Importar e ativar workflow n8n (20min)
  [ ] 1.4 Registrar webhook URL na Vercel (5min)
  [ ] 1.5 Testar fluxo completo (30min)

Paralelo (aguardando Dra. Kelly):
  [ ] 2.1 Foto real
  [ ] 2.2 Depoimentos reais
  [ ] 2.3 Preços
  [ ] 2.4 WhatsApp real
  [ ] 2.5 Bio real

Após aprovação da Dra. Kelly:
  [ ] 3.1 DNS kmbeauty.com.br → Vercel
  [ ] 3.2 DNS crm.kmbeauty.com.br → Vercel

Pós go-live:
  [ ] 4.1 Formulário → CRM
  [ ] 4.2 SEO/Analytics
  [ ] 4.3 Imagens procedimentos
  [ ] 4.4 Luísa WhatsApp (quando número disponível)
```

---

## Dependências críticas

| Item | Quem | Bloqueia |
|---|---|---|
| Acesso SSH à VPS | Esdras | Etapas 1.1–1.5 |
| Aprovação da Dra. Kelly | Dra. Kelly | Etapa 3 (DNS) |
| Foto real | Dra. Kelly | 2.1 |
| Depoimentos | Dra. Kelly | 2.2 |
| Preços | Dra. Kelly | 2.3 + Luísa responder preços |
| Número WhatsApp real | Dra. Kelly | 2.4 |
| Número WhatsApp p/ Luísa | Esdras + provedor | Etapa 4.4 |

---

## Atenção — Isolamento entre projetos

Ao trabalhar na VPS, sempre confirmar que está no tenant correto:

```bash
# Clínica → tenant_id = 'kmbeauty'
# Curso  → tenant_id = 'drakellymacedo'

# Nunca misturar:
# ❌ luisa (drakellymacedo) no site da clínica
# ❌ luisa-kmbeauty no site do curso
# ❌ workflows n8n sem filtro por tenant
```
