# Referencias VPS e Contabo

## Fonte canonica consultada

Repositorio-base da VPS/hub:

- `C:\\Users\\Esdras\\sites_app\\servidor_email_openclaw\\servidor_email_openclaw_app`

Documentos principais consultados:

- `PROJECT_STATUS.md`
- `MAPA.md`
- `empresas/MAPA.md`
- `empresas/kmbeauty/MAPA.md`
- `empresas/drakellymacedo/MAPA.md`
- `env/README.md`
- `env/MAPA.md`
- `docs/infra/SEGREDOS_TENANTS.md`
- `docs/infra/WEBMAIL_TENANT_PLAYBOOK.md`

## Regras operacionais herdadas para este repo

- Preferir `repo primeiro` antes de qualquer alteracao ampla na VPS.
- Tratar a VPS como fonte da verdade para runtime, binds, webhooks e segredos ativos.
- Manter naming e documentacao por tenant, sem fallback silencioso para variaveis de outro negocio.
- Separar claramente site clinica, curso, webmail e agentes.
- Registrar integracoes externas sem expor segredos em arquivos versionados.

## Skills uteis para a camada VPS

Nao encontrei uma skill dedicada chamada `contabo`.

As skills mais proximas e uteis para esse tipo de configuracao sao:

| Skill | Quando usar |
|---|---|
| `administering-linux` | systemd, logs, processos, firewall, disco, usuarios e operacao de VPS Linux |
| `configuring-nginx` | reverse proxy, TLS, host virtual, roteamento de webhooks e apps |
| `managing-dns` | Cloudflare, TTL, CNAME/A, propagacao e troubleshooting DNS |
| `deploying-applications` | padroes de deploy, Vercel, containers, fluxos de publicacao e rollout |

## Leitura recomendada antes de mexer na VPS

1. Validar o tenant correto no hub (`kmbeauty` ou `drakellymacedo`).
2. Conferir se a configuracao canonica esta em `env/local/20-tenants/<tenant>/`.
3. Verificar se o que se quer mudar e repo, Vercel, n8n, OpenClaw, nginx ou Docker.
4. So depois tocar runtime remoto.
