import User from "@/app/api/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connect from "@/app/api/utils/db";
//import { setCookie } from 'nookies';

const options = NextAuth({
  providers: [
    CredentialsProvider({
      id: "Credentials",
      name: "Credentials",
      async authorize(credentials) {
        await connect();

        try {
          const user = await User.findOne({
            email: credentials.email,
          });

          if (user) {
            const validPassword = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (validPassword) {
              return user;
            } else {
              throw new Error("Credenciais erradas!");
            }
          } else{
            throw new Error("Credenciais erradas!");
          }} catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      return {...token, ...user};
    },

    async session({session, token, user}){
      session.user = token;
      return session;
    },

  },
  /* callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      //
      setCookie(undefined, 'nextauth-token', 123)
      console.log(token.accessToken + " token")
      console.log(session.accessToken + " expires")
      //
      return session
    }
  }, */
  pages: {
    error: "/login",
    signIn: "/login"
  },
});

export { options as GET, options as POST, options as OPTIONS};