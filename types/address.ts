import type { Types } from "mongoose";
export interface AddressFormData {
  fullName: string;
  phone: string;
  address: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
};
export type PaymentActionResult =
  | { success: true; message: string; address: SavedAddress }
  | { success: false; message: string };
export interface PincodeResponse {
  status?: string;
  pincode?: string;
  district?: string;
  state?: string;
};
export interface AddressDocument {
  userId: Types.ObjectId;
  fullName: string;
  phone: string;
  address: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  createdAt: Date;
  updatedAt: Date;
}

export type SavedAddress = {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
};
