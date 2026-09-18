"use server";
import { signUpSchema, signInSchema } from "@/lib/auth/validationSchema";
import type { signUp as SignUpData, signIn as SignInData } from "@/types/authTypes";
import { SignUpContorller } from "../auth/signup";


export const RegisterAction=async (data:SignUpData)=>{
  const result=signUpSchema.safeParse(data);
  console.log("the signUp result",result);
  if(!result.success){
    const errors=result.error.flatten().fieldErrors;
    console.log(errors);
    throw new Error("Validation failed");
  }
  const response =await  SignUpContorller(data);
 return response
}

export const LoginAction=async(data:SignInData)=>{
    const result =signInSchema.safeParse(data);
    if(!result.success){
        const errors=result.error.flatten().fieldErrors;
        console.log(errors);
        throw new Error("Validation failed");
    }
    
}


