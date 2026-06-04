# KM Beauty — Painel de Leads

## Product

Internal CRM dashboard for Dra. Kelly Macedo's aesthetics clinic. Used daily by the receptionist and assistants to manage leads, track appointment conversions, and monitor reactivation campaigns.

## Register

product

## Users

Clinic receptionist and Dra. Kelly, at a desktop in a well-lit clinical environment during business hours. Task-focused — managing leads, changing statuses, scheduling callbacks. The interface should disappear into the task.

## Brand

- Logo: KM Beauty wordmark with interlaced KM gold-gradient monogram
- Primary accent: `#C49030` (gold matching the logo gradient)
- Surface: white (`#FFFFFF`)
- Background: near-white neutral (`#F6F6F6`)
- Dark: `#1A1A1A` (login screen only)

## Key surfaces

- `/login` — single-password auth gate
- `/leads` — paginated lead table with status/canal/procedimento/search filters + summary stats
- `/leads/[id]` — lead detail with interaction timeline

## State vocabulary

- Status badges: Pendente (yellow), Negociando (blue), Agendado (green), Sem Resposta (gray), Inelegível (red), Reativação Pendente (purple)
- Inline status change on every lead row and detail page
- Loading: skeleton pulse, never spinners in content
