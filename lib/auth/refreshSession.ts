
import type { AuthTokenPayload } from "@/types/auth";
import { cookies } from "next/headers";
//import {  jwtVerify,errors } from "jose";
import UserSession from "@/models/sessionModel";
import { generateAuthToken } from "./generateAuthToken";
import AuthModel from "@/models/authModel";
import { generateRefreshToken, hashRefreshToken } from "./generateRefreshToken";
import { mongoDBConnect } from "@/lib/mongoDb";
// const SECRET_KEY = new TextEncoder().encode(
//   process.env.JWT_SECRET
// );
export const refreshSession=async(refreshToken:string)=>{
  const oldHashedToken=hashRefreshToken(refreshToken)
     try{
if(!refreshToken){
  return null
}
await mongoDBConnect();
const session=await UserSession.findOne({
  refreshToken: oldHashedToken,
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
  const newRefreshToken = generateRefreshToken()
const newAccessToken=await generateAuthToken({
  userId:user._id.toString(),
  sessionID:session.sessionID,
})

const updatedSession = await UserSession.findOneAndUpdate(
    {
      _id: session._id,
      refreshToken: oldHashedToken,
      status: "active",
      expiresAt: { $gt: new Date() },
    },
    {
      $set: {
        refreshToken: hashRefreshToken(newRefreshToken),
      },
    },
      { new: true }
  );
   if (!updatedSession) {
    return null;
  }


return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    expiresAt: updatedSession.expiresAt,
   
  };
}
catch(error){
    console.log("verification of refresh token got failed",error)
    return null
}
}