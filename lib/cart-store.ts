"use client";

import { create } from "zustand";

type TCartItem = {
  items: { id: number; quantity: number }[];
  push: (id: number) => void;
  pop: (id: number) => void;
};

export const useCartStore = create<TCartItem>((set) => ({
  items: [],
  push: (id) =>
    set((state) => {
      const item = state.items.find((item) => item.id === id);
      if (item) {
        return {
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return {
          items: [...state.items, { id, quantity: 1 }],
        };
      }
    }),
  pop: (id) =>
    set((state) => {
      const item = state.items.find((item) => item.id === id);
      if (item) {
        if (item.quantity === 1) {
          return {
            items: state.items.filter((item) => item.id !== id),
          };
        } else {
          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            ),
          };
        }
      }
      return state;
    }),
}));
