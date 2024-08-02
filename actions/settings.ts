'use server';

import bcrypt from 'bcryptjs';

import db from '@/lib/db';
import { currentUser } from '@/lib/auth';
import { SettingsSchema, ValidateSettingsSchema } from '@/schemas';
import { getUserByEmail, getUserById } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { SendVerificationEmail } from '@/lib/mail';

export const settings = async (values: ValidateSettingsSchema) => {
  const validatedData = SettingsSchema.safeParse(values);
  if (!validatedData.success) return { error: 'Data validation error!' };

  const user = await currentUser();
  if (!user) return { error: 'Unauthorized!' };

  const dbUser = await getUserById(user.id);
  if (!dbUser) return { error: 'Unauthorized!' };

  // for OAuth signed users - they can't modify these data
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.confirmNewPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  // handle email
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email already taken!' };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await SendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: 'Verification email sent!' };
  }

  // handle password
  if (values.password && values.newPassword && values.confirmNewPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(values.password, dbUser.password);

    if (!passwordMatch) {
      return { error: 'Incorrect password' };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
    values.confirmNewPassword = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  });

  return { success: 'settings updated!' };
};
