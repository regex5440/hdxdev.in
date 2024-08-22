"use server";

import { FormSchema } from "@/@types/zod_schema";
import { resolve } from "path";

type StateType =
  | ({
      fullname?: string[] | undefined;
      email?: string[] | undefined;
      message?: string[] | undefined;
    } & { error?: string } & { success?: boolean })
  | undefined;

export default async function submitMessage(
  state: StateType,
  formData: FormData
): Promise<StateType> {
  const validateData = FormSchema.safeParse({
    fullname: formData.get("fullname"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validateData.success) {
    return validateData.error.flatten().fieldErrors;
  }
  try {
    await fetch(process.env.EMAIL_SERVICE as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EMAIL_SERVICE_TOKEN}`,
      },
      body: JSON.stringify({
        fromService: validateData.data.fullname,
        toEmail: process.env.EMAIL_TO,
        subject: `New Query from Portfolio`,
        html: `<div><p>${validateData.data.message}</p> <br><br><b>From: ${
          validateData.data.email
        }</b><br>EXTRAS: ${formData.get("extras")}</div>`,
      }),
    }).then((res) => res.json());
    return { success: true };
  } catch (e) {
    return { error: "Something went wrong, please try again later." };
  }
}
