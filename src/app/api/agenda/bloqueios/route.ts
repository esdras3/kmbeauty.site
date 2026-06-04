import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.KMBEAUTY_API_URL ?? "http://127.0.0.1:18814";
const API_TOKEN = process.env.KMBEAUTY_API_TOKEN ?? "";

export async function GET() {
  const res = await fetch(`${API_URL}/api/agenda/bloqueios`, {
    headers: { "x-api-token": API_TOKEN },
    cache: "no-store",
  });
  if (!res.ok) return NextResponse.json([]);
  return NextResponse.json(await res.json());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await fetch(`${API_URL}/api/agenda/bloqueios`, {
    method: "POST",
    headers: { "x-api-token": API_TOKEN, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return NextResponse.json(await res.json(), { status: res.status });
}
