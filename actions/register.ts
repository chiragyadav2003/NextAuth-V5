"use server";

import bcrypt from 'bcryptjs';
import db from "@/lib/db"
import { RegisterSchema, ValidateRegisterSchema } from "@/schemas";
import { getUserByEmail } from '@/data/user';

export const register = async (values: ValidateRegisterSchema) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" }
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" }
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  //TODO: send verification token to email

  return { success: "User created!" }
} 