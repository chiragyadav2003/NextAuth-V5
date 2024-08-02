'use server';

import db from '@/lib/db';
import { currentUser } from '@/lib/auth';
import { SettingsSchema, ValidateSettingsSchema } from '@/schemas';
import { getUserById } from '@/data/user';

export const settings = async (values: ValidateSettingsSchema) => {
  const validatedData = SettingsSchema.safeParse(values);
  if (!validatedData.success) return { error: 'Data validation error!' };

  const user = await currentUser();
  if (!user) return { error: 'Unauthorized!' };

  const dbUser = await getUserById(user.id);
  if (!dbUser) return { error: 'Unauthorized!' };

  await db.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  });

  return { success: 'settings updated!' };
};
