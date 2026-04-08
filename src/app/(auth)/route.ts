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
        // TODO: Plus tard, faire un fetch() vers http://gateway_api:8000/login
        // Pour l'instant, on simule une connexion réussie
        if (credentials?.email === "master@healthai.com" && credentials?.password === "admin") {
          return { id: "1", name: "Master", email: "master@healthai.com" }
        }
        return null // Échec de la connexion
      }
    })
  ],
  pages: {
    signIn: '/login', // Indique à NextAuth d'utiliser notre interface personnalisée
  },
  session: {
    strategy: "jwt", // Utilisation des JSON Web Tokens
  },
  secret: "votre_cle_secrete_tres_complexe", // À mettre dans un fichier .env plus tard
})

export { handler as GET, handler as POST }