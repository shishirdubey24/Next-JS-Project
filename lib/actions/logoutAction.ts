"use server";
import UserSession from "@/models/sessionModel";
import { verifyAuthToken } from "../auth/verifyAuthToken";
import { cookies } from "next/headers";

export const LogoutAction=async()=>{
try{
    const auth =await verifyAuthToken();
    if (!auth) { 
    return { success: false, message: "User is not authenticated", }; }

 const {userId,sessionID}=auth;
await UserSession.updateOne(
  {
    sessionID,
    userID: userId,
    status: "active",
  },
  {
    $set: {
      status: "inactive",
    },
  }
);
   const cookieStore=await cookies();
   cookieStore.delete("authToken");

   return{
    message:"user Logged OUT"
   }
}  
catch(error){
    console.log("failed Logout",error)
}
return { success: false, message: "Logout failed", };
}