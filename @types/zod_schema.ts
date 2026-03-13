import { z } from "zod";

export const FormSchema = z.object({
  fullname: z
    .string()
    .trim()
    .min(2, "Invalid Input")
    .max(100, "Name is too long"),
  email: z.string().trim().email("Invalid Email").max(320, "Email is too long"),
  message: z
    .string()
    .trim()
    .min(2, "Invalid Input")
    .max(2000, "Message is too long"),
});
