"use server";
import { createHmac, timingSafeEqual } from "crypto";
import { verifyAuthToken } from "../auth/verifyAuthToken";
import Order from "@/models/orderMode";
import { mongoDBConnect } from "@/lib/mongoDb";
import { CaptureRazorpayPayment, FetchRazorpayPayment } from "@/lib/payment/razorPay";
  type VerifyPaymentInput = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

export const VerifyPaymentAction=async(paymentData: VerifyPaymentInput)=>{
   try{
    const user = await verifyAuthToken();
    if (!user?.userId) {
      return { success: false, message: "User not authenticated" };
    }
      const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = paymentData;
    if (
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature
    ) {
      return { success: false, message: "Missing payment details" };
    }
    if (!/^[a-f\d]{64}$/i.test(razorpay_signature)) {
      return { success: false, message: "Invalid payment signature" };
    }
    const secret=process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      throw new Error("Razorpay secret key is missing");
    }
    const expectedSignature = createHmac("sha256", secret!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const expectedBuffer = Buffer.from(expectedSignature, "hex");
    const receivedBuffer = Buffer.from(razorpay_signature, "hex");
    if (expectedBuffer.length !== receivedBuffer.length || !timingSafeEqual(expectedBuffer, receivedBuffer)) {
      return { success: false, message: "Payment verification failed" };
    }
    await mongoDBConnect();
    const order = await Order.findOne({
      razorpayOrderId: razorpay_order_id,
      userId: user.userId,
    });
    if (!order) {
      return { success: false, message: "Order not found" };
    }
    if (order.paymentStatus === "PAID") {
      return order.razorpayPaymentId === razorpay_payment_id
        ? { success: true, message: "Payment was already verified", orderId: order._id.toString() }
        : { success: false, message: "This order has already been paid" };
    }

    let payment = await FetchRazorpayPayment(razorpay_payment_id);
    if (payment.status === "authorized") {
      payment = await CaptureRazorpayPayment(
        payment.id,
        Number(payment.amount),
        payment.currency,
      );
    }
    if (
      payment.order_id !== razorpay_order_id ||
      payment.status !== "captured" ||
      Number(payment.amount) !== Math.round(order.totalPrice * 100) ||
      payment.currency !== order.currency
    ) {
      console.error("[payment:verify] Razorpay payment does not match the order", {
        mongoOrderId: order._id.toString(),
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        paymentStatus: payment.status,
        paymentAmount: payment.amount,
        orderAmount: Math.round(order.totalPrice * 100),
        paymentCurrency: payment.currency,
        orderCurrency: order.currency,
      });
      return { success: false, message: "Payment is not captured or does not match this order" };
    }

    const updatedOrder = await Order.findOneAndUpdate(
      {
        razorpayOrderId: razorpay_order_id,
        userId: user.userId,
        paymentStatus: "PENDING",
      },
      {
        $set: {
          razorpayPaymentId: razorpay_payment_id,
          paymentMethod: payment.method,
          paidAt: new Date(payment.created_at * 1000),
          paymentStatus: "PAID",
          status: "CONFIRMED",
        },
      },
      { new: true }
    );
      if (!updatedOrder) {
      const latestOrder = await Order.findOne({ razorpayOrderId: razorpay_order_id, userId: user.userId });
      if (latestOrder?.paymentStatus === "PAID" && latestOrder.razorpayPaymentId === razorpay_payment_id) {
        return { success: true, message: "Payment was already verified", orderId: latestOrder._id.toString() };
      }
      return { success: false, message: "Order could not be updated after payment verification" };
    }
  return {
      success: true,
      message: "Payment verified successfully",
      orderId: updatedOrder._id.toString(),
    };
   }catch(error){
    console.error("[payment:verify] Payment verification failed", error);
    return { success: false, message: error instanceof Error ? error.message : "Failed to verify payment" };
   }
} 
