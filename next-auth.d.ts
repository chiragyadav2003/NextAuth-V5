import { UserRole } from '@prisma/client';
import NextAuth, { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  id: string;
  email: string;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}

// declare module 'next-auth' {
//   interface Session {
//     user: {
//       role: UserRole;
//     } & DefaultSession['user'];
//   }
// }
