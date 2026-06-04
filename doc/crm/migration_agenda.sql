-- KM Beauty — Migration: Sistema de Agenda
-- Executar em: paperclip-postgres, banco kmbeauty
-- Comando:
--   docker compose exec -T paperclip-postgres psql -U postgres \
--     -d kmbeauty -f /tmp/migration_agenda.sql

\connect kmbeauty

-- ── 1. Configuração de agenda (horários de atendimento por dia) ──────────────

CREATE TABLE IF NOT EXISTS config_agenda (
    id              BIGSERIAL PRIMARY KEY,
    dia_semana      INT NOT NULL,           -- 0=Dom, 1=Seg ... 6=Sab
    hora_inicio     TIME NOT NULL,          -- ex: '09:00'
    hora_fim        TIME NOT NULL,          -- ex: '18:00'
    duracao_slot    INT NOT NULL DEFAULT 60, -- minutos por atendimento
    ativo           BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CHECK (dia_semana BETWEEN 0 AND 6),
    CHECK (hora_fim > hora_inicio),
    CHECK (duracao_slot IN (30, 45, 60, 90, 120)),
    UNIQUE (dia_semana)
);

-- Horário padrão: Seg-Sex 09h-18h, Sáb 09h-13h
INSERT INTO config_agenda (dia_semana, hora_inicio, hora_fim, duracao_slot) VALUES
    (1, '09:00', '18:00', 60),
    (2, '09:00', '18:00', 60),
    (3, '09:00', '18:00', 60),
    (4, '09:00', '18:00', 60),
    (5, '09:00', '18:00', 60),
    (6, '09:00', '13:00', 60)
ON CONFLICT (dia_semana) DO NOTHING;

-- ── 2. Bloqueios (feriados, folgas, intervalos) ──────────────────────────────

CREATE TABLE IF NOT EXISTS bloqueios (
    id              BIGSERIAL PRIMARY KEY,
    titulo          TEXT NOT NULL,                      -- ex: "Feriado Nacional", "Almoço"
    data_inicio     TIMESTAMPTZ NOT NULL,
    data_fim        TIMESTAMPTZ NOT NULL,
    dia_inteiro     BOOLEAN NOT NULL DEFAULT TRUE,
    recorrente      BOOLEAN NOT NULL DEFAULT FALSE,     -- feriados fixos anuais
    google_event_id TEXT,                               -- sync bidirecional
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CHECK (data_fim > data_inicio)
);

-- ── 3. Agendamentos ──────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS agendamentos (
    id                  BIGSERIAL PRIMARY KEY,
    lead_id             BIGINT REFERENCES leads(id) ON DELETE SET NULL,
    nome_cliente        TEXT NOT NULL,
    telefone_cliente    TEXT,
    procedimento        TEXT,
    data_hora_inicio    TIMESTAMPTZ NOT NULL,
    data_hora_fim       TIMESTAMPTZ NOT NULL,
    duracao_min         INT NOT NULL DEFAULT 60,
    status              TEXT NOT NULL DEFAULT 'pendente',
    google_event_id     TEXT UNIQUE,                    -- ID do evento no Google Calendar
    google_meet_link    TEXT,                           -- se usar Meet
    observacoes         TEXT,
    origem              TEXT NOT NULL DEFAULT 'luisa',  -- luisa | manual | site
    cancelamento_motivo TEXT,
    compareceu          BOOLEAN,                        -- NULL = ainda não aconteceu
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CHECK (data_hora_fim > data_hora_inicio),
    CHECK (status IN ('pendente', 'confirmado', 'cancelado', 'realizado', 'no_show')),
    CHECK (origem IN ('luisa', 'manual', 'site'))
);

-- ── 4. Índices ───────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_agend_data
    ON agendamentos(data_hora_inicio, status);

CREATE INDEX IF NOT EXISTS idx_agend_lead
    ON agendamentos(lead_id) WHERE lead_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_agend_google
    ON agendamentos(google_event_id) WHERE google_event_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_agend_procedimento
    ON agendamentos(procedimento, data_hora_inicio);

CREATE INDEX IF NOT EXISTS idx_bloqueios_data
    ON bloqueios(data_inicio, data_fim);

-- ── 5. Trigger updated_at para agendamentos ──────────────────────────────────

CREATE OR REPLACE TRIGGER trg_agendamentos_updated_at
BEFORE UPDATE ON agendamentos
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE OR REPLACE TRIGGER trg_config_agenda_updated_at
BEFORE UPDATE ON config_agenda
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── 6. Permissões ────────────────────────────────────────────────────────────

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO kmbeauty;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO kmbeauty;

-- ── Verificação ──────────────────────────────────────────────────────────────
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('config_agenda', 'bloqueios', 'agendamentos')
ORDER BY table_name;
