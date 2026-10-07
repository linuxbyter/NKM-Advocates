import { createHmac, timingSafeEqual } from "crypto";

const TOKEN_TTL = 8 * 60 * 60; // 8 hours

function hmacSign(data: string, secret: string): string {
  return createHmac("sha256", secret).update(data).digest("hex");
}

function getSecret(): string {
  const s = process.env.ADMIN_SECRET;
  if (!s) throw new Error("ADMIN_SECRET not set");
  return s;
}

export function getPassword(): string {
  const p = process.env.ADMIN_PASSWORD;
  if (!p) throw new Error("ADMIN_PASSWORD not set");
  return p;
}

export function timingSafeEq(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

export function makeToken(): string {
  const issued = Math.floor(Date.now() / 1000);
  const payload = `${issued}:${TOKEN_TTL}`;
  const sig = hmacSign(payload, getSecret());
  return Buffer.from(`${payload}:${sig}`).toString("base64url");
}

export function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64url").toString();
    const parts = decoded.split(":");
    if (parts.length !== 3) return false;
    const [issued, ttl, sig] = parts;
    const expected = hmacSign(`${issued}:${ttl}`, getSecret());
    if (!timingSafeEq(sig, expected)) return false;
    const now = Math.floor(Date.now() / 1000);
    return now - Number(issued) < Number(ttl);
  } catch {
    return false;
  }
}

export function requireAuth(token: string): void {
  if (!verifyToken(token)) throw new Error("Not authorized. Please log in again.");
}
