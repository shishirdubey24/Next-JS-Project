import {create} from 'zustand';
import type { Product } from "@/types/product";
interface CartState{
    cartItems: Product[];
    addToCart: (item: Product) => void;
    removeFromCart: (itemId: string) => void;
    clearCart: () => void;
}
export const useCartStore = create<CartState>((set) => ({ cartItems: [],
    addToCart: (product) => set((state) => ({ cartItems: [...state.cartItems, product], })),
    removeFromCart: (itemId) => set((state) => ({ cartItems: state.cartItems.filter((item) => item. id !== itemId), })),
       clearCart: () => set({ cartItems: [] }),
     }));
