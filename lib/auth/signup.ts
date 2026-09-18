import AuthModel from "@/models/authModel";
import type { signUp } from "@/types/authTypes";
export const SignUpContorller=async(data:signUp)=>{
 
    //1.check for existing 
   try{
    const ExistingUser =await AuthModel.findOne({email:data.email})
  if (ExistingUser) {
  return {
    message:"user exist"
  }
  }
// create new user
   const user=await AuthModel.create(data)
   return {
    message:"user is created",
    email:user.email
   }

   }
   catch(error){
    console.log(error)
  return{
    message:"user can`t be rgistered",
    error:error
  }


}
}