import type { AddressFormData } from "@/types/address";

type AddressValidationResult =
  | { success: true; data: AddressFormData }
  | { success: false; message: string };

export function validateAddress(
  input: unknown,
): AddressValidationResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return {
      success: false,
      message: "Invalid address data.",
    };
  }

  const data = input as Record<string, unknown>;

  const fields: (keyof AddressFormData)[] = [
    "fullName",
    "phone",
    "address",
    "city",
    "state",
    "pincode",
  ];

  // Ensure every required field is a string.
  for (const field of fields) {
    if (typeof data[field] !== "string") {
      return {
        success: false,
        message: `${field} must be a string.`,
      };
    }
  }

  if (data.locality !== undefined && typeof data.locality !== "string") {
    return { success: false, message: "locality must be a string." };
  }

  // Normalize whitespace before validation.
  const address: AddressFormData = {
    fullName: (data.fullName as string).trim(),
    phone: (data.phone as string).trim(),
    address: (data.address as string).trim(),
    locality: typeof data.locality === "string" ? data.locality.trim() : "",
    city: (data.city as string).trim(),
    state: (data.state as string).trim(),
    pincode: (data.pincode as string).trim(),
  };

  // Check required fields.
  for (const field of fields) {
    if (!address[field]) {
      return {
        success: false,
        message: `${field} is required.`,
      };
    }
  }

  if (address.fullName.length > 100) {
    return {
      success: false,
      message: "Full name must not exceed 100 characters.",
    };
  }

  if (!/^[6-9]\d{9}$/.test(address.phone)) {
    return {
      success: false,
      message: "Enter a valid 10-digit Indian mobile number.",
    };
  }

  if (address.address.length > 250 || address.locality.length > 150) {
    return {
      success: false,
      message: "Address details exceed the allowed length.",
    };
  }

  if (address.city.length > 100 || address.state.length > 100) {
    return {
      success: false,
      message: "City or state name is too long.",
    };
  }

  if (!/^[1-9]\d{5}$/.test(address.pincode)) {
    return {
      success: false,
      message: "Enter a valid 6-digit Indian PIN code.",
    };
  }

  return {
    success: true,
    data: address,
  };
}
