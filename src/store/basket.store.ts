import { create } from "zustand";
import { Good } from "../types";

interface BasketState {
  goods: Map<Good["id"], number>;

  increaseBasketItemCount: (id: Good["id"]) => void;
  decreaseBasketItemCount: (id: Good["id"]) => void;
}

export const useBasketStore = create<BasketState>((set, get) => ({
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
}));
