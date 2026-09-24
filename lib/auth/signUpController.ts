import AuthModel from "@/models/authModel";
import type { SignUpData } from "@/types/auth";
import bcrypt from 'bcryptjs';
import { generateAuthToken } from "./generateAuthToken";
import { generateSessionId } from "./generateSessionID";
import UserSession from "@/models/sessionModel";
type SignUpControllerResponse =
  | { success: true; email: string; name: string; token: string }
  | { success: false; message: string };

export const signUpController = async (
  data: SignUpData,
): Promise<SignUpControllerResponse> => {
 
    //1.check for existing 
   try{
    const ExistingUser =await AuthModel.findOne({email:data.email})
  if (ExistingUser) {
  return {
    success: false,
    message:"user exist"
  }
  }
// create new user
const Userpassword=data.password
const hashedPassword=await bcrypt.hash(Userpassword,10)
   const user=await AuthModel.create({...data,password:hashedPassword})
   
 const sessionID = generateSessionId()
 //store the session data into DB
 await UserSession.create
 ({ 
  sessionID: sessionID,
  userID: user._id.toString(),
  status: "active",
  expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), 
    });
 // token generation
 const token = await generateAuthToken({ 
  userId: user._id.toString(),
  sessionID

})
 return {
  success:true,
  email:user.email,
  name:user.name,
  token,
  
 }
   }
   catch(error){
    console.log(error)
  return{
    success: false,
    message:"user can`t be rgistered",
  }


}
}
