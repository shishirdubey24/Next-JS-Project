"use server";

import { validateAddress } from "@/lib/payment/addressValidation";
import type { AddressFormData, PaymentActionResult } from "@/types/address";
import { verifyAuthToken } from "../auth/verifyAuthToken";
import { CreateAddress } from "../payment/addressController";

export const AddressAction = async (
  input: AddressFormData,
): Promise<PaymentActionResult> => {
  try {
    const validation = validateAddress(input);
    if (!validation.success) {
      return { success: false, message: validation.message };
    }

    const user = await verifyAuthToken();
    if (!user?.userId) {
      return { success: false, message: "User not authenticated" };
    }

    const deliveryAddress = await CreateAddress(user.userId, validation.data);
    if (!deliveryAddress.success) {
      return { success: false, message: deliveryAddress.message };
    }

    return {
      success: true,
      message: "Delivery address saved successfully",
      address: {
        id: deliveryAddress.address._id.toString(),
        fullName: deliveryAddress.address.fullName,
        phone: deliveryAddress.address.phone,
        address: deliveryAddress.address.address,
        locality: deliveryAddress.address.locality,
        city: deliveryAddress.address.city,
        state: deliveryAddress.address.state,
        pincode: deliveryAddress.address.pincode,
      },
    };
  } catch (error) {
    console.error("PaymentAction error:", error);
    return {
      success: false,
      message: "Unable to save delivery address.",
    };
  }
};
