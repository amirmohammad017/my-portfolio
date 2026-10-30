import { NextResponse, type NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/auth/token";

async function adminGuard(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const valid = token ? await verifySessionToken(token) : false;

  if (pathname === "/admin/login") {
    if (valid) return NextResponse.redirect(new URL("/admin", request.url));
    return NextResponse.next();
  }
  if (valid) return NextResponse.next();

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

const pulseAuth = withAuth({
  pages: { signIn: "/api/property-pulse/auth/signin" },
});

export async function proxy(request: NextRequest, event: never) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return adminGuard(request);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (pulseAuth as any)(request, event);
}

export default proxy;

export const config = {
  matcher: [
    "/admin/:path*",
    "/projects/property-pulse/properties/add",
    "/projects/property-pulse/properties/saved",
    "/projects/property-pulse/profile",
  ],
};
