import type { AuthTokenPayload } from "@/types/auth";
import { cookies } from "next/headers";
import {  jwtVerify,errors } from "jose";
import UserSession from "@/models/sessionModel";
import { generateAuthToken } from "./generateAuthToken";
import AuthModel from "@/models/authModel";
import { hashRefreshToken } from "./generateRefreshToekn";
import { mongoDBConnect } from "@/lib/mongoDb";
const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET
);

export const verifyAuthToken = async ():Promise<AuthTokenPayload |null> => {
    const cookieStore = await cookies();
  
  try {
    // Get auth token from HttpOnly cookie
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
    await mongoDBConnect();
    //verify if the session is still active in the database
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
   if(!(error instanceof errors.JWTExpired)){
    console.log("Error verifying auth token:", error);
    return null;
   }
    const refreshToken=cookieStore.get("refreshToken")?.value;
if(!refreshToken){
  return null
}
await mongoDBConnect();
const session=await UserSession.findOne({
  refreshToken: hashRefreshToken(refreshToken),
  status:"active",
  expiresAt: { $gt: new Date() 

  },
});
if(!session){
  return null
}
const user=await AuthModel.findById(session.userID);
if(!user){
  return null
}
const newToken=await generateAuthToken({
  userId:user._id.toString(),
  sessionID:session.sessionID,
})
cookieStore.set("authToken",newToken,{
  httpOnly:true,
  secure:process.env.NODE_ENV==="production",
  sameSite:"lax",
  path:"/",
  maxAge:2*24*60*60,
})
return {
    userId: session.userID,
    sessionID: session.sessionID,
   
  };
  }


// refresh token verification process 

};
