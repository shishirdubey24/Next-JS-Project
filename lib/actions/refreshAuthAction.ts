"use server";

import { cookies } from "next/headers";
import { refreshSession } from "../auth/refreshSession";
export const refreshAuthAction = async () => {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return { success: false };
  }

  const result = await refreshSession(refreshToken);

  if (!result) {
    cookieStore.delete("authToken");
    cookieStore.delete("refreshToken");

    return { success: false };
  }

  const remainingSeconds = Math.max(
    0,
    Math.floor(
      (new Date(result.expiresAt).getTime() - Date.now()) / 1000
    )
  );

  cookieStore.set("authToken", result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 5 * 60,
  });

  cookieStore.set("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: remainingSeconds,
  });

  return { success: true };
};