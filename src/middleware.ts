import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/", // Halaman login kita
  },
});

export const config = {
  // Gunakan matcher yang mengecualikan file statis dan folder api/auth
  matcher: [
    /*
     * Cocokkan semua request kecuali:
     * 1. api/auth (NextAuth internal)
     * 2. _next/static (static files)
     * 3. _next/image (image optimization files)
     * 4. favicon.ico (favicon file)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
    "/dashboard/:path*",
  ],
};