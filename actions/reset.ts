'use server';

import { ResetSchema, ValidateResetSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import { SendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';

export const reset = async (value: ValidateResetSchema) => {
  const validatedFields = ResetSchema.safeParse(value);

  if (!validatedFields.success) {
    return { error: 'Invalid email!' };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) return { error: 'Email not found'! };

  const passwordResetToken = await generatePasswordResetToken(email);

  await SendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

  return { success: 'Reset email sent!' };
};
