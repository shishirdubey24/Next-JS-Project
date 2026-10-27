"use client";
import { CheckCircle2, MapPin } from "lucide-react";
import type { SavedAddress } from "@/types/address";

type Props = {
  addresses: SavedAddress[];
  selectedAddressId: string | null;
  onSelect: (address: SavedAddress) => void;
};

export default function SavedAddresses({
  addresses,
  selectedAddressId,
  onSelect,
}: Props) {
  if (addresses.length === 0) {
    return (
      <p className="rounded-md bg-gray-50 p-4 text-sm text-gray-500">
        No saved addresses yet. Add one to continue.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {addresses.map((address) => {
        const selected = selectedAddressId === address.id;

        return (
          <button
            key={address.id}
            type="button"
            onClick={() => onSelect(address)}
            className={`w-full rounded-lg border p-4 text-left transition ${
              selected
                ? "border-[#ff3f6c] bg-pink-50"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 shrink-0 text-[#ff3f6c]" size={20} />

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-gray-900">
                    {address.fullName}
                  </p>

                  {selected && (
                    <CheckCircle2
                      size={19}
                      className="shrink-0 text-[#ff3f6c]"
                    />
                  )}
                </div>

                <p className="mt-1 text-sm text-gray-600">{address.phone}</p>

                <p className="mt-2 text-sm text-gray-600">
                  {address.address}
                  {address.locality ? `, ${address.locality}` : ""},{" "}
                  {address.city}, {address.state} - {address.pincode}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
