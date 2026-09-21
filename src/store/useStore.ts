import { create } from 'zustand';

export interface ProductOption {
  id: string;
  name: string;
  priceModifier?: number;
}

export interface Product {
  id: string;
  name: string;
  basePrice: number;
  msrp?: number;
  description: string;
  image: string;
  badge?: string;
  rating: number;
  options: {
    sizes?: ProductOption[];
    colors?: ProductOption[];
    workTypes?: ProductOption[];
  };
}

export interface CartItem {
  id: string; // Unique ID for cart item
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedOptions: Record<string, string>;
  measurements?: Record<string, string>;
}

interface StoreState {
  cart: CartItem[];
  isCartOpen: boolean;
  isProductModalOpen: boolean;
  isCheckoutModalOpen: boolean;
  selectedProduct: Product | null;

  // Actions
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setCartOpen: (isOpen: boolean) => void;
  setProductModalOpen: (isOpen: boolean, product?: Product) => void;
  setCheckoutModalOpen: (isOpen: boolean) => void;
  clearCart: () => void;
}

export const useStore = create<StoreState>((set) => ({
  cart: [],
  isCartOpen: false,
  isProductModalOpen: false,
  isCheckoutModalOpen: false,
  selectedProduct: null,

  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find(
        (c) =>
          c.productId === item.productId &&
          JSON.stringify(c.selectedOptions) === JSON.stringify(item.selectedOptions)
      );
      if (existingItem) {
        return {
          cart: state.cart.map((c) =>
            c.id === existingItem.id ? { ...c, quantity: c.quantity + item.quantity } : c
          ),
        };
      }
      return { cart: [...state.cart, item] };
    }),

  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((c) => c.id !== id) })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((c) => (c.id === id ? { ...c, quantity } : c)),
    })),

  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

  setProductModalOpen: (isOpen, product) =>
    set({ isProductModalOpen: isOpen, selectedProduct: product ?? null }),

  setCheckoutModalOpen: (isOpen) => set({ isCheckoutModalOpen: isOpen }),
  
  clearCart: () => set({ cart: [] }),
}));
