import mongoose, { Schema, type Model } from "mongoose";
import type { AddressDocument } from "@/types/address";

const addressSchema = new Schema<AddressDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      match: /^[6-9]\d{9}$/,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    locality: {
      type: String,
      required: false,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: String,
      required: true,
      match: /^[1-9]\d{5}$/,
    },
  },
  {
    timestamps: true,
  },
);

const Address: Model<AddressDocument> =
  (mongoose.models.Address as Model<AddressDocument>) ||
  mongoose.model<AddressDocument>("Address", addressSchema);

export default Address;
