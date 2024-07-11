import { z } from "zod";

export const FormSchema = z.object({
  fullname: z.string().min(2, "Invalid Input"),
  email: z.string().email("Invalid Email"),
  message: z.string().min(2, "Invalid Input"),
});
