import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.KMBEAUTY_API_URL ?? "http://127.0.0.1:18814";
const API_TOKEN = process.env.KMBEAUTY_API_TOKEN ?? "";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";
  const res = await fetch(`${API_URL}/api/agenda/agendamentos?from=${from}&to=${to}`, {
    headers: { "x-api-token": API_TOKEN },
    cache: "no-store",
  });
  if (!res.ok) return NextResponse.json([], { status: 200 });
  return NextResponse.json(await res.json());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await fetch(`${API_URL}/api/agenda/agendamentos`, {
    method: "POST",
    headers: { "x-api-token": API_TOKEN, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
