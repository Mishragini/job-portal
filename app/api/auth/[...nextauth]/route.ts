import prisma from "@/prisma/db";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async signIn({ user, profile }) {
            if (!user || !user.email) {
                return false;
            }

            await prisma.user.upsert({
                select: {
                    id: true
                  },
                  where: {
                    email: user.email
                  },
                  create: {
                    email: user.email,
                    name: user.name,
                  },
                  update: {
                    name: user.name,
                  }
            })
            return true;
        }
    },
    secret: process.env.NEXTAUTH_SECRET || "secret"
})

export { handler as GET, handler as POST }