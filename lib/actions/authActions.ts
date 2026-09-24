"use server";
import { cookies } from "next/headers";
import { signUpSchema } from "@/lib/auth/authSchemas";
import type { SignUpData } from "@/types/auth";
import type { EmailVerification } from "@/types/auth";
import { signUpController } from "../auth/signUpController";
import type { SignInData } from "@/types/auth";
import AuthModel from "@/models/authModel";
import bcrypt from "bcryptjs";
import { signInSchema } from "@/lib/auth/authSchemas";
import { mongoDBConnect } from "@/lib/mongoDb";
import { generateAuthToken } from "@/lib/auth/generateAuthToken";
import { generateSessionId } from "@/lib/auth/generateSessionID";
import UserSession from "@/models/sessionModel";
export type RegisterActionResponse =
  | { success: true; name: string; email: string }
  | { success: false; message: string };

export const RegisterAction=async (data:SignUpData): Promise<RegisterActionResponse>=>{
  const result=signUpSchema.safeParse(data);
  console.log("the signUp result",result);
  if(!result.success){
    const errors=result.error.flatten().fieldErrors;
    console.log(errors);
    throw new Error("Validation failed");
  }
  const response = await signUpController(result.data);
  if (!response.success) {
  return response;
}
 const cookieStore=await cookies();
 cookieStore.set("authToken",response.token,{
  httpOnly:true,
  secure: process.env.NODE_ENV === "production",
   sameSite: "lax", 
   path: "/",
    maxAge: 2 * 24 * 60 * 60,
 }

 )
 return {
  success: true,
  name:response.name,
  email:response.email
 }
}
export type LoginDataResponse=
    | { success: true; name: string; email: string }
  | { success: false; message: string };

export const LoginAction=async(data:SignInData):Promise<LoginDataResponse>=>{
  const result = signInSchema.safeParse(data);
  if (!result.success) {
    return { success: false, message: "Enter a valid email and password" };
  }

  try {
    await mongoDBConnect();
    const { email, password } = result.data;
    const user = await AuthModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return { success: false, message: "Invalid email or password" };
    }

    const sessionID = generateSessionId();
    await UserSession.create({
      sessionID,
      userID: user._id.toString(),
      status: "active",
      expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    });
    const token = await generateAuthToken({ userId: user._id.toString(), sessionID });
    const cookieStore = await cookies();
    cookieStore.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 2 * 24 * 60 * 60,
    });

    return { success: true, name: user.name, email: user.email };
  } catch (error) {
    console.error("Login failed:", error);
    return { success: false, message: "Unable to sign in. Please try again." };
  }
}
export const VerifyEmailAction=async(email:string):Promise<EmailVerification>=>{
  await mongoDBConnect();
  const result =await AuthModel.findOne({email});
  if(!result){
    return {
      exists:false,
      message:"No user Exist",
    }
  }
  return{
    exists:true,
    message:"user Exist",
  }

}

