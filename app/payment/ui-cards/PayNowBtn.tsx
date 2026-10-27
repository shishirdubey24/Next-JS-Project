"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCheckoutAddress } from "./SharedCheckoutAddress";
import { PaymentAction } from "@/lib/actions/paymentAction";
import { VerifyPaymentAction } from "@/lib/actions/verifyPaymentAction";
//import { useCheckoutAddress } from "./SharedCheckoutAddress";

type RazorpayPaymentResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayFailureResponse = {
  error?: {
    code?: string;
    description?: string;
    reason?: string;
    source?: string;
    step?: string;
    metadata?: {
      order_id?: string;
      payment_id?: string;
    };
  };
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description?: string;
  handler: (response: RazorpayPaymentResponse) => Promise<void>;
  modal?: {
    ondismiss?: () => void;
  };
};

type RazorpayInstance = {
  open: () => void;
  on: (
    event: "payment.failed",
    callback: (response: RazorpayFailureResponse) => void,
  ) => void;
};

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

export default function PayNowBtn() {
  const [loading, setLoading] = useState(false);
  const [addressAlert, setAddressAlert] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [orderReference, setOrderReference] = useState("");
  const { setAddressPrompt } = useCheckoutAddress();
  const router = useRouter();
  const { selectedAddress } = useCheckoutAddress();
  const handlePayment = async (): Promise<void> => {
    if (loading) {
      return;
    }

    if (!selectedAddress?.id) {
      setAddressAlert(true);
      setAddressPrompt(true);
      document
        .getElementById("checkout-address")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setLoading(true);
    setPaymentError("");
    let checkoutOpened = false;

    try {
      // 1. Create the MongoDB order and Razorpay order.
      const paymentResponse = await PaymentAction(selectedAddress.id);

      if (!paymentResponse.success) {
        console.error("Payment initiation failed:", paymentResponse.message);
        setPaymentError(paymentResponse.message ?? "Payment could not be started. Please try again.");
        return;
      }

      if (
        !paymentResponse.orderId ||
        !paymentResponse.mongoOrderId ||
        paymentResponse.amount == null ||
        !paymentResponse.currency ||
        !paymentResponse.key
      ) {
        console.error("Incomplete payment details returned by server:", {
          hasRazorpayOrderId: Boolean(paymentResponse.orderId),
          hasMongoOrderId: Boolean(paymentResponse.mongoOrderId),
          amount: paymentResponse.amount,
          currency: paymentResponse.currency,
          hasKey: Boolean(paymentResponse.key),
        });
        setPaymentError("We could not prepare the payment. Please try again or contact support.");
        return;
      }
      const mongoOrderId = paymentResponse.mongoOrderId;
      setOrderReference(mongoOrderId);

      // 2. Load Razorpay Checkout if it has not been loaded.
      if (!window.Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");

          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.async = true;

          script.onload = () => {
            resolve();
          };

          script.onerror = () => {
            reject(new Error("Failed to load Razorpay Checkout."));
          };

          document.body.appendChild(script);
        });
      }

      if (!window.Razorpay) {
        throw new Error("Razorpay Checkout is unavailable.");
      }

      // 3. Configure Razorpay Checkout.
      const options: RazorpayOptions = {
        key: paymentResponse.key,
        amount: Number(paymentResponse.amount),
        currency: paymentResponse.currency,
        order_id: paymentResponse.orderId,
        name: "Myntra Clone",
        description: "Order payment",

        // 4. Verify the payment response on the server.
        handler: async (response: RazorpayPaymentResponse): Promise<void> => {
          try {
            const result = await VerifyPaymentAction({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (!result.success) {
              console.error("Payment verification failed:", result.message);
              setPaymentError(result.message ?? "We could not verify the payment. Contact support before retrying.");
              setLoading(false);
              return;
            }

            setLoading(false);
            router.push(
              `/payment/paymentDetails/${encodeURIComponent(result.orderId ?? mongoOrderId)}`,
            );
          } catch (error) {
            console.error("Unable to verify payment:", error);
            setPaymentError("Payment was received, but verification could not be completed. Please contact support with your order reference.");
            setLoading(false);
          }
        },

        modal: {
          ondismiss: () => {
            console.log("Razorpay Checkout was closed.");
            setLoading(false);
          },
        },
      };

      // 5. Create the Razorpay instance and register failure handling.
      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response: RazorpayFailureResponse) => {
        setPaymentError(response.error?.description ?? "Payment failed. Please try again.");
        setLoading(false);
        console.error(
          "Razorpay payment failed:",
          response.error?.description ?? "Unknown payment error",
        );
      });

      // 6. Open the Razorpay Checkout popup.
      razorpay.open();
      checkoutOpened = true;
    } catch (error) {
      console.error("Payment failed:", error);
      setPaymentError(error instanceof Error ? error.message : "Payment could not be started. Please try again.");
    } finally {
      if (!checkoutOpened) setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        disabled={loading}
        className="w-full rounded-lg bg-[#ff3f6c] px-5 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#e8325c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3f6c] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        onClick={handlePayment}
      >
        {loading ? "PROCESSING..." : "PAY NOW"}
      </button>
      {addressAlert && (
        <p
          role="alert"
          className="text-center text-sm font-medium text-red-600"
        >
          Please select or save a delivery address before continuing.
        </p>
      )}
      {paymentError && <p role="alert" className="text-center text-sm font-medium text-red-600">{paymentError}</p>}
      {orderReference && <p className="text-center text-xs text-gray-500">Order reference: {orderReference}</p>}
    </div>
  );
}
