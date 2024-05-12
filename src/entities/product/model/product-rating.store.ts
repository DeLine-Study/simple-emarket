import { create } from "zustand";
import { Product } from "shared/api";
import { persist } from "zustand/middleware";

interface ProductsRatingState {
  productRatings: Record<Product["id"], number>;

  updateProductRating: (id: Product["id"], value: number) => void;
}

export const useProductsRatingStore = create(
  persist<ProductsRatingState>(
    (set, get) => ({
      productRatings: {},

      updateProductRating: (id, value) => {
        const productRatings = { ...get().productRatings };
        productRatings[id] = value;

        return set({
          productRatings,
        });
      },
    }),
    {
      name: "products-rating-storage",
    }
  )
);
