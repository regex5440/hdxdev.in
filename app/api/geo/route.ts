"use server";
import { geolocation, ipAddress } from "@vercel/functions";

export async function GET(request: Request) {
  const geo = geolocation(request);
  const ip = ipAddress(request);
  return Response.json({
    geo,
    ip,
    userAgent: request.headers.get("user-agent"),
  });
}
