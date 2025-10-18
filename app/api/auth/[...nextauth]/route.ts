import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Configure NextAuth v5
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // TODO: Replace with your database query
        // Example: const user = await db.user.findUnique({ where: { email: credentials?.email } });
        // Verify password with bcrypt: await bcrypt.compare(credentials.password, user.password)
        
        // TEMPORARY: Mock users for testing
        const mockUsers = [
          {
            id: '1',
            email: 'admin@example.com',
            password: 'admin123',
            name: 'Admin User',
            role: 'admin' as const,
          },
          {
            id: '2',
            email: 'user@example.com',
            password: 'user123',
            name: 'Regular User',
            role: 'user' as const,
          },
        ];

        const user = mockUsers.find((u) => u.email === credentials?.email);

        // WARNING: Never compare passwords in plain text in production!
        // Use bcrypt or similar: await bcrypt.compare(credentials.password, user.hashedPassword)
        if (user && user.password === credentials?.password) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'admin' | 'user';
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST };
