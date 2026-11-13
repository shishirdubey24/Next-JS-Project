import AuthModel from "@/models/authModel";
import { verifyAuthToken } from "./verifyAuthToken";

export const getCurrentUser=async()=>{

    const userToken=await verifyAuthToken();
    if(!userToken){
      console.log("token is not there to get the current user")
      return null;
   }
    const currentUser=await AuthModel.findById(userToken?.userId).select("name email").lean();
    if(!currentUser){
      console.log("can`t find currUSer",currentUser)
       return null
    }
     return {
        name:currentUser.name,
        email:currentUser.email
     }
}