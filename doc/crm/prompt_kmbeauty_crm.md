# Contexto do Projeto: CRM KM Beauty

Você atuará como um Engenheiro de Software Sênior para desenvolver o módulo CRM do site KM Beauty (https://kmbeautysite.vercel.app/). 
O desenvolvimento deve seguir estritamente o fluxo Vibe Coding, utilizando nossa stack padrão: Antigravity e VS Code. O design do painel administrativo (área logada) deve ser limpo, profissional, robusto e seguir a estética Engineering-First.

## 1. Arquitetura Multi-Tenant
O sistema deve ser projetado desde o dia zero para suportar múltiplos tenants em um único banco de dados PostgreSQL.
- **Regra de Ouro:** TODAS as tabelas do banco de dados (exceto tabelas de configuração global) devem conter a coluna `tenant_id` (UUID ou String).
- As consultas e mutações na API devem filtrar obrigatoriamente pelo `tenant_id` do usuário autenticado no contexto atual.
- O `tenant_id` para esta implementação específica será focado no contexto do cliente "KM Beauty".

## 2. Modelagem de Dados (CRUD Principal)
Crie as migrações, os modelos e as rotas de API para as seguintes entidades, baseando-se na estrutura de captação de leads estéticos:

- **Leads / Clientes:**
  - `id` (PK)
  - `tenant_id` (FK/Index)
  - `data_contato` (Date)
  - `telefone` (String)
  - `nome` (String)
  - `procedimento_interesse` (String - ex: Endolaser, Harmonização de Orelhas)
  - `status_agendamento` (Boolean ou Enum: Pendente, Agendado, Negociando, Sem Resposta)
  - `historico_resposta` (Text)

- **Interações da IA (Luisa):**
  - `id` (PK)
  - `lead_id` (FK)
  - `tenant_id` (Index)
  - `resumo_interacao` (Text)
  - `data_interacao` (Timestamp)
  - `agendamento_sugerido` (Timestamp, nullable)

## 3. Integração com a Agente de IA (Luisa)
A área administrativa deve conter uma interface para visualizar as interações da agente "Luisa" (focada em atendimento e triagem). 
- Crie um webhook no backend (via Antigravity) preparado para receber payloads do **n8n**. 
- O n8n fará a ponte entre o runtime do **OpenClaw** (onde a Luisa está instanciada) e este backend.
- O webhook deve aceitar chamadas POST com os dados do lead triado pela Luisa e atualizar o banco de dados PostgreSQL automaticamente.

## 4. Requisitos da Interface de Usuário (Admin)
- **Dashboard:** Visão geral de novos leads, taxa de agendamento e leads sem resposta.
- **Tabela de Leads (CRUD):** Visualização em tabela robusta, com filtros rápidos por `procedimento_interesse` e `status_agendamento`. Deve permitir edição em massa e exportação.
- **Visualização do Lead:** Modal ou página de detalhes (Slide-over) mostrando o histórico completo de interações daquele lead com a equipe humana e com a agente Luisa.

## 5. Instruções de Execução
1. Analise os requisitos acima e gere o esquema de banco de dados (SQL/ORM) considerando o PostgreSQL.
2. Crie a estrutura de diretórios e arquivos iniciais seguindo os padrões do framework Antigravity.
3. Desenvolva as rotas da API isolando a lógica de negócio no backend.
4. Construa os componentes visuais do painel administrativo.
5. Revise o código para garantir que nenhuma query está sendo feita sem a cláusula restritiva do `tenant_id`.

Aguarde minha confirmação após a geração do esquema de banco de dados antes de prosseguir para a criação das views.