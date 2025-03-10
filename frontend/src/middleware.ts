import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/home", "/create", "/tryout"]; // Rute yang dilindungi
const publicRoutes = ["/login", "/signup"]; // Rute publik

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token");

  if (protectedRoutes.includes(path)) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else if (publicRoutes.includes(path)) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
