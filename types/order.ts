import type { Types } from "mongoose";

export type OrderItem = {
  productId: string;
  price: number;
};

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUNDED";

export type OrderDocument = {
  userId: Types.ObjectId;
  addressId: Types.ObjectId;
  items: OrderItem[];
  totalPrice: number;
  currency: "INR";
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  paymentMethod?: string;
  paidAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
