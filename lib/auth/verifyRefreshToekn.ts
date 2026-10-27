
import type { AuthTokenPayload } from "@/types/auth";
import { cookies } from "next/headers";
//import {  jwtVerify,errors } from "jose";
import UserSession from "@/models/sessionModel";
import { generateAuthToken } from "./generateAuthToken";
import AuthModel from "@/models/authModel";
import { hashRefreshToken } from "./generateRefreshToekn";
import { mongoDBConnect } from "@/lib/mongoDb";
// const SECRET_KEY = new TextEncoder().encode(
//   process.env.JWT_SECRET
// );
export const verifyRefreshToken=async():Promise<AuthTokenPayload |null>=>{

     const cookieStore = await cookies();
     try{

     
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
catch(error){
    console.log("verification of refresh token got failed",error)
    return null
}
}