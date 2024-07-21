"use server";

import { LoginSchema, ValidateLoginSchema } from "@/schemas";
import { z } from "zod";

export const login = async (values: ValidateLoginSchema) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" }
  }
  return { success: "Email sent" }
} 