import NextAuth from "next-auth";
import { MongoDBAdapter, MongoDBAdapterOptions } from "@auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyUserDataFromCredentials } from "@/features/api/actions";
import { NextAuthConfig } from "next-auth";

const getGoogleCredentials = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || clientId.length === 0) {
    throw new Error("Missing Client ID");
  }
  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing Client Secret");
  }
  return { clientId, clientSecret };
};

const mongoOptions: MongoDBAdapterOptions = {
  databaseName: "Friendr",
  collections: {
    Accounts: "userAccounts",
    Sessions: "userSessions",
    Users: "createdUsers",
    VerificationTokens: "verificationTokens",
  },
};

export const authOptions: NextAuthConfig = {
  adapter: MongoDBAdapter(clientPromise, mongoOptions) as Adapter,
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("authorize");
          const user = (await verifyUserDataFromCredentials(
            credentials as { email: string; password: string }
          )) as createdUser;
          const returnUser = {
            name: user.name,
            email: user.email,
            id: user._id,
            image: user.image,
          };
          return returnUser;
        } catch {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60 * 30,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account?.access_token;
        token.providerId = account?.providerAccountId as string;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token?.id as string;
        session.user.email = token?.email as string;
        session.user.name = token?.name as string;
        session.user.image = token?.picture as string;
      }
      return session;
    },
    async signIn() {
      return true;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
