"use client";
import { useCallback, useState } from "react";
import { MapPin, Plus, X } from "lucide-react";
import AddressDetails from "./AddressDetails";
import SavedAddresses from "./SavedAddress";
import type { SavedAddress } from "@/types/address";
import { GetSavedAddressesAction } from "@/lib/actions/getSavedAddressAction";
import { useCheckoutAddress } from "../SharedCheckoutAddress";

const AddressSelector = ({ initialAddresses, initialMessage = "" }: { initialAddresses: SavedAddress[]; initialMessage?: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addresses, setAddresses] = useState<
    SavedAddress[]
  >(initialAddresses);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(initialMessage);
  const {
    selectedAddress,
    setSelectedAddress,
    addressPrompt,
    setAddressPrompt,
  } = useCheckoutAddress();

  const refreshAddresses = useCallback(
    async (selectId?: string) => {
      setLoading(true);
      try {
        const result = await GetSavedAddressesAction();
        setAddresses(result.addresses);
        setMessage(result.success ? "" : result.message ?? "Unable to load saved addresses.");
        const address = result.addresses.find((item) => item.id === selectId) ??
          result.addresses.find((item) => item.id === selectedAddress?.id) ??
          result.addresses[0] ?? null;
        setSelectedAddress(address);
      } catch {
        setMessage("The address was saved, but the saved address list could not be refreshed.");
      } finally {
        setLoading(false);
      }
    },
    [selectedAddress?.id, setSelectedAddress],
  );

  return (
    <section className="rounded-md border border-gray-200 bg-white p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Delivery Address
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Select a saved address or add a new one.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsModalOpen(true);
            setAddressPrompt(false);
          }}
          className="flex shrink-0 items-center gap-2 rounded-md bg-[#ff3f6c] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e8325c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3f6c] focus-visible:ring-offset-2"
        >
          <MapPin size={16} />
          Select Address
        </button>
      </div>

      <div id="checkout-address" className="mt-5 scroll-mt-6">
        {selectedAddress ? (
          <div className="rounded-lg border border-pink-200 bg-pink-50 p-4 text-sm">
            <p className="font-semibold text-gray-900">
              Delivering to {selectedAddress.fullName}
            </p>
            <p className="mt-1 text-gray-600">
              {selectedAddress.address}
              {selectedAddress.locality
                ? `, ${selectedAddress.locality}`
                : ""}, {selectedAddress.city}, {selectedAddress.state} -{" "}
              {selectedAddress.pincode}
            </p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mt-2 font-semibold text-pink-700"
            >
              Change address
            </button>
          </div>
        ) : (
          <p
            role={addressPrompt ? "alert" : undefined}
            className={`text-sm ${addressPrompt ? "font-medium text-red-600" : "text-amber-700"}`}
          >
            Select or add a delivery address to continue.
          </p>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-5 shadow-xl sm:p-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close address modal"
              className="absolute right-4 top-4 rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              <X size={20} />
            </button>

            <div className="mb-5 pr-8">
              <h2 className="text-lg font-semibold text-gray-900">
                Choose Delivery Address
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Select a saved address or add a new address.
              </p>
            </div>

            {loading ? (
              <p className="mb-4 text-sm text-gray-500">
                Loading saved addresses...
              </p>
            ) : null}
            {message ? (
              <p role="alert" className="mb-4 text-sm text-red-600">
                {message}
              </p>
            ) : null}
            {!loading && (
              <div className="mb-5">
                <SavedAddresses
                  addresses={addresses}
                  selectedAddressId={selectedAddress?.id ?? null}
                  onSelect={(address) => {
                    setSelectedAddress(address);
                    setIsModalOpen(false);
                  }}
                />
              </div>
            )}

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("new-checkout-address")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="mb-5 flex items-center gap-2 text-sm font-medium text-pink-600 hover:text-pink-700"
            >
              <Plus size={16} />
              Add New Address
            </button>

            <div id="new-checkout-address">
              <AddressDetails
                onAddressSaved={(id) => {
                  refreshAddresses(id);
                  setIsModalOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AddressSelector;
