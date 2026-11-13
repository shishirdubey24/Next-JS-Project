"use server";
import { verifyAuthToken } from "../auth/verifyAuthToken";
import { CreateOrder } from "../payment/createPaymentOrder";
import Order from "@/models/orderMode"

//import {CreateAddress} from "../payment/addressController"
import Address from "@/models/addressModel";
import mongoose from "mongoose";
import { mongoDBConnect } from "@/lib/mongoDb";
import { CreateRazorpayOrder } from "../payment/razorPay";
export const PaymentAction=async(addressId:string)=>{
 let stage = "authentication";
 try{
    const user = await verifyAuthToken();
   if (!user?.userId) {
     return { success: false, message: "User not authenticated" };
   }
    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      return { success: false, message: "Please select a valid delivery address." };
    }
    // The configured public key ID is shared with the server Razorpay client.
    // The secret remains server-only in lib/payment/razorPay.ts.
    const key = process.env.RAZORPAY_KEY_ID;
    if (!key) {
      console.error("[payment] RAZORPAY_KEY_ID is not configured");
      return { success: false, message: "Online payment is not configured. Please contact support." };
    }
    stage = "database connection";
    await mongoDBConnect();
    stage = "address lookup";
    console.info("[payment] Address selected", { addressId, userId: user.userId });
    const address = await Address.findOne({ _id: addressId, userId: user.userId });
    if (!address) {
      return { success: false, message: "Selected address was not found. Please choose another address." };
      
    }
       stage = "database order creation";
       const order=await CreateOrder(user.userId,address._id.toString())
       if(!order.success){
        console.error("[payment] Order creation failed", { message: order.message });
        return { success: false, message: order.message ?? "Unable to create your order." };
       }
       stage = "Razorpay order creation";
       console.info("[payment] Creating Razorpay order", { mongoOrderId: order.orderId, amount: order.totalPrice });
       const razorpay=await CreateRazorpayOrder(order.totalPrice??0)
       stage = "database order update";
       const updatedOrder=await Order.findByIdAndUpdate(order.orderId,{
        razorpayOrderId:razorpay.id,
        paymentStatus:"PENDING"
       },{new:true}) 
        if (!updatedOrder) {
      console.error("[payment] MongoDB order missing after Razorpay order creation", { mongoOrderId: order.orderId, razorpayOrderId: razorpay.id });
      return {
        success: false,
        message: "Failed to update database order",
      };   
    }
    console.info("[payment] Payment details ready", { mongoOrderId: order.orderId, razorpayOrderId: razorpay.id, amount: razorpay.amount, currency: razorpay.currency });
    return {
      success: true,
      orderId: razorpay.id,
      amount: razorpay.amount,
       mongoOrderId: order.orderId,
      currency: razorpay.currency,
      key,
    };
}
 catch(error){
      console.error(`[payment] Failed during ${stage}`, error);
        return { success: false, message: error instanceof Error ? error.message : "Failed to initiate payment." };
    }
 
}
