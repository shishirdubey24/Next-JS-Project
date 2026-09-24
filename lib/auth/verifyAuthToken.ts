import type { AuthTokenPayload } from "@/types/auth";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import UserSession from "@/models/sessionModel";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET
);

export const verifyAuthToken = async ():Promise<AuthTokenPayload |null> => {
  try {
    // Get auth token from HttpOnly cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      return null;
    }

    // Verify JWT
    const { payload } = await jwtVerify(token, SECRET_KEY);

    // Make sure userId exists and is a string
    if (typeof payload.userId !== "string") {
      return null;
    }
    if (typeof payload.sessionID !== "string") {
      return null;
    }
   const session=await UserSession.findOne({
    sessionID:payload.sessionID,
    userID:payload.userId,
    status:"active",
    expiresAt: { $gt: new Date() },
   })
   if(!session){
    return null
   }
    return {
  userId: payload.userId,
  sessionID: payload.sessionID,
};
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
};

