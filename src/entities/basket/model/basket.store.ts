import { create } from "zustand";
import { Product } from "shared/api";
import { createJSONStorage, persist } from "zustand/middleware";

interface BasketState {
  products: Map<Product["id"], number>;

  increaseBasketItemCount: (id: Product["id"]) => void;
  decreaseBasketItemCount: (id: Product["id"]) => void;
  clear: () => void;
}

export const useBasketStore = create(
  persist<BasketState>(
    (set, get) => ({
      products: new Map(),

      increaseBasketItemCount: (id) => {
        const products = new Map(get().products);
        const currentProductCount = products.get(id) ?? 0;
        products.set(id, currentProductCount + 1);
        return set({
          products: products,
        });
      },

      decreaseBasketItemCount: (id) => {
        const products = new Map(get().products);
        const currentProductCount = products.get(id) ?? 0;
        if (currentProductCount > 1) {
          products.set(id, currentProductCount - 1);
        } else {
          products.delete(id);
        }
        return set({
          products: products,
        });
      },

      clear: () => {
        set({
          products: new Map(),
        });
      },
    }),
    {
      name: "basket-storage",
      storage: createJSONStorage(() => localStorage, {
        reviver: (key, value) =>
          key === "products" ? new Map(value as [Product["id"], number][]) : value,
        replacer: (key, value) =>
          key === "products" ? [...(value as BasketState["products"])] : value,
      }),
    }
  )
);
