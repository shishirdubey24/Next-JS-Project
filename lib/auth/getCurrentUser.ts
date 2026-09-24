import AuthModel from "@/models/authModel";
import { verifyAuthToken } from "./verifyAuthToken";

export const getCurrentUser=async()=>{

    const userToken=await verifyAuthToken();
    if(!userToken){
      return null;
   }
    const currentUser=await AuthModel.findById(userToken?.userId).select("name email").lean();
    if(!currentUser){
       return null
    }
     return {
        name:currentUser.name,
        email:currentUser.email
     }
}