import { create } from "zustand";
import { Good } from "shared/api";
import { createJSONStorage, persist } from "zustand/middleware";

interface BasketState {
  goods: Map<Good["id"], number>;

  increaseBasketItemCount: (id: Good["id"]) => void;
  decreaseBasketItemCount: (id: Good["id"]) => void;
  clear: () => void;
}

export const useBasketStore = create(
  persist<BasketState>(
    (set, get) => ({
      goods: new Map(),

      increaseBasketItemCount: (id) => {
        const goods = new Map(get().goods);
        const currentGoodCount = goods.get(id) ?? 0;
        goods.set(id, currentGoodCount + 1);
        return set({
          goods,
        });
      },

      decreaseBasketItemCount: (id) => {
        const goods = new Map(get().goods);
        const currentGoodCount = goods.get(id) ?? 0;
        if (currentGoodCount > 1) {
          goods.set(id, currentGoodCount - 1);
        } else {
          goods.delete(id);
        }
        return set({
          goods,
        });
      },

      clear: () => {
        set({
          goods: new Map(),
        });
      },
    }),
    {
      name: "basket-storage",
      storage: createJSONStorage(() => localStorage, {
        reviver: (key, value) =>
          key === "goods" ? new Map(value as [Good["id"], number][]) : value,
        replacer: (key, value) =>
          key === "goods" ? [...(value as BasketState["goods"])] : value,
      }),
    }
  )
);
