# PROJECT STATUS - KM Beauty Site

Atualizado em `2026-06-01`.

## Estado atual

- Este repositorio atende o site da clinica `kmbeauty.com.br`.
- O CRM da clinica agora esta unificado na mesma app, em `/crm`.
- O admin antigo saiu da raiz e foi movido para `legacy/dashboard_app_referencia/`.
- A Luisa da clinica continua pertencendo ao tenant `kmbeauty`, separado de `drakellymacedo`.
- A organizacao documental agora segue uma estrutura mais canonica em `doc/`.

## Documentos principais

- Navegacao do repo: `MAPA.md`
- Status operacional anterior: `doc/operacao/STATUS.md`
- Revisao atual do repositorio: `doc/auditorias/2026-06-01-avaliacao-repositorio-e-vps.md`
- Plano consolidado: `doc/planos/2026-06-01-plano-organizacao-unificada.md`
- Checklist de correcoes: `doc/checklists/2026-06-01-checklist-correcoes.md`

## Decisao estrutural

- Nao foi feita nova instalacao nem mudanca invasiva de deploy.
- A organizacao prioriza clareza entre:
  - site publico da clinica
  - CRM unificado da clinica em `/crm`
  - legado tecnico isolado em `legacy/`
  - referencias operacionais da VPS/hub
  - tenant independente do curso
