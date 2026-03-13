"use server";

import { FormSchema } from "@/@types/zod_schema";
import { headers } from "next/headers";

type StateType =
  | ({
      fullname?: string[] | undefined;
      email?: string[] | undefined;
      message?: string[] | undefined;
    } & { error?: string } & { success?: boolean })
  | undefined;

type TurnstileVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
};

async function verifyTurnstileToken(
  token: string,
  remoteIp?: string,
): Promise<boolean> {
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

  if (!turnstileSecret) {
    return false;
  }

  const verifyPayload = new URLSearchParams({
    secret: turnstileSecret,
    response: token,
  });

  if (remoteIp) {
    verifyPayload.append("remoteip", remoteIp);
  }

  const verifyResponse = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      cache: "no-store",
      body: verifyPayload.toString(),
    },
  );

  if (!verifyResponse.ok) {
    return false;
  }

  const verifyResult = (await verifyResponse.json()) as TurnstileVerifyResponse;

  return verifyResult.success;
}

export default async function submitMessage(
  state: StateType,
  formData: FormData,
): Promise<StateType> {
  const validateData = FormSchema.safeParse({
    fullname: formData.get("fullname"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validateData.success) {
    return validateData.error.flatten().fieldErrors;
  }

  const turnstileToken = formData.get("cf-turnstile-response");

  if (typeof turnstileToken !== "string" || turnstileToken.length === 0) {
    return { error: "Please complete captcha verification." };
  }

  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const remoteIp = forwardedFor?.split(",")?.[0]?.trim();
  const turnstileValid = await verifyTurnstileToken(turnstileToken, remoteIp);

  if (!turnstileValid) {
    return { error: "Captcha verification failed. Please try again." };
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
