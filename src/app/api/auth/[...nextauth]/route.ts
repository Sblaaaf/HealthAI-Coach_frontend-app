import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Appel vers votre Gateway FastAPI qui redirigera vers le Auth Service
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password
            })
          });

          const user = await res.json();

          // Si le backend renvoie un succès (basé sur votre swagger)
          if (res.ok && user.success) {
            return { 
              id: String(user.user_id), 
              name: "Utilisateur", 
              email: user.email 
            };
          }
          return null; // Mot de passe incorrect
        } catch (error) {
          console.error("Erreur de connexion au backend:", error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "votre_cle_secrete_tres_complexe",
})

export { handler as GET, handler as POST }