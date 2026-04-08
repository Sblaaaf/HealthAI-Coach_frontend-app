export { default } from "next-auth/middleware"

export const config = {
  // Définir les routes à protéger. Ici, tout ce qui se trouve dans /dashboard ou /parametres
  matcher: ["/dashboard/:path*", "/parametres/:path*", "/profils/:path*"]
}