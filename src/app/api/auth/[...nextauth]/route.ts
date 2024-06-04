import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { dbConnect, dbDisconnect } from '@/lib/database';
import { verifyPassword } from '@/helpers/password';
import Register from '@/models/users-schema';
import { AuthOptions } from 'next-auth';

const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1 day
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        await dbConnect();

        const user = await Register.findOne({ email: email });

        if (!user) {
          dbDisconnect();
          throw new Error('Impossible de vous authentifier.');
        }

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
          dbDisconnect();
          throw new Error('Impossible de vous authentifier.');
        }

        dbDisconnect();
        return {
          email: user.email,
          id: user._id,
          img: user.img,
        } as any;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, token }: { session: any; token: any }) => {
      session.id = token.id;
      session.jwt = token.jwt;
      session.user.email = token.email;

      return Promise.resolve(session);
    },
    jwt: async ({ token, user }: { token: any; user: any }) => {
      if (user) {
        token.jwt = user.jwt;
        token.email = user.email;
      }
      return Promise.resolve(token);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
