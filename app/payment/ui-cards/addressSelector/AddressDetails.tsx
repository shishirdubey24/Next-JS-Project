"use client";
import { useEffect, useState } from "react";
import type { AddressFormData, PincodeResponse } from "@/types/address";
import { AddressAction } from "@/lib/actions/addressAction";
const initialAddress: AddressFormData = {
  fullName: "",
  phone: "",
  address: "",
  locality: "",
  city: "",
  state: "",
  pincode: "",
};

const DeliveryAddressForm = ({ onAddressSaved }: { onAddressSaved: (id: string) => void | Promise<void> }) => {
  const [address, setAddress] = useState<AddressFormData>(initialAddress);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [lookupStatus, setLookupStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [lookupMessage, setLookupMessage] = useState("");

  const updateField = (field: keyof AddressFormData, value: string) => {
    setAddress((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (!/^[1-9]\d{5}$/.test(address.pincode)) {
      return;
    }

    const controller = new AbortController();

    const lookupPincode = async () => {
      setLookupStatus("loading");
      setLookupMessage("Checking PIN code...");

      try {
        const response = await fetch(
          `https://www.pincodeindia.net.in/api/pincode/${address.pincode}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("PIN code lookup failed.");
        }

        const data: PincodeResponse = await response.json();

        if (
          data.status !== "success" ||
          data.pincode !== address.pincode ||
          !data.district ||
          !data.state
        ) {
          throw new Error("PIN code not found.");
        }

        setAddress((previous) => ({
          ...previous,
          city: data.district!,
          state: data.state!,
        }));

        setLookupStatus("success");
        setLookupMessage("PIN code found. Please verify the address details.");
      } catch (error) {
        if (controller.signal.aborted) return;

        setLookupStatus("error");
        setLookupMessage(
          error instanceof Error && error.message === "PIN code not found."
            ? "PIN code not found. Please check it."
            : "Unable to verify PIN code right now. Please try again.",
        );
      }
    };

    const timeout = setTimeout(lookupPincode, 400);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [address.pincode]);

  const inputClass =
    "mt-2 w-full rounded-sm border border-gray-300 px-3 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#ff3f6c]";

  const labelClass = "text-sm font-medium text-gray-700";
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const result = await AddressAction(address);
      setSubmitMessage(result.message);
      if (result.success) await onAddressSaved(result.address.id);
    } catch {
      setSubmitMessage("Unable to save your address. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-800">
          Delivery Address
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Enter the address where you want your order delivered.
        </p>
      </div>

      <div>
        <label htmlFor="fullName" className={labelClass}>
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          autoComplete="name"
          value={address.fullName}
          onChange={(e) => updateField("fullName", e.target.value)}
          placeholder="Enter your full name"
          className={inputClass}
          required
          maxLength={100}
        />
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Mobile Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          value={address.phone}
          onChange={(e) =>
            updateField("phone", e.target.value.replace(/\D/g, "").slice(0, 10))
          }
          placeholder="10-digit mobile number"
          className={inputClass}
          pattern="[6-9][0-9]{9}"
          title="Enter a valid 10-digit Indian mobile number."
          required
        />
      </div>

      <div>
        <label htmlFor="address" className={labelClass}>
          House No. / Building / Street
        </label>
        <textarea
          id="address"
          name="address"
          autoComplete="address-line1"
          value={address.address}
          onChange={(e) => updateField("address", e.target.value)}
          placeholder="House number, building, street"
          className={`${inputClass} min-h-20 resize-y`}
          required
          maxLength={250}
        />
      </div>

      <div>
        <label htmlFor="locality" className={labelClass}>
          Locality / Area
        </label>
        <input
          id="locality"
          name="locality"
          autoComplete="address-line2"
          value={address.locality}
          onChange={(e) => updateField("locality", e.target.value)}
          placeholder="Area, landmark (optional)"
          className={inputClass}
          maxLength={150}
        />
      </div>

      <div>
        <label htmlFor="pincode" className={labelClass}>
          PIN Code
        </label>
        <input
          id="pincode"
          name="pincode"
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          value={address.pincode}
          onChange={(e) => {
            updateField(
              "pincode",
              e.target.value.replace(/\D/g, "").slice(0, 6),
            );
            setAddress((previous) => ({
              ...previous,
              city: "",
              state: "",
              pincode: e.target.value.replace(/\D/g, "").slice(0, 6),
            }));
          }}
          placeholder="Enter 6-digit PIN code"
          className={inputClass}
          pattern="[1-9][0-9]{5}"
          required
        />

        {lookupMessage && (
          <p
            aria-live="polite"
            className={`mt-2 text-xs ${
              lookupStatus === "success"
                ? "text-green-600"
                : lookupStatus === "error"
                  ? "text-red-500"
                  : "text-gray-500"
            }`}
          >
            {lookupStatus === "loading" && (
              <span className="mr-1 inline-block animate-spin">↻</span>
            )}
            {lookupMessage}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className={labelClass}>
            City / District
          </label>
          <input
            id="city"
            name="city"
            autoComplete="address-level2"
            value={address.city}
            onChange={(e) => updateField("city", e.target.value)}
            placeholder="City or district"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label htmlFor="state" className={labelClass}>
            State
          </label>
          <input
            id="state"
            name="state"
            autoComplete="address-level1"
            value={address.state}
            onChange={(e) => updateField("state", e.target.value)}
            placeholder="State"
            className={inputClass}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#ff3f6c] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#e7335f] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Saving Address..." : "Confirm Delivery Address"}
      </button>
      {submitMessage && (
        <p aria-live="polite" className="text-sm text-gray-600">
          {submitMessage}
        </p>
      )}
    </form>
  );
};

export default DeliveryAddressForm;
