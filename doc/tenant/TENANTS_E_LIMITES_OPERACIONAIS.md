# Tenants e Limites Operacionais

## Resumo

Existem dois contextos separados que se tocam no negocio da Dra. Kelly, mas nao devem ser misturados no runtime:

| Contexto | Dominio | Repo | Papel |
|---|---|---|---|
| Clinica KM Beauty | `kmbeauty.com.br` | `C:\\Users\\Esdras\\sites_app\\kmbeauty.com.br\\kmbeauty.site_app` | captar e atender pacientes |
| Curso / mentorias | `drakellymacedo.com.br` | `C:\\Users\\Esdras\\sites_app\\km\\km_app` | alunos, mentorias e area administrativa do curso |

## Decisao canonica

- A clinica e o curso sao tenants independentes.
- A Luisa da clinica deve continuar isolada como `luisa-kmbeauty`.
- A Luisa do curso e qualquer automacao em `drakellymacedo` nao devem atender pacientes da clinica por compartilhamento acidental.

## O que pode ser reaproveitado

- UX e componentes do admin do curso.
- Padroes de autenticacao, tabela, filtros e detalhe de lead.
- Estrategia de deploy Vercel e organizacao de app admin.
- Documentacao e guardrails do hub OpenClaw/VPS.

## O que nao deve ser reaproveitado diretamente

- Cookies, sessoes e segredos do tenant do curso.
- Workspace OpenClaw do curso.
- Variaveis `DRAKELLYMACEDO_*` como fonte de verdade para a clinica.
- Base de conhecimento do curso em respostas da Luisa da clinica.

## Recomendacao pratica

O melhor caminho e **replicar o admin do curso como base tecnica**, mas publicar um admin proprio da clinica com:

- naming `KMBEAUTY_*`
- auth separada
- conexao separada com CRM/API
- documentacao separada
- roteamento claro para o tenant `kmbeauty`

## Relacao com o hub OpenClaw

No hub central, a fronteira ja existe:

- `empresas/kmbeauty/` = clinica
- `empresas/drakellymacedo/` = curso

Este repositorio agora passa a refletir a mesma decisao, sem reabrir a mistura entre os dois lados.
