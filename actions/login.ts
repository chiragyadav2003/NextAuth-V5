'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema, ValidateLoginSchema } from '@/schemas';
import { generateVerificationToken } from '@/lib/tokens';
import { getUserByEmail } from '@/data/user';
import { SendVerificationEmail } from '@/lib/mail';
import bcrypt from 'bcryptjs';

export const login = async (values: ValidateLoginSchema) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid Fields!' };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email does not exist!' };
  }

  // const matchPassword = await bcrypt.compare(password, existingUser.password);
  // if (!matchPassword) return { error: 'Wrong password!' };

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);

    await SendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: 'Confirmation email sent!' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log(error.type);
      switch (error.type) {
        //BUG : currently this error is not display, it is showing CallBackRouterError instead of CredentialsSigninError, it is due to next-auth beta version use .04 instead of 0.19
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };
        default:
          return { error: 'Something went wrong!' };
      }
    }
    throw error;
  }
};
