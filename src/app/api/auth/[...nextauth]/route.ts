import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUserIfNotExists } from "./[...nextauth]";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.sub;
        await createUserIfNotExists(session.user); // 👈 Llamamos a la función aquí
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
