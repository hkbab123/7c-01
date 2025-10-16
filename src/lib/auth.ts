import NextAuth, { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { getDb } from "./db"
import { users } from "./db/schema"
import { eq } from "drizzle-orm"

const authConfig: NextAuthConfig = {
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const db = getDb()
          const user = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.email!))
            .limit(1)

          if (user.length === 0) {
            return null
          }

          const foundUser = user[0]

          if (!foundUser.isActive) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password!,
            foundUser.password
          )

          if (!isPasswordValid) {
            return null
          }

          return {
            id: foundUser.id.toString(),
            email: foundUser.email,
            name: foundUser.name,
            role: foundUser.role,
          }
        } catch (error) {
          console.error("Authentication error:", error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub
        ;(session.user as any).role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
  },
}

const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

export { handlers, auth, signIn, signOut }
export const authOptions = authConfig
