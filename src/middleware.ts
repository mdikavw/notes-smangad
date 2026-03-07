import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ 
      req, 
      secret: process.env.NEXTAUTH_SECRET 
  });
  
  const url = req.nextUrl;

  if (token && (url.pathname === "/" || url.pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }


  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/register", "/dashboard/:path*"],
};