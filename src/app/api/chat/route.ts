import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL = process.env.KMBEAUTY_N8N_WEBHOOK_URL ?? "";
const WEBHOOK_SECRET = process.env.KMBEAUTY_N8N_WEBHOOK_SECRET ?? "";

export async function POST(req: NextRequest) {
  if (!WEBHOOK_URL || !WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Chat não configurado." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corpo inválido." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  if (!payload.message || typeof payload.message !== "string") {
    return NextResponse.json({ error: "Campo 'message' obrigatório." }, { status: 400 });
  }

  try {
    const n8nRes = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-km-webhook-secret": WEBHOOK_SECRET,
      },
      body: JSON.stringify({
        message: payload.message,
        session_id: payload.session_id ?? "",
        lead_name: payload.lead_name ?? "",
        lead_phone: payload.lead_phone ?? "",
        lead_procedure: payload.lead_procedure ?? "",
        page: payload.page ?? "/",
      }),
    });

    if (!n8nRes.ok) {
      return NextResponse.json(
        { error: "Erro ao contatar o assistente." },
        { status: 502 }
      );
    }

    const data = (await n8nRes.json()) as { reply?: string; session_id?: string };
    return NextResponse.json({
      reply: data.reply ?? "Desculpe, não consegui processar sua mensagem.",
      session_id: data.session_id ?? payload.session_id ?? "",
    });
  } catch {
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
