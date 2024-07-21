"use server";

import { RegisterSchema, ValidateRegisterSchema } from "@/schemas";

export const register = async (values: ValidateRegisterSchema) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" }
  }
  return { success: "Email sent" }
} 