# Plano de Organizacao Unificada

Data: `2026-06-01`

## Objetivo

Deixar este repositorio com uma organizacao unica e legivel, refletindo:

- site publico da clinica
- CRM de leads da clinica dentro da mesma app
- integracoes com a VPS/hub
- tenant independente do curso

## Principios

- sem nova instalacao
- sem quebrar deploy atual
- repo primeiro
- tenant da clinica isolado do tenant do curso
- reaproveitamento por espelho tecnico, nao por mistura operacional

## Estrutura alvo

### Raiz

- `src/` e `public/` continuam como app publica
- `src/app/crm/` passa a concentrar o CRM dentro da app principal
- `legacy/dashboard_app_referencia/` guarda o admin antigo apenas como consulta tecnica
- `MAPA.md` e `PROJECT_STATUS.md` passam a orientar leitura e manutencao

### Documentacao

- `doc/arquitetura/`
- `doc/auditorias/`
- `doc/checklists/`
- `doc/crm/`
- `doc/especificacoes/`
- `doc/infra/`
- `doc/legado/`
- `doc/operacao/`
- `doc/planos/`
- `doc/tenant/`

## Fases recomendadas

### Fase 1 - organizacao e navegacao

- concluida nesta passada
- mover docs para pastas por finalidade
- criar indices locais
- mover legado para pasta explicita

### Fase 2 - guardrails tecnicos

- ajustar lint da raiz
- reduzir ruido de lint do dashboard
- reforcar ignores de workspace

### Fase 3 - tenant e admin

- comparar admin do curso com `/crm`
- decidir reaproveitamento de componentes
- manter fronteira de auth, env e API

### Fase 4 - fluxo real de lead

- trocar formulario fake por intake real
- validar CRM, n8n e Luisa como corredor oficial
- revisar status operacional depois do rollout

## Resultado esperado

- qualquer agente ou humano entende rapido onde esta cada coisa
- fica claro que clinica e curso sao tenants separados
- o CRM da clinica pode evoluir sem acoplamento acidental
- o repo conversa melhor com o padrao ja adotado no hub OpenClaw
