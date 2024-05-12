import { Rating } from "@mui/material";
import { FC } from "react";
import { Product } from "shared/api";
import { useProductsRatingStore } from "../model/product-rating.store";

export interface ProductRating {
  productId: Product["id"];
}

export const ProductRating: FC<ProductRating> = ({ productId }) => {
  const rating = useProductsRatingStore(
    (state) => state.productRatings[productId] ?? 0
  );
  const updateProductRating = useProductsRatingStore(
    (state) => state.updateProductRating
  );

  return (
    <Rating
      value={rating}
      onChange={(_e, value) => value && updateProductRating(productId, value)}
    />
  );
};
