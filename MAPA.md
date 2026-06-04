# MAPA - KM Beauty Site

> Ponto de entrada do repositorio da clinica.
> Este workspace representa o site da clinica `kmbeauty.com.br` e o dashboard local de leads, sem misturar o tenant do curso `drakellymacedo`.

## O que existe aqui

| Area | Funcao |
|---|---|
| `src/` | site publico Next.js da clinica |
| `public/` | assets reais do site publico |
| `src/app/crm/` | CRM unificado dentro da mesma app Next.js |
| `legacy/` | referencias tecnicas antigas que nao fazem parte do app ativo |
| `doc/` | documentacao operacional, auditorias, planos e checklists |
| `doc/crm/` | schema, contexto e materiais do CRM |
| `doc/tenant/` | limites entre tenants e estrategia de reaproveitamento |
| `doc/infra/` | referencias da VPS/Contabo e integracoes externas |

## Leitura recomendada

1. `PROJECT_STATUS.md`
2. `doc/tenant/TENANTS_E_LIMITES_OPERACIONAIS.md`
3. `doc/auditorias/2026-06-01-avaliacao-repositorio-e-vps.md`
4. `doc/checklists/2026-06-01-checklist-correcoes.md`
5. `doc/infra/REFERENCIAS_VPS_CONTABO.md`

## Fronteiras importantes

- `kmbeauty.com.br` = site da clinica e atendimento da Luisa para pacientes.
- `drakellymacedo.com.br` = curso/mentorias em outro repositorio (`C:\\Users\\Esdras\\sites_app\\km\\km_app`).
- Reaproveitar padroes do admin do curso faz sentido.
- Compartilhar segredos, sessoes, runtime e memoria entre os tenants nao faz sentido.

## Estado da estrutura

- O site publico continua na raiz para nao mexer no deploy atual.
- O CRM agora vive em `src/app/crm/` dentro da app principal.
- O admin antigo foi movido para `legacy/dashboard_app_referencia/` como referencia tecnica.
- O clone estatico antigo foi movido para `doc/legado/clone_estatico/`.
- A documentacao foi reorganizada por finalidade, seguindo o estilo do hub OpenClaw.
