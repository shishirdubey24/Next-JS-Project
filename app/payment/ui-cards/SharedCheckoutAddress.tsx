"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import type { SavedAddress } from "@/types/address";

type CheckoutAddressContextType = {
  selectedAddress: SavedAddress | null;
  setSelectedAddress: (address: SavedAddress | null) => void;
  addressPrompt: boolean;
  setAddressPrompt: (show: boolean) => void;
};

const CheckoutAddressContext = createContext<CheckoutAddressContextType | null>(
  null,
);

export function CheckoutAddressProvider({ children, initialAddress = null }: { children: ReactNode; initialAddress?: SavedAddress | null }) {
  const [selectedAddress, setSelectedAddress] = useState<SavedAddress | null>(initialAddress);
  const [addressPrompt, setAddressPrompt] = useState(false);

  return (
    <CheckoutAddressContext.Provider
      value={{ selectedAddress, setSelectedAddress, addressPrompt, setAddressPrompt }}
    >
      {children}
    </CheckoutAddressContext.Provider>
  );
}

export function useCheckoutAddress() {
  const context = useContext(CheckoutAddressContext);

  if (!context) {
    throw new Error(
      "useCheckoutAddress must be used inside CheckoutAddressProvider",
    );
  }

  return context;
}
