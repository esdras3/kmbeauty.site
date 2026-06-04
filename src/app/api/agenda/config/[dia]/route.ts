import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.KMBEAUTY_API_URL ?? "http://127.0.0.1:18814";
const API_TOKEN = process.env.KMBEAUTY_API_TOKEN ?? "";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ dia: string }> }) {
  const { dia } = await params;
  const body = await req.json();
  const res = await fetch(`${API_URL}/api/agenda/config/${dia}`, {
    method: "PATCH",
    headers: { "x-api-token": API_TOKEN, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return NextResponse.json(await res.json(), { status: res.status });
}
