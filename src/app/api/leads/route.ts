import { NextRequest, NextResponse } from "next/server";

const API_URL =
  process.env.KMBEAUTY_API_URL?.replace(/\/$/, "") ??
  process.env.KMBEAUTY_CRM_API_URL?.replace(/\/$/, "") ??
  "";
const API_TOKEN =
  process.env.KMBEAUTY_API_TOKEN ?? process.env.KMBEAUTY_CRM_API_TOKEN ?? "";

function normalizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(req: NextRequest) {
  if (!API_URL || !API_TOKEN) {
    return NextResponse.json(
      { error: "Captação de leads não configurada." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corpo inválido." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const nome = normalizeText(payload.nome);
  const telefone = normalizeText(payload.telefone);
  const procedimento = normalizeText(payload.procedimento);

  if (!nome || !telefone || !procedimento) {
    return NextResponse.json(
      { error: "Nome, telefone e procedimento são obrigatórios." },
      { status: 400 }
    );
  }

  const leadPayload = {
    nome,
    telefone,
    procedimento,
    status: "Pendente",
    segmento: "Estética",
    canal: "Outro",
    historico: "Lead capturado pelo formulário público do site KM Beauty.",
    data_contato: new Date().toISOString().slice(0, 10),
  };

  try {
    const res = await fetch(`${API_URL}/api/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-token": API_TOKEN,
      },
      body: JSON.stringify(leadPayload),
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Não foi possível registrar o lead." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Falha ao contatar a API de leads." },
      { status: 500 }
    );
  }
}
