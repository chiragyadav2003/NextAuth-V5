import { UserRole } from '@prisma/client';
import path from 'path';
import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(1, {
    message: 'Password is Required',
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(6, {
    message: 'Minimum 6 character required',
  }),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'Minimum 6 characters is required',
  }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string()),
    newPassword: z.optional(z.string().min(6)),
    confirmNewPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: 'Enter new password',
      path: ['newPassword'],
    },
  )
  .refine(
    (data) => {
      if (!data.password && data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: 'Enter current password',
      path: ['password'],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword !== data.confirmNewPassword) {
        return false;
      }
      return true;
    },
    {
      message: 'New passwords do not match',
      path: ['confirmNewPassword'],
    },
  );

export type ValidateLoginSchema = z.infer<typeof LoginSchema>;

export type ValidateRegisterSchema = z.infer<typeof RegisterSchema>;

export type ValidateResetSchema = z.infer<typeof ResetSchema>;

export type ValidateNewPasswordSchema = z.infer<typeof NewPasswordSchema>;

export type ValidateSettingsSchema = z.infer<typeof SettingsSchema>;
