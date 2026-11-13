
"use server";

//import mongoose from "mongoose";
import { verifyAuthToken } from "../auth/verifyAuthToken";
import Address from "@/models/addressModel";
import {mongoDBConnect} from "../mongoDb";
export const GetSavedAddressesAction = async () => {
  try {
    const user = await verifyAuthToken();

    if (!user?.userId) {
      return {
        success: false as const,
        message: "Please log in to view your addresses.",
        addresses: [],
      };
    }

    // Use your existing database connection helper here
    // if your application already has one.
    await mongoDBConnect();

    const addresses = await Address.find({
      userId: user.userId,
    })
      .select(
        "_id fullName phone address locality city state pincode",
      )
      .sort({ createdAt: -1 })
      .lean();

    return {
      success: true as const,
      addresses: addresses.map((item) => ({
        id: item._id.toString(),
        fullName: item.fullName,
        phone: item.phone,
        address: item.address,
        locality: item.locality ?? "",
        city: item.city,
        state: item.state,
        pincode: item.pincode,
      })),
    };
  } catch (error) {
    console.error("GetAddressesAction error:", error);

    return {
      success: false as const,
      message: "Unable to fetch saved addresses.",
      addresses: [],
    };
  }
};
