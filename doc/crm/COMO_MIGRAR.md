# Como executar a migração Excel → Notion

## Pré-requisitos

```powershell
# Dentro do diretório do projeto
pip install -r requirements.txt
```

## 1. Obter o token do Notion

1. Acesse https://www.notion.so/my-integrations
2. Clique em "New integration"
3. Nome: `kmbeauty-migration` | Workspace: PersonalPay
4. Copie o token: `secret_xxx...`
5. **Compartilhe o banco com a integração:**
   - Abra o banco "kmbeauty.site — CRM Leads" no Notion
   - Clique nos `...` (canto superior direito) → Connections → Add connection → `kmbeauty-migration`

## 2. Configurar a variável de ambiente

```powershell
$env:NOTION_TOKEN = "secret_xxx..."
```

## 3. Testar com dry-run (sem inserir nada)

```powershell
# Testa com 10 leads de um mês específico
python migrate_to_notion.py --dry-run --mes "JULHO 2025" --limit 10

# Testa com todos os meses (sem inserir)
python migrate_to_notion.py --dry-run
```

## 4. Executar a migração completa

```powershell
# Migra tudo (~2.663 leads, ~15 minutos)
python migrate_to_notion.py

# Migra só um mês (para testar em produção)
python migrate_to_notion.py --mes "JULHO 2025"

# Se a migração parar no meio, continue de onde parou
python migrate_to_notion.py --skip 800

# Exporta os dados normalizados para JSON (para revisar antes)
python migrate_to_notion.py --dry-run --export-json leads_normalizados.json
```

## 5. O que o script faz automaticamente

| Dado da planilha | Normalização |
|---|---|
| `endoalser`, `enddolaser` | → `Endolaser` |
| `harmonização de orelha` | → `Harmonização de Orelhas` |
| `sim`, `Sim`, `sim.` | → Status `Agendado` |
| `nao`, `não`, `naoo` | → Status `Sem Resposta` |
| "vai fazer mais tarde" no histórico | → Status `Reativação Pendente` |
| "menor de idade" no histórico | → Status `Inelegível` |
| Telefone `41 9999-9999` | → `5541999999999` |
| `?`, `s/l`, vazio | → Procedimento `Outros` |

## Tempo estimado

- Notion API: 3 req/s (throttle automático no script)
- 2.663 leads ÷ 3/s ≈ **15 minutos**

## Resultado esperado no Notion

Após a migração, o banco "kmbeauty.site — CRM Leads" terá:

| Status | Quantidade estimada |
|---|---|
| Sem Resposta | ~2.100 |
| Agendado | ~143 |
| Reativação Pendente | ~400–500 |
| Inelegível | ~50–80 |
| Negociando | ~20–30 |

Os leads com status **Reativação Pendente** são o primeiro alvo da Luísa.
