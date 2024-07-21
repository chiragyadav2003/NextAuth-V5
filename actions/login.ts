"use server";

import { LoginSchema, ValidateLoginSchema } from "@/schemas";

export const login = async (values: ValidateLoginSchema) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" }
  }
  return { success: "Email sent" }
} 