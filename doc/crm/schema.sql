-- KM Beauty — CRM PostgreSQL Schema
-- Container: paperclip-postgres (127.0.0.1:5433) — banco dedicado "kmbeauty"
-- Deploy:
--   docker compose exec -T paperclip-postgres psql -U postgres \
--     -v KMBEAUTY_DB_PASS='SENHA_AQUI' -f /tmp/kmbeauty_schema.sql

-- ── Role + banco ────────────────────────────────────────────────────────────

SELECT format('CREATE ROLE kmbeauty LOGIN PASSWORD %L', :'KMBEAUTY_DB_PASS')
WHERE NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'kmbeauty')\gexec

SELECT format('ALTER ROLE kmbeauty LOGIN PASSWORD %L', :'KMBEAUTY_DB_PASS')
WHERE EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'kmbeauty')\gexec

SELECT 'CREATE DATABASE kmbeauty OWNER kmbeauty'
WHERE NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'kmbeauty')\gexec

\connect kmbeauty

-- ── Enum-like CHECK constraints (valores canônicos) ─────────────────────────

-- status:      Pendente | Negociando | Agendado | Sem Resposta | Inelegível | Reativação Pendente
-- segmento:    Estética | Mentoria
-- canal:       WhatsApp | Site Chat | Instagram | Indicação | Outro
-- procedimento: Endolaser | Harmonização de Orelhas | Black Peel | Rinomodelação |
--               Toxina Botulínica | Preenchimento | Tratamento Capilar |
--               Harmonização Facial | Massagem | Mentoria | Outros

-- ── Tabela principal de leads ────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS leads (
    id                      BIGSERIAL PRIMARY KEY,
    notion_page_id          TEXT UNIQUE,                        -- sync com Notion
    nome                    TEXT NOT NULL DEFAULT 'Sem nome',
    telefone                TEXT,                               -- E.164 sem +: 5541999999999
    data_contato            DATE,
    procedimento            TEXT,
    status                  TEXT NOT NULL DEFAULT 'Sem Resposta',
    segmento                TEXT NOT NULL DEFAULT 'Estética',
    canal                   TEXT NOT NULL DEFAULT 'WhatsApp',
    historico               TEXT,
    tentativas_reativacao   INT NOT NULL DEFAULT 0,
    proxima_reativacao      TIMESTAMPTZ,
    mes_referencia          TEXT,                               -- ex: "MAIO 2025"
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CHECK (status IN (
        'Pendente', 'Negociando', 'Agendado',
        'Sem Resposta', 'Inelegível', 'Reativação Pendente'
    )),
    CHECK (segmento IN ('Estética', 'Mentoria')),
    CHECK (canal IN ('WhatsApp', 'Site Chat', 'Instagram', 'Indicação', 'Outro')),
    CHECK (procedimento IS NULL OR procedimento IN (
        'Endolaser', 'Harmonização de Orelhas', 'Black Peel', 'Rinomodelação',
        'Toxina Botulínica', 'Preenchimento', 'Tratamento Capilar',
        'Harmonização Facial', 'Massagem', 'Mentoria', 'Outros'
    ))
);

-- ── Log de interações da Luísa (OpenClaw) ───────────────────────────────────

CREATE TABLE IF NOT EXISTS interacoes_ia (
    id                  BIGSERIAL PRIMARY KEY,
    lead_id             BIGINT REFERENCES leads(id) ON DELETE SET NULL,
    sessao_id           TEXT,                   -- session ID do OpenClaw/n8n
    direcao             TEXT NOT NULL DEFAULT 'inbound',
    canal               TEXT NOT NULL DEFAULT 'WhatsApp',
    mensagem            TEXT,
    intencao            TEXT,                   -- classificação da Luísa: agendamento, duvida, recusa…
    agendou             BOOLEAN NOT NULL DEFAULT FALSE,
    payload_completo    JSONB NOT NULL DEFAULT '{}'::jsonb,
    aconteceu_em        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CHECK (direcao IN ('inbound', 'outbound', 'interno'))
);

-- ── Log de tentativas de reativação ─────────────────────────────────────────

CREATE TABLE IF NOT EXISTS reativacoes (
    id                  BIGSERIAL PRIMARY KEY,
    lead_id             BIGINT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    numero_tentativa    INT NOT NULL DEFAULT 1,
    mensagem_enviada    TEXT,
    respondeu           BOOLEAN NOT NULL DEFAULT FALSE,
    agendou             BOOLEAN NOT NULL DEFAULT FALSE,
    tentou_em           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Webhook log (payloads recebidos do n8n) ──────────────────────────────────

CREATE TABLE IF NOT EXISTS webhook_log (
    id              BIGSERIAL PRIMARY KEY,
    source          TEXT NOT NULL DEFAULT 'n8n',        -- n8n | site | manual
    event_type      TEXT NOT NULL,                      -- lead.created | lead.updated | luisa.interaction
    lead_id         BIGINT REFERENCES leads(id) ON DELETE SET NULL,
    payload         JSONB NOT NULL DEFAULT '{}'::jsonb,
    processado      BOOLEAN NOT NULL DEFAULT FALSE,
    erro            TEXT,
    received_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Índices ──────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_leads_status        ON leads(status, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_proxima_reat  ON leads(proxima_reativacao) WHERE proxima_reativacao IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_leads_procedimento  ON leads(procedimento);
CREATE INDEX IF NOT EXISTS idx_leads_mes           ON leads(mes_referencia);
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_telefone_mes ON leads(telefone, mes_referencia)
    WHERE telefone IS NOT NULL AND telefone != '';

CREATE INDEX IF NOT EXISTS idx_interacoes_lead     ON interacoes_ia(lead_id, aconteceu_em DESC);
CREATE INDEX IF NOT EXISTS idx_interacoes_sessao   ON interacoes_ia(sessao_id) WHERE sessao_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_reativacoes_lead    ON reativacoes(lead_id, tentou_em DESC);

CREATE INDEX IF NOT EXISTS idx_webhook_processado  ON webhook_log(processado, received_at DESC);
CREATE INDEX IF NOT EXISTS idx_webhook_lead        ON webhook_log(lead_id) WHERE lead_id IS NOT NULL;

-- ── Função updated_at automático ────────────────────────────────────────────

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

CREATE OR REPLACE TRIGGER trg_leads_updated_at
BEFORE UPDATE ON leads
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── Permissões ───────────────────────────────────────────────────────────────

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO kmbeauty;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO kmbeauty;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO kmbeauty;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO kmbeauty;
