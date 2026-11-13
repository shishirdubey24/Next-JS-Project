import mongoose, { Schema, type Model } from "mongoose";
import type { OrderDocument } from "@/types/order";

const orderItemSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

const orderSchema = new Schema<OrderDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    addressId: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items: unknown[]) => items.length > 0,
        message: "An order must contain at least one item.",
      },
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      enum: ["INR"],
      default: "INR",
      required: true,
    },
    status: {
      type: String,
      enum: [
        "PENDING",
        "CONFIRMED",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "PENDING",
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
      default: "PENDING",
      required: true,
    },
    razorpayOrderId: {
      type: String,
    },
    razorpayPaymentId: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    paidAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

// Next.js keeps server modules alive during development. If this model was
// first compiled with the old ObjectId productId schema, reusing it would
// continue casting values like "004" as ObjectIds after hot reload.
if (process.env.NODE_ENV === "development" && mongoose.models.Order) {
  mongoose.deleteModel("Order");
}

const Order: Model<OrderDocument> = mongoose.model<OrderDocument>(
  "Order",
  orderSchema,
);

export default Order;
