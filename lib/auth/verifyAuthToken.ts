import type { AuthTokenPayload } from "@/types/auth";
import { cookies } from "next/headers";
import { jwtVerify, errors } from "jose";
import UserSession from "@/models/sessionModel";
import { mongoDBConnect } from "@/lib/mongoDb";
import { verifyRefreshToken } from "./verifyRefreshToekn";
const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET
);

export const verifyAuthToken = async (): Promise<AuthTokenPayload | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    return await verifyRefreshToken();
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);

    if (
      typeof payload.userId !== "string" ||
      typeof payload.sessionID !== "string"
    ) {
      return null;
    }

    await mongoDBConnect();

    // Verify that the session is still active.
    const session = await UserSession.findOne({
      sessionID: payload.sessionID,
      userID: payload.userId,
      status: "active",
      expiresAt: { $gt: new Date() },
    });

    if (!session) {
      return null;
    }

    return {
      userId: payload.userId,
      sessionID: payload.sessionID,
    };
  } catch (error) {
    // Refresh only when the access token has expired.
    if (error instanceof errors.JWTExpired) {
      return await verifyRefreshToken();
    }

    // Reject malformed or invalidly signed tokens.
    console.error("Error verifying auth token:", error);
    return null;
  }
};