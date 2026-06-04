# Avaliacao do Repositorio e Alinhamento com a VPS

Data: `2026-06-01`

## Escopo

- revisar o repo da clinica `kmbeauty.site_app`
- cruzar a organizacao local com o padrao do hub OpenClaw/VPS
- separar claramente clinica e curso
- listar riscos, gaps e oportunidades de reaproveitamento

## Descobertas principais

### 1. O repo passou a ter uma app ativa e um legado isolado

- app unica da clinica na raiz (`src/`, `public/`, `src/app/crm/`)
- admin antigo movido para `legacy/dashboard_app_referencia/`

Isso reduz ambiguidade operacional e deixa claro o que esta em producao e o que serve apenas como referencia tecnica.

### 2. A fronteira entre clinica e curso precisa ficar explicita no repo

No hub OpenClaw a separacao ja existe:

- `kmbeauty` = clinica
- `drakellymacedo` = curso

No repo da clinica, essa mesma fronteira precisava aparecer com mais clareza para evitar reaproveitamento errado de runtime, segredos e memoria.

### 3. O CRM pode reaproveitar o admin do curso, mas como espelho tecnico

Foi encontrado um admin em `empresas/drakellymacedo/admin_app` no repositorio central. Isso confirma que vale reaproveitar componentes e padroes, desde que:

- o auth seja proprio
- a API seja propria
- o naming continue `KMBEAUTY_*`
- o tenant da clinica nao passe a depender de estado do curso

### 4. A camada documental estava funcional, mas espalhada

Antes desta reorganizacao, documentos chave estavam todos no nivel `doc/`, o que dificultava localizar:

- auditoria
- plano
- status operacional
- contexto de tenant
- legado

### 5. O workspace local tinha ruido operacional

Os principais ruidos eram:

- hidden dirs de ferramentas no repo e no admin legado
- lint da raiz quebrado
- referencias de documentacao apontando para o dashboard separado

## Ajustes aplicados nesta passada

- documentacao reorganizada por finalidade
- `clone_estatico/` movido para `doc/legado/clone_estatico/`
- `dashboard/` movido para `legacy/dashboard_app_referencia/`
- criado `MAPA.md` na raiz
- criado `PROJECT_STATUS.md` na raiz
- criada documentacao de fronteira entre tenants
- criada referencia local para VPS/Contabo e skills relacionadas
- ajustados ignores do workspace
- preparado lint da raiz com `eslint .`
- reduzido ruido do lint com ignores explicitos para o legado

## Conclusao

O repositorio ficou mais proximo do padrao do hub sem exigir reinstalacao nem refactor estrutural arriscado.

A direcao recomendada e:

1. manter o site publico da clinica neste repo
2. manter o CRM da clinica dentro da mesma app, em `/crm`
3. reaproveitar o admin do curso so como base tecnica
4. preservar isolamento de tenant na VPS, no naming e na documentacao
