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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

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

  const safeName = escapeHtml(validateData.data.fullname);
  const safeEmail = escapeHtml(validateData.data.email);
  const safeMessage = escapeHtml(validateData.data.message);
  const rawExtras = formData.get("extras");
  const safeExtras =
    typeof rawExtras === "string" ? escapeHtml(rawExtras.slice(0, 800)) : "";

  try {
    await fetch(process.env.EMAIL_SERVICE as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EMAIL_SERVICE_TOKEN}`,
      },
      body: JSON.stringify({
        fromService: safeName,
        toEmail: process.env.EMAIL_TO,
        subject: `New Query from Portfolio`,
        html: `<div><p>${safeMessage}</p> <br><br><b>From: ${safeEmail}</b><br>EXTRAS: ${safeExtras}</div>`,
      }),
    }).then((res) => res.json());
    return { success: true };
  } catch (e) {
    return { error: "Something went wrong, please try again later." };
  }
}
