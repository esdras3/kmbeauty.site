# Checklist de Correcoes Priorizadas

## Prioridade 0 - isolamento e operacao segura

- [x] substituir o modelo atual de auth do dashboard por sessao assinada de verdade
- [x] remover qualquer fallback inseguro como `dev-secret` em ambiente produtivo
- [ ] confirmar que o dashboard da clinica usa apenas segredos `KMBEAUTY_*`
- [ ] documentar a origem canonica de cada variavel da clinica entre Vercel, repo e VPS

## Prioridade 1 - fluxo real de captacao

- [x] ligar `LeadFormSection` a um fluxo real de intake
- [ ] decidir se o form vai para CRM direto ou para o mesmo intake da Luisa
- [ ] registrar persistencia minima obrigatoria: nome, telefone, procedimento, origem e timestamp
- [x] validar o comportamento em erro para nao mostrar falso sucesso

## Prioridade 2 - reaproveitamento correto do admin

- [ ] comparar a UX do `/crm` com `empresas/drakellymacedo/admin_app`
- [ ] reaproveitar apenas componentes e padroes que nao acoplem tenants
- [ ] manter auth, env e endpoints da clinica isolados
- [x] decidir se o dashboard local substitui ou incorpora partes do admin do curso
  A decisao atual foi unificar no app principal e manter o admin antigo apenas como referencia em `legacy/dashboard_app_referencia/`.

## Prioridade 3 - higiene do workspace

- [x] confirmar que `npm run lint` passa na raiz
- [x] confirmar que o legado nao interfere no lint do app ativo
- [ ] revisar `.gitignore` para manter fora do git diretórios temporarios e de ferramentas
- [ ] revisar arquivos gerados e artefatos de build antes de publicar

## Prioridade 4 - documentacao e tenant ops

- [ ] alinhar `doc/operacao/STATUS.md` com o estado real atual da clinica
- [ ] atualizar o status do tenant `kmbeauty` no hub se houver mudancas de runtime
- [ ] registrar se o numero real de WhatsApp da clinica ja existe ou segue pendente
- [ ] consolidar a regra: curso e clinica nao compartilham memoria operacional

## Prioridade 5 - melhorias funcionais

- [x] corrigir pagina invalida no dashboard (`page=abc` -> fallback seguro)
- [ ] revisar links publicos do footer e placeholders visiveis
- [ ] substituir placeholder de WhatsApp por numero real quando aprovado
- [ ] preencher conhecimento da Luisa com precos, FAQ e roteiros da clinica
