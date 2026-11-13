import Razorpay from "razorpay";
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});
export const CreateRazorpayOrder = async (amount: number) => {
  const razorpayOrder = await razorpay.orders.create({
    amount: Math.round(amount * 100), 
    currency: "INR",
  });
  return razorpayOrder;
};

export const FetchRazorpayPayment = async (paymentId: string) =>
  razorpay.payments.fetch(paymentId);

export const CaptureRazorpayPayment = async (
  paymentId: string,
  amount: number,
  currency: string,
) => razorpay.payments.capture(paymentId, amount, currency);
