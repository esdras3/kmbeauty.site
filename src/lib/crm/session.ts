const COOKIE = "dashboard_auth";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;
const SESSION_SUBJECT = "crm-dashboard";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

interface SessionPayload {
  sub: string;
  iat: number;
  exp: number;
}

function readEnv(name: string): string | null {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

function toBase64(bytes: Uint8Array): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64");
  }

  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary);
}

function fromBase64(base64: string): Uint8Array {
  if (typeof Buffer !== "undefined") {
    return new Uint8Array(Buffer.from(base64, "base64"));
  }

  const binary = atob(base64);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function toBase64Url(bytes: Uint8Array): string {
  return toBase64(bytes)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = `${value}${"=".repeat((4 - (value.length % 4)) % 4)}`
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  return fromBase64(padded);
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return Uint8Array.from(bytes).buffer;
}

async function importSessionKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export function getDashboardPassword(): string | null {
  return readEnv("DASHBOARD_PASSWORD");
}

export function getSessionSecret(): string | null {
  const secret = readEnv("SESSION_SECRET");
  if (!secret || secret.length < 32) {
    return null;
  }
  return secret;
}

export function isAuthConfigured(): boolean {
  return Boolean(getDashboardPassword() && getSessionSecret());
}

export async function createSessionToken(): Promise<string> {
  const secret = getSessionSecret();
  if (!secret) {
    throw new Error("SESSION_SECRET ausente ou muito curto.");
  }

  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    sub: SESSION_SUBJECT,
    iat: now,
    exp: now + SESSION_MAX_AGE,
  };

  const payloadBytes = encoder.encode(JSON.stringify(payload));
  const signature = await crypto.subtle.sign(
    "HMAC",
    await importSessionKey(secret),
    payloadBytes
  );

  return `${toBase64Url(payloadBytes)}.${toBase64Url(new Uint8Array(signature))}`;
}

export async function verifySessionToken(token: string): Promise<boolean> {
  const secret = getSessionSecret();
  if (!secret) {
    return false;
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return false;
  }

  try {
    const payloadBytes = fromBase64Url(parts[0]);
    const signatureBytes = fromBase64Url(parts[1]);

    const valid = await crypto.subtle.verify(
      "HMAC",
      await importSessionKey(secret),
      toArrayBuffer(signatureBytes),
      toArrayBuffer(payloadBytes)
    );

    if (!valid) {
      return false;
    }

    const payload = JSON.parse(decoder.decode(payloadBytes)) as SessionPayload;
    const now = Math.floor(Date.now() / 1000);

    return (
      payload.sub === SESSION_SUBJECT &&
      Number.isFinite(payload.iat) &&
      Number.isFinite(payload.exp) &&
      payload.exp > now
    );
  } catch {
    return false;
  }
}

export { COOKIE, SESSION_MAX_AGE };
