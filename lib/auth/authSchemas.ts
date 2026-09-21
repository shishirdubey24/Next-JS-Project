
import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),

  email: z
    .string()
    .email("Please enter a valid email"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export const signInSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(1, "Password is required"),
});

