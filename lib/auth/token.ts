import { SignJWT, jwtVerify } from "jose";

export const ADMIN_COOKIE = "portfolio_admin";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

export type AdminSession = {
  username: string;
  role: "admin";
};

// Kept free of next/headers so the proxy (edge runtime) can import it.
function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("ADMIN_SESSION_SECRET must be set (min 16 chars)");
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(username: string) {
  return new SignJWT({ username, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecret());
}

export async function verifySessionToken(
  token: string,
): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.role !== "admin" || typeof payload.username !== "string") {
      return null;
    }
    return { username: payload.username, role: "admin" };
  } catch {
    return null;
  }
}
